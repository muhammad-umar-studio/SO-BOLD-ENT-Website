import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';
import { Schema } from '@sanity/schema';

// ============================================================================
// CONFIGURATION & ENV SETUP
// ============================================================================
const WP_API_URL = process.env.WP_API_URL || 'https://soboldents.com/wp-json/wp/v2';
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || 'your_project_id';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || '';
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || '2024-03-01';

const BATCH_SIZE = 10;
const MAP_FILE_PATH = path.join(process.cwd(), 'scripts', 'media-map.json');

// Initialize Sanity Client
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

// Basic Default Schema for Portable Text Conversion
const defaultSchema = Schema.compile({
  name: 'default',
  types: [
    {
      type: 'object',
      name: 'blogPost',
      fields: [
        {
          title: 'Body',
          name: 'body',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    },
  ],
});
const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find((field: any) => field.name === 'body').type;

// In-Memory & Persistent Media Mapping (wpMediaId -> sanityAssetId)
let mediaMap: Record<number, string> = {};

function loadMediaMap(): Record<number, string> {
  if (fs.existsSync(MAP_FILE_PATH)) {
    try {
      const data = fs.readFileSync(MAP_FILE_PATH, 'utf-8');
      console.log('📦 Loaded existing media mapping from scripts/media-map.json');
      return JSON.parse(data);
    } catch (e) {
      console.warn('⚠️ Could not parse existing media-map.json, starting fresh.');
    }
  }
  return {};
}

function saveMediaMap(map: Record<number, string>) {
  try {
    fs.mkdirSync(path.dirname(MAP_FILE_PATH), { recursive: true });
    fs.writeFileSync(MAP_FILE_PATH, JSON.stringify(map, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save media map to file:', e);
  }
}

// Concurrency Batch Helper
async function mapConcurrent<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    const batch = items.slice(i, i + limit);
    const batchResults = await Promise.all(
      batch.map((item, idx) => fn(item, i + idx))
    );
    results.push(...batchResults);
  }
  return results;
}

// ============================================================================
// PHASE A: MEDIA LIBRARY EXTRACTION & UPLOAD
// ============================================================================
async function fetchAllWPMedia(): Promise<any[]> {
  console.log('\n---------------------------------------------------------');
  console.log('📷 PHASE A: Fetching Media Library from WordPress REST API...');
  console.log('---------------------------------------------------------');
  
  let page = 1;
  let allMedia: any[] = [];
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_API_URL}/media?per_page=100&page=${page}`;
    console.log(`fetching media page ${page}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 400) break; // Out of pages
        throw new Error(`HTTP error ${res.status}`);
      }
      
      const totalPagesHeader = res.headers.get('x-wp-totalpages');
      if (totalPagesHeader) {
        totalPages = parseInt(totalPagesHeader, 10);
      }

      const mediaItems = await res.json();
      if (!Array.isArray(mediaItems) || mediaItems.length === 0) break;

      allMedia.push(...mediaItems);
      page++;
    } catch (err) {
      console.error(`Error fetching media page ${page}:`, err);
      break;
    }
  }

  console.log(`✅ Found ${allMedia.length} total media assets on WordPress.`);
  return allMedia;
}

async function migrateMediaAssets(wpMediaList: any[]) {
  mediaMap = loadMediaMap();
  let uploadedCount = 0;
  let skippedCount = 0;

  await mapConcurrent(wpMediaList, BATCH_SIZE, async (mediaItem: any, index: number) => {
    const wpId = mediaItem.id;
    const sourceUrl = mediaItem.source_url || mediaItem.guid?.rendered;

    if (!sourceUrl) return;

    if (mediaMap[wpId]) {
      skippedCount++;
      return;
    }

    try {
      console.log(`[${index + 1}/${wpMediaList.length}] Uploading image: ${path.basename(sourceUrl)}`);
      const imgRes = await fetch(sourceUrl);
      if (!imgRes.ok) throw new Error(`Failed to download image HTTP ${imgRes.status}`);

      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
      const filename = path.basename(sourceUrl) || `wp-media-${wpId}.jpg`;

      // Upload image buffer directly to Sanity Asset store
      const asset = await sanityClient.assets.upload('image', buffer, {
        filename,
        contentType,
      });

      mediaMap[wpId] = asset._id;
      uploadedCount++;
    } catch (err: any) {
      console.error(`❌ Failed media upload WP ID ${wpId} (${sourceUrl}):`, err.message);
    }
  });

  saveMediaMap(mediaMap);
  console.log(`✅ Media Migration Complete! Uploaded: ${uploadedCount}, Cached/Skipped: ${skippedCount}`);
}

// ============================================================================
// PHASE B: DATA TRANSFORMATION (HTML -> PORTABLE TEXT)
// ============================================================================
function convertHtmlToPortableText(htmlContent: string) {
  if (!htmlContent || typeof htmlContent !== 'string') return [];

  try {
    const blocks = htmlToBlocks(htmlContent, blockContentType, {
      parseHtml: (html) => new JSDOM(html).window.document,
    });
    return blocks;
  } catch (err) {
    console.warn('Fallback HTML block parsing used for post body content.');
    return [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: htmlContent.replace(/<[^>]*>?/gm, ''), // Plaintext fallback
          },
        ],
      },
    ];
  }
}

// ============================================================================
// PHASE C: POSTS, NEWS & ARTIST INSERTION
// ============================================================================
async function fetchAllWPPosts(endpoint: string = 'posts'): Promise<any[]> {
  console.log(`\n📄 Fetching records from endpoint /${endpoint}...`);
  let page = 1;
  let allPosts: any[] = [];
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${WP_API_URL}/${endpoint}?per_page=100&page=${page}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 400 || res.status === 404) break;
        throw new Error(`HTTP error ${res.status}`);
      }

      const totalPagesHeader = res.headers.get('x-wp-totalpages');
      if (totalPagesHeader) {
        totalPages = parseInt(totalPagesHeader, 10);
      }

      const posts = await res.json();
      if (!Array.isArray(posts) || posts.length === 0) break;

      allPosts.push(...posts);
      page++;
    } catch (err) {
      console.error(`Error fetching /${endpoint} page ${page}:`, err);
      break;
    }
  }

  console.log(`✅ Retrieved ${allPosts.length} records from /${endpoint}.`);
  return allPosts;
}

async function migratePostsToDatabase(posts: any[]) {
  console.log('\n---------------------------------------------------------');
  console.log('🚀 PHASE C: Transforming & Inserting Documents into Database...');
  console.log('---------------------------------------------------------');

  let successCount = 0;
  let failCount = 0;

  await mapConcurrent(posts, BATCH_SIZE, async (wpPost: any, index: number) => {
    const wpId = wpPost.id;
    try {
      const title = wpPost.title?.rendered ? wpPost.title.rendered.replace(/&#8217;/g, "'").replace(/&amp;/g, '&') : 'Untitled Post';
      const slug = wpPost.slug || `wp-post-${wpId}`;
      const rawHtml = wpPost.content?.rendered || '';
      const summary = wpPost.excerpt?.rendered ? wpPost.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim() : '';
      const publishedAt = wpPost.date || new Date().toISOString();

      // Convert HTML string to Portable Text blocks
      const portableTextBody = convertHtmlToPortableText(rawHtml);

      // Featured Image reference linking
      let imageRef: any = undefined;
      if (wpPost.featured_media && mediaMap[wpPost.featured_media]) {
        imageRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: mediaMap[wpPost.featured_media],
          },
        };
      }

      // Map to Document Schema
      const doc = {
        _id: `wp-post-${wpId}`,
        _type: 'dispatch', // Matches Sanity / App Dispatch schema
        title,
        slug: { _type: 'slug', current: slug },
        number: String(index).padStart(2, '0'),
        category: 'Press Release',
        date: publishedAt,
        author: 'SO BOLD ENT EDITORIAL',
        summary: summary || title,
        content: rawHtml,
        body: portableTextBody,
        ...(imageRef && { image: imageRef }),
      };

      // Create or replace document in Sanity
      await sanityClient.createOrReplace(doc);
      console.log(`[${index + 1}/${posts.length}] ✅ Migrated Post ID ${wpId}: "${title.substring(0, 45)}..."`);
      successCount++;
    } catch (err: any) {
      console.error(`❌ Failed to migrate WP Post ID ${wpId}:`, err.message);
      failCount++;
    }
  });

  console.log('\n=========================================================');
  console.log(`🎉 MIGRATION SUMMARY:`);
  console.log(`   - Total Processed: ${posts.length}`);
  console.log(`   - Successfully Migrated: ${successCount}`);
  console.log(`   - Failures: ${failCount}`);
  console.log('=========================================================\n');
}

// ============================================================================
// MAIN EXECUTION PIPELINE
// ============================================================================
async function runMigration() {
  console.log('=========================================================');
  console.log('⚡ STARTING WORDPRESS -> SANITY / DATABASE MIGRATION');
  console.log(`   Target WordPress API: ${WP_API_URL}`);
  console.log(`   Target Sanity Project: ${SANITY_PROJECT_ID}`);
  console.log('=========================================================');

  if (!SANITY_API_TOKEN) {
    console.warn('\n⚠️ WARNING: SANITY_API_TOKEN is not set in environment variables.');
    console.warn('   If you are migrating directly to Sanity CMS, please set SANITY_API_TOKEN in .env.local.\n');
  }

  try {
    // Phase A: Media Assets
    const mediaList = await fetchAllWPMedia();
    if (SANITY_API_TOKEN && SANITY_PROJECT_ID !== 'your_project_id') {
      await migrateMediaAssets(mediaList);
    } else {
      console.log('ℹ️ Skipping Sanity direct asset upload (SANITY_API_TOKEN not configured).');
    }

    // Phase B & C: Posts & Custom Types
    const posts = await fetchAllWPPosts('posts');
    if (SANITY_API_TOKEN && SANITY_PROJECT_ID !== 'your_project_id') {
      await migratePostsToDatabase(posts);
    }

    console.log('✨ All Migration Tasks Executed Cleanly.');
  } catch (fatalErr: any) {
    console.error('💥 Fatal Migration Error:', fatalErr);
    process.exit(1);
  }
}

runMigration();
