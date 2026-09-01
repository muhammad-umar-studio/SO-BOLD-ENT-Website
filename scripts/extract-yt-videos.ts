import fs from 'fs';
import path from 'path';

const XML_PATH = path.join(process.cwd(), 'soboldentscom.WordPress.2026-09-01.xml');
const xml = fs.readFileSync(XML_PATH, 'utf-8');
const items = xml.split('<item>');

const ytVideos: any[] = [];
const seenIds = new Set<string>();

items.slice(1).forEach((item) => {
  const titleMatch = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || item.match(/<title>([\s\S]*?)<\/title>/);
  const contentMatch = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) || item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);

  if (contentMatch && titleMatch) {
    const title = titleMatch[1]
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;/g, '"')
      .replace(/&#8221;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/<[^>]*>?/g, '')
      .trim();

    const content = contentMatch[1];
    const ytMatch = content.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/i);

    if (ytMatch && !seenIds.has(ytMatch[1]) && !title.toLowerCase().includes('casino')) {
      seenIds.add(ytMatch[1]);
      ytVideos.push({
        id: `yt-${ytMatch[1]}`,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: title.toUpperCase(),
        category: 'Official Video',
        director: 'SO BOLD ENT / VEVO',
        thumbnailUrl: `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`,
        videoUrl: `https://www.youtube.com/embed/${ytMatch[1]}`,
        duration: '03:45',
        releaseDate: '2026',
        featured: ytVideos.length === 0,
      });
    }
  }
});

console.log(`✅ Extracted ${ytVideos.length} Official YouTube Videos:`);
console.log(JSON.stringify(ytVideos, null, 2));

// Save to lib/data/ytVideos.json
fs.writeFileSync(path.join(process.cwd(), 'lib', 'data', 'ytVideos.json'), JSON.stringify(ytVideos, null, 2));
