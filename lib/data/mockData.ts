import { Artist, MediaItem, Dispatch, Partner, CaseStudy } from '@/types';
import wpImportData from '@/lib/data/wpImportedData.json';
import ytVideosData from '@/lib/data/ytVideos.json';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '1',
    slug: 'aingee',
    name: 'AINGEE',
    category: 'Electronic',
    role: 'Singer / Songwriter & Electronic Producer',
    imageUrl: '/images/artists/aingee-avatar.jpg',
    coverUrl: '/images/artists/aingee-cover.jpg',
    bio: 'Swiss singer/songwriter and electronic producer Aingee creates captivating soundscapes blending pop, R&B, electronic, and dark ambient textures. Featured on Sony Radial by The Orchard, her catalog has reached millions of streams globally.',
    quote:
      'Music is an emotional constellation where vulnerability meets sonic power.',
    stats: [
      { label: 'Global Streams', value: '1.5M+' },
      { label: 'Chart Rank', value: '#106 DRT Indie' },
    ],
    discography: [
      { title: 'CONSTELLATIONS', year: '2026', type: 'EP', coverUrl: '/images/news/wp-47546.png' },
      { title: 'LOVE UNSWEETENED', year: '2024', type: 'Album', coverUrl: '/images/artists/aingee-cover.jpg' },
      { title: 'UNHURT ME', year: '2025', type: 'Single', coverUrl: '/images/news/wp-5703.jpg' },
      { title: 'KING DRUG RMX', year: '2025', type: 'Remix', coverUrl: '/images/news/wp-5632.jpg' },
    ],
    socials: [
      { platform: 'Spotify', url: 'https://open.spotify.com' },
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'YouTube', url: 'https://youtube.com' },
    ],
    spanClass: 'col-span-12 md:col-span-8',
  },
  {
    id: '2',
    slug: 'tre-sax',
    name: "TRE' SAX",
    category: 'Contemporary Classical',
    role: 'Virtuoso Saxophonist & Composer',
    imageUrl: '/images/artists/tre-sax-avatar.jpg',
    coverUrl: '/images/artists/tre-sax-cover.jpg',
    bio: 'Virtuoso saxophonist and composer Tre’ Sax crafts expressive alt-jazz soundscapes, blending classical woodwind precision with soulful modern rhythm. Featured in Grammy Weekly for his latest release "Love Life".',
    quote: 'The saxophone is the closest instrument to the human soul.',
    stats: [
      { label: 'Feature', value: 'Grammy Weekly' },
      { label: 'Catalog', value: 'Blue Note Partnership' },
    ],
    discography: [
      { title: 'LOVE & LIFE', year: '2026', type: 'Album', coverUrl: '/images/news/wp-45383.jpg' },
      { title: 'LIVE IN CONCERT', year: '2025', type: 'Live LP', coverUrl: '/images/artists/tre-sax-cover.jpg' },
    ],
    spanClass: 'col-span-12 md:col-span-4',
  },
  {
    id: '3',
    slug: 'carolina-de-athey',
    name: 'CAROLINA DE ATHEY',
    category: 'Alternative Rock',
    role: 'Pop & World Fusion Performing Artist',
    imageUrl: '/images/artists/carolina-de-athey-avatar.jpg',
    coverUrl: '/images/artists/carolina-de-athey-cover.jpg',
    bio: 'Dynamic Latin fusion powerhouse Carolina de Athey broke global streaming records with her hit single "Besame", crossing over 100K views on YouTube and hosting the Music Awards After Party.',
    quote: 'Passion in music transcends all language barriers.',
    stats: [
      { label: 'YouTube Milestone', value: '120K+ Views' },
      { label: 'Event Host', value: 'Music Awards' },
    ],
    discography: [
      { title: 'BESAME', year: '2025', type: 'Single', coverUrl: '/images/artists/carolina-de-athey-avatar.jpg' },
    ],
    spanClass: 'col-span-12 md:col-span-6',
  },
  {
    id: '4',
    slug: 'badonna',
    name: 'BADONNA',
    category: 'Hip Hop',
    role: 'Hip Hop & R&B Performing Artist',
    imageUrl: '/images/artists/badonna-avatar.jpg',
    coverUrl: '/images/artists/badonna-cover.jpg',
    bio: 'Breakout hip-hop and R&B artist Badonna released her sensual single "Honey Comb" in 2026 under SO BOLD ENT in distribution partnership with Virgin Music Group / Universal Music Group.',
    quote: 'Authenticity is the currency of longevity.',
    stats: [
      { label: 'Major Deal', value: 'Virgin Music / UMG' },
      { label: 'Single', value: 'Honey Comb' },
    ],
    discography: [
      { title: 'HONEY COMB', year: '2026', type: 'Single', coverUrl: '/images/artists/badonna-avatar.jpg' },
    ],
    spanClass: 'col-span-12 md:col-span-6',
  },
  {
    id: '5',
    slug: 'douglas-lofton-jr',
    name: 'DOUGLAS LOFTON JR.',
    category: 'Producer',
    role: 'CEO & Founder — Talent Architecture & Business Consulting',
    imageUrl: '/images/artists/douglas-lofton-jr-avatar.jpg',
    coverUrl: '/images/artists/douglas-lofton-jr-cover.jpg',
    bio: 'Former rap artist and business entrepreneur who turned a passion for entertainment culture into SO BOLD ENT. Featured in Billboard Music for signing major distribution deals with Tuff Gong, Virgin Music Group, and Universal Music Group.',
    quote: 'This partnership is about more than music. It’s about building a legacy platform where real artists get real opportunities.',
    stats: [
      { label: 'Press Spotlight', value: 'Billboard Music' },
      { label: 'Major Deal', value: 'Tuff Gong / Virgin / UMG' },
    ],
    spanClass: 'col-span-12',
  },
];

// 16 Official YouTube Video Items Extracted from WordPress Site
export const MOCK_MEDIA_ITEMS: MediaItem[] =
  ytVideosData && ytVideosData.length > 0
    ? (ytVideosData as MediaItem[])
    : [
        {
          id: 'm1',
          slug: 'aingee-constellations-premiere',
          title: 'AINGEE — CONSTELLATIONS EP',
          category: 'World Premiere',
          director: 'SO BOLD ENT Visuals',
          thumbnailUrl: '/images/news/wp-47546.png',
          videoUrl: 'https://www.youtube.com/embed/g0V05jsnZOc',
          duration: '04:15',
          releaseDate: '2026',
          featured: true,
        },
      ];

// Browser-safe helper to map remote URLs to local downloaded images
function formatDispatchLocalImages(dispatches: any[]): Dispatch[] {
  if (!dispatches || !Array.isArray(dispatches)) return [];
  return dispatches.map((d: any) => {
    let finalImageUrl = d.localImageUrl || d.imageUrl;
    if (d.id) {
      if (d.id === 'wp-47546') {
        finalImageUrl = `/images/news/${d.id}.png`;
      } else {
        finalImageUrl = `/images/news/${d.id}.jpg`;
      }
    }
    return {
      ...d,
      imageUrl: finalImageUrl,
    };
  });
}

// 20 Official Dispatches with Local Image Assets
export const MOCK_DISPATCHES: Dispatch[] =
  wpImportData.dispatches && wpImportData.dispatches.length > 0
    ? formatDispatchLocalImages(wpImportData.dispatches)
    : [
        {
          id: 'd0',
          slug: 'douglas-lofton-jr-billboard-spotlight',
          number: '00',
          title: 'DOUGLAS "II NICE" LOFTON JR. CEO OF SO BOLD ENT LAUNCHES BOLD NEW ERA WITH BILLBOARD MUSIC SPOTLIGHT',
          category: 'Industry Feature',
          date: 'AUG 19, 2025',
          author: 'BILLBOARD MUSIC',
          summary:
            'SO BOLD ENT CEO Douglas Lofton Jr. signs major distribution partnership with Tuff Gong, Virgin Music Group, UMG, and YOU42.',
          content:
            'So Bold Entertainment, under the visionary leadership of Douglas "II Nice" Lofton Jr., has taken a powerful step onto the global stage.',
          imageUrl: '/images/artists/douglas-lofton-jr-avatar.jpg',
        },
      ];

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'p1',
    name: 'Tuff Gong International',
    category: 'Distribution & Label Services',
    location: 'Kingston / Global',
    logoText: 'TUFF GONG',
    description: 'Legendary Jamaican music empire and global distribution powerhouse.',
    websiteUrl: 'https://tuffgong.com',
  },
  {
    id: 'p2',
    name: 'Virgin Music Group',
    category: 'Distribution & Label Services',
    location: 'New York / Global',
    logoText: 'VIRGIN MUSIC',
    description: 'Universal Music Group global distribution infrastructure and artist services.',
    websiteUrl: 'https://virginmusic.com',
  },
  {
    id: 'p3',
    name: 'Universal Music Group',
    category: 'Record Label',
    location: 'Global',
    logoText: 'UMG',
    description: 'World leader in music-based entertainment and global catalog operations.',
    websiteUrl: 'https://universalmusic.com',
  },
  {
    id: 'p4',
    name: 'Billboard Music',
    category: 'Press & Media',
    location: 'New York, NY',
    logoText: 'BILLBOARD',
    description: 'Premier global music industry journal and executive chart spotlight.',
    websiteUrl: 'https://billboard.com',
  },
  {
    id: 'p5',
    name: 'Grammy Weekly',
    category: 'Press & Media',
    location: 'Los Angeles, CA',
    logoText: 'GRAMMY WEEKLY',
    description: 'Weekly publication spotlighting virtuosic talent and Grammy-class performers.',
  },
  {
    id: 'p6',
    name: 'The Orchard / Sony Music',
    category: 'Distribution & Label Services',
    location: 'Global',
    logoText: 'THE ORCHARD',
    description: 'Pioneering digital distribution network powering Sony Music independent partnerships.',
  },
  {
    id: 'p7',
    name: 'Blue Note Records',
    category: 'Record Label',
    location: 'New York, NY',
    logoText: 'BLUE NOTE',
    description: 'Iconic jazz record label partnering on contemporary classical woodwind releases.',
  },
  {
    id: 'p8',
    name: 'YOU42',
    category: 'Digital Platform',
    location: 'Atlanta, GA',
    logoText: 'YOU42',
    description: 'Exclusive video broadcasting channel for SO BOLD ENT artist content.',
  },
];

export const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Consulting & Business Management',
    subtitle: 'Agency Flagship Architecture',
    category: 'Talent Representation',
    stats: 'MUSIC / FILM / FASHION / MODELS',
    description:
      'Helmed by CEO Douglas Lofton Jr., SO BOLD ENT empowers artists, filmmakers, models, and actors to build global fame, sustainable revenue, and cultural independence.',
    imageUrl: '/images/artists/douglas-lofton-jr-avatar.jpg',
    linkText: 'EXPLORE AGENCY SERVICES',
  },
];
