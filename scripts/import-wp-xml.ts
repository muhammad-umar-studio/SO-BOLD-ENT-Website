import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import { htmlToBlocks } from '@sanity/block-tools';

// ============================================================================
// CONFIGURATION & ENV SETUP
// ============================================================================
const XML_FILE_PATH = path.join(process.cwd(), 'soboldentscom.WordPress.2026-09-01.xml');
const OUTPUT_JSON_PATH = path.join(process.cwd(), 'lib', 'data', 'wpImportedData.json');

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || '';
const SANITY_DATASET = process.env.SANITY_DATASET || 'production';
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN || '';
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || '2024-03-01';

const sanityClient = SANITY_PROJECT_ID
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      token: SANITY_API_TOKEN,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
    })
  : null;

function extractTagValue(xmlChunk: string, tagName: string): string {
  const cdataRegex = new RegExp(`<${tagName}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tagName}>`, 'i');
  const cdataMatch = xmlChunk.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();

  const simpleRegex = new RegExp(`<${tagName}>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const simpleMatch = xmlChunk.match(simpleRegex);
  if (simpleMatch) return simpleMatch[1].trim();

  return '';
}

function extractCategories(xmlChunk: string): string[] {
  const categories: string[] = [];
  const regex = /<category domain="category"[^>]*><!\[CDATA\[(.*?)\]\]><\/category>/gi;
  let match;
  while ((match = regex.exec(xmlChunk)) !== null) {
    if (match[1]) categories.push(match[1].trim());
  }
  return categories;
}

function cleanHtmlText(html: string): string {
  if (!html) return '';
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function runXmlImport() {
  console.log('=========================================================');
  console.log('📦 PARSING WORDPRESS WXR XML EXPORT FILE');
  console.log(`   Source File: ${XML_FILE_PATH}`);
  console.log('=========================================================');

  if (!fs.existsSync(XML_FILE_PATH)) {
    console.error(`❌ Error: Export file not found at ${XML_FILE_PATH}`);
    process.exit(1);
  }

  const xmlContent = fs.readFileSync(XML_FILE_PATH, 'utf-8');
  const items = xmlContent.split('<item>');
  console.log(`Found ${items.length - 1} total items in XML export.`);

  const mediaMap: Record<string, string> = {}; // postId -> attachmentUrl
  const posts: any[] = [];
  const videoBlocks: any[] = [];

  // Phase 1: Parse attachments & build media lookup table
  items.slice(1).forEach((itemChunk) => {
    const postType = extractTagValue(itemChunk, 'wp:post_type');
    const postId = extractTagValue(itemChunk, 'wp:post_id');
    const attachmentUrl = extractTagValue(itemChunk, 'wp:attachment_url');

    if (postType === 'attachment' && attachmentUrl) {
      mediaMap[postId] = attachmentUrl;
    }
  });

  console.log(`✅ Indexed ${Object.keys(mediaMap).length} media attachment URLs.`);

  // Phase 2: Parse Posts, News, and Video Blocks
  items.slice(1).forEach((itemChunk) => {
    const postType = extractTagValue(itemChunk, 'wp:post_type');
    const postId = extractTagValue(itemChunk, 'wp:post_id');
    const title = extractTagValue(itemChunk, 'title');
    const slug = extractTagValue(itemChunk, 'wp:post_name');
    const postDate = extractTagValue(itemChunk, 'wp:post_date');
    const rawContent = extractTagValue(itemChunk, 'content:encoded');
    const rawExcerpt = extractTagValue(itemChunk, 'excerpt:encoded');
    const author = extractTagValue(itemChunk, 'dc:creator') || 'SO BOLD ENT EDITORIAL';
    const categories = extractCategories(itemChunk);

    // Skip trashed or spam posts
    if (slug.includes('__trashed') || title.toLowerCase().includes('casino') || title.toLowerCase().includes('jackpot')) {
      return;
    }

    // Featured media lookup
    const thumbnailIdMatch = itemChunk.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]><\/wp:meta_value>/);
    const thumbnailId = thumbnailIdMatch ? thumbnailIdMatch[1] : null;
    const imageUrl = thumbnailId && mediaMap[thumbnailId] ? mediaMap[thumbnailId] : undefined;

    if (postType === 'post' && title && rawContent) {
      posts.push({
        id: `wp-${postId}`,
        slug: slug || `post-${postId}`,
        number: String(posts.length).padStart(2, '0'),
        title: cleanHtmlText(title).toUpperCase(),
        category: categories.length > 0 ? categories[0] : 'Press Release',
        date: postDate ? new Date(postDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase() : 'AUG 2025',
        author: author.toUpperCase(),
        summary: cleanHtmlText(rawExcerpt) || cleanHtmlText(rawContent).substring(0, 160) + '...',
        content: rawContent,
        ...(imageUrl && { imageUrl }),
      });
    } else if (postType === 'pp_video_block' && title) {
      videoBlocks.push({
        id: `vid-${postId}`,
        title: cleanHtmlText(title),
        releaseDate: postDate ? new Date(postDate).getFullYear().toString() : '2026',
        ...(imageUrl && { thumbnailUrl: imageUrl }),
      });
    }
  });

  console.log(`✅ Filtered & Extracted ${posts.length} Official SOBOLDENTS Posts / Dispatches.`);
  console.log(`✅ Extracted ${videoBlocks.length} Video Blocks.`);

  // Phase 3: Write extracted data to lib/data/wpImportedData.json
  const outputData = {
    totalPostsCount: posts.length,
    totalMediaCount: Object.keys(mediaMap).length,
    totalVideoBlocksCount: videoBlocks.length,
    extractedAt: new Date().toISOString(),
    dispatches: posts,
    videoBlocks,
  };

  fs.mkdirSync(path.dirname(OUTPUT_JSON_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(outputData, null, 2), 'utf-8');
  console.log(`\n💾 Saved extracted WordPress dataset to ${OUTPUT_JSON_PATH}`);

  // Phase 4: Push to Sanity CMS if Client Configured
  if (sanityClient && SANITY_API_TOKEN) {
    console.log('\n🚀 Inserting documents into Sanity CMS database...');
    let successCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const p = posts[i];
      try {
        const doc = {
          _id: p.id,
          _type: 'dispatch',
          title: p.title,
          slug: { _type: 'slug', current: p.slug },
          number: p.number,
          category: p.category,
          date: p.date,
          author: p.author,
          summary: p.summary,
          content: p.content,
        };
        await sanityClient.createOrReplace(doc);
        successCount++;
      } catch (err: any) {
        console.error(`Error uploading ${p.id} to Sanity:`, err.message);
      }
    }
    console.log(`✅ Uploaded ${successCount}/${posts.length} documents to Sanity CMS!`);
  }

  console.log('\n=========================================================');
  console.log('🎉 WORDPRESS XML IMPORT PIPELINE EXECUTED SUCCESSFULLY!');
  console.log('=========================================================\n');
}

runXmlImport();
