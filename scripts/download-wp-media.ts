import fs from 'fs';
import path from 'path';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const WP_DATA_PATH = path.join(process.cwd(), 'lib', 'data', 'wpImportedData.json');
const MOCK_DATA_PATH = path.join(process.cwd(), 'lib', 'data', 'mockData.ts');

const ARTISTS_DIR = path.join(PUBLIC_IMAGES_DIR, 'artists');
const NEWS_DIR = path.join(PUBLIC_IMAGES_DIR, 'news');
const CONTENT_DIR = path.join(PUBLIC_IMAGES_DIR, 'wp-content');

// Helper to ensure directories exist
[PUBLIC_IMAGES_DIR, ARTISTS_DIR, NEWS_DIR, CONTENT_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Download helper with retry and buffer saving
async function downloadImage(url: string, targetPath: string): Promise<boolean> {
  if (!url || !url.startsWith('http')) return false;

  // Skip downloading if already exists and non-empty
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 100) {
    console.log(`⏩ Already downloaded: ${path.basename(targetPath)}`);
    return true;
  }

  try {
    console.log(`📥 Downloading ${url} ...`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!res.ok) {
      console.warn(`⚠️ HTTP ${res.status} for ${url}`);
      return false;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length < 100) {
      console.warn(`⚠️ Image buffer too small for ${url}`);
      return false;
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, buffer);
    console.log(`✅ Saved ${path.basename(targetPath)} (${Math.round(buffer.length / 1024)} KB)`);
    return true;
  } catch (err: any) {
    console.error(`❌ Error downloading ${url}:`, err.message);
    return false;
  }
}

async function runMediaDownloadPipeline() {
  console.log('=========================================================');
  console.log('🖼️ STARTING LOCAL WORDPRESS MEDIA DOWNLOAD & ASSET MAPPING');
  console.log('=========================================================');

  // 1. Download Artist Images
  console.log('\n--- Downloading Official Artist Assets ---');

  const artistImageMap: Record<string, { imageRemote: string; coverRemote: string }> = {
    aingee: {
      imageRemote: 'https://soboldents.com/wp-content/uploads/2026/08/Constellations-Album-Cover-5-1024x1024.png',
      coverRemote: 'https://soboldents.com/wp-content/uploads/2024/06/image000001-1024x1024.jpg',
    },
    'tre-sax': {
      imageRemote: 'https://soboldents.com/wp-content/uploads/2026/03/Tre-Sax-Article-Love-Life-3-500x500.jpg',
      coverRemote: 'https://soboldents.com/wp-content/uploads/2025/01/Tre-Sax-saxin4-1.jpg',
    },
    'carolina-de-athey': {
      imageRemote: 'https://soboldents.com/wp-content/uploads/2023/10/Carolina-de-Athey-home-page-slide-1024x1024.jpg',
      coverRemote: 'https://soboldents.com/wp-content/uploads/2025/01/music-awards-carolina-1024x1024.jpg',
    },
    badonna: {
      imageRemote: 'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg',
      coverRemote: 'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg',
    },
    'douglas-lofton-jr': {
      imageRemote: 'https://soboldents.com/wp-content/uploads/2025/07/Douglas-Lofton-Portrait-Photo-scaled.jpg',
      coverRemote: 'https://soboldents.com/wp-content/uploads/2025/07/Douglas-Lofton-Portrait-Photo-scaled.jpg',
    },
  };

  for (const [artistSlug, remoteUrls] of Object.entries(artistImageMap)) {
    const avatarPath = path.join(ARTISTS_DIR, `${artistSlug}-avatar.jpg`);
    const coverPath = path.join(ARTISTS_DIR, `${artistSlug}-cover.jpg`);

    await downloadImage(remoteUrls.imageRemote, avatarPath);
    await downloadImage(remoteUrls.coverRemote, coverPath);
  }

  // 2. Download News Dispatch Images
  console.log('\n--- Downloading News & Press Release Images ---');
  if (fs.existsSync(WP_DATA_PATH)) {
    const wpData = JSON.parse(fs.readFileSync(WP_DATA_PATH, 'utf-8'));
    const dispatches = wpData.dispatches || [];

    for (let i = 0; i < dispatches.length; i++) {
      const d = dispatches[i];
      if (d.imageUrl) {
        const ext = path.extname(d.imageUrl) || '.jpg';
        const filename = `${d.id}${ext}`;
        const localPath = path.join(NEWS_DIR, filename);

        const success = await downloadImage(d.imageUrl, localPath);
        if (success) {
          d.localImageUrl = `/images/news/${filename}`;
        }
      }
    }

    fs.writeFileSync(WP_DATA_PATH, JSON.stringify(wpData, null, 2), 'utf-8');
    console.log(`✅ Updated ${WP_DATA_PATH} with local image URLs.`);
  }

  console.log('\n=========================================================');
  console.log('🎉 ALL WORDPRESS IMAGES EXTRACTED TO PUBLIC LOCAL FOLDER!');
  console.log('=========================================================\n');
}

runMediaDownloadPipeline();
