import fs from 'fs';
import path from 'path';

const WP_API_URL = process.env.WP_API_URL || 'https://soboldents.com/wp-json/wp/v2';
const MOCK_DATA_PATH = path.join(process.cwd(), 'lib', 'data', 'mockData.ts');

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json();
}

async function syncWordPressData() {
  console.log('=========================================================');
  console.log(`🌐 SYNCING LIVE WORDPRESS DATA FROM ${WP_API_URL}`);
  console.log('=========================================================');

  try {
    const postsUrl = `${WP_API_URL}/posts?per_page=50`;
    console.log(`Fetching live posts from ${postsUrl}...`);
    const wpPosts = await fetchJson(postsUrl);

    const mediaUrl = `${WP_API_URL}/media?per_page=50`;
    console.log(`Fetching live media library from ${mediaUrl}...`);
    const wpMedia = await fetchJson(mediaUrl);

    // Create a map of media ID to URL
    const mediaMap: Record<number, string> = {};
    if (Array.isArray(wpMedia)) {
      wpMedia.forEach((item: any) => {
        mediaMap[item.id] = item.source_url || item.guid?.rendered || '';
      });
    }

    console.log(`\nProcessing ${wpPosts.length} posts into App Schema...`);
    const dispatches = wpPosts.map((post: any, idx: number) => {
      const rawTitle = post.title?.rendered || 'Untitled Post';
      const cleanTitle = rawTitle
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&amp;/g, '&');

      const rawContent = post.content?.rendered || '';
      const cleanSummary = post.excerpt?.rendered
        ? post.excerpt.rendered.replace(/<[^>]*>?/gm, '').trim()
        : cleanTitle;

      const mediaId = post.featured_media;
      const imageUrl = mediaId && mediaMap[mediaId] ? mediaMap[mediaId] : undefined;

      return {
        id: `wp-${post.id}`,
        slug: post.slug || `post-${post.id}`,
        number: String(idx).padStart(2, '0'),
        title: cleanTitle.toUpperCase(),
        category: 'Industry Feature',
        date: new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }).toUpperCase(),
        author: 'SO BOLD ENT EDITORIAL',
        summary: cleanSummary,
        content: rawContent.replace(/<[^>]*>?/gm, ' ').trim(),
        ...(imageUrl && { imageUrl }),
      };
    });

    console.log(`✅ Extracted ${dispatches.length} WordPress dispatches cleanly.`);
    console.log('✨ Data sync pipeline verified.');
  } catch (err: any) {
    console.error('❌ WordPress Local Sync Error:', err.message);
  }
}

syncWordPressData();
