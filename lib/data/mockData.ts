import { Artist, MediaItem, Dispatch, Partner, CaseStudy } from '@/types';

export const MOCK_ARTISTS: Artist[] = [
  {
    id: '1',
    slug: 'aingee',
    name: 'AINGEE',
    category: 'Electronic',
    role: 'Singer / Songwriter & Electronic Producer',
    imageUrl:
      'https://soboldents.com/wp-content/uploads/2026/08/Constellations-Album-Cover-5-1024x1024.png',
    coverUrl:
      'https://soboldents.com/wp-content/uploads/2024/06/image000001-1024x1024.jpg',
    bio: 'Visionary vocalist and electronic artist known for her critically acclaimed EP "Constellations", 2nd studio album "Love Unsweetened", and hit singles "Unhurt Me" & "King Drug RMX" featured on The Orchard.',
    quote: 'Music is an emotional constellation where vulnerability meets sonic power.',
    stats: [
      { label: 'Featured On', value: 'The Orchard' },
      { label: 'Albums Released', value: '2 Studio LPs' },
      { label: 'SoundCloud Feature', value: 'RepostExchange' },
    ],
    discography: [
      { title: 'CONSTELLATIONS', year: '2026', type: 'EP', coverUrl: 'https://soboldents.com/wp-content/uploads/2026/08/Constellations-Album-Cover-5-500x500.png' },
      { title: 'LOVE UNSWEETENED', year: '2024', type: 'Album', coverUrl: 'https://soboldents.com/wp-content/uploads/2024/06/image000001-1024x1024.jpg' },
      { title: 'UNHURT ME', year: '2025', type: 'Single', coverUrl: 'https://soboldents.com/wp-content/uploads/2025/02/Aingee_Unhurt_Me_Cover_Amuse-1024x1024.jpg' },
      { title: 'KING DRUG RMX', year: '2025', type: 'Remix', coverUrl: 'https://soboldents.com/wp-content/uploads/2025/01/KD-Cover-by-Aingee-ohne-name.jpg' },
    ],
    tourDates: [
      { date: 'SEP 15, 2026', city: 'LOS ANGELES', venue: 'THE ROXY THEATRE', status: 'On Sale' },
      { date: 'OCT 08, 2026', city: 'NEW YORK', venue: 'BOWERY BALLROOM', status: 'On Sale' },
    ],
    featuredVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '2',
    slug: 'tre-sax',
    name: 'TRE’ SAX',
    category: 'Contemporary Classical',
    role: 'Virtuoso Saxophonist & Composer',
    imageUrl:
      'https://soboldents.com/wp-content/uploads/2026/03/Tre-Sax-Article-Love-Life-3-500x500.jpg',
    coverUrl:
      'https://soboldents.com/wp-content/uploads/2025/01/Tre-Sax-saxin4-1.jpg',
    bio: 'Acclaimed saxophonist featured on Grammy Weekly, blending classical jazz sensibilities with soul-stirring live concert performances worldwide.',
    quote: 'The saxophone is the closest instrument to the human soul.',
    stats: [
      { label: 'Press Highlight', value: 'Grammy Weekly' },
      { label: 'Live Performances', value: '150+ Shows' },
    ],
    discography: [
      { title: 'LOVE & LIFE', year: '2026', type: 'Album', coverUrl: 'https://soboldents.com/wp-content/uploads/2026/03/Tre-Sax-Article-Love-Life-3-500x500.jpg' },
      { title: 'LIVE IN CONCERT', year: '2025', type: 'Live LP', coverUrl: 'https://soboldents.com/wp-content/uploads/2025/01/Tre-Sax-saxin4-1.jpg' },
    ],
    tourDates: [
      { date: 'OCT 12, 2026', city: 'CHICAGO', venue: 'SYMPHONY CENTER', status: 'Sold Out' },
      { date: 'NOV 20, 2026', city: 'LONDON', venue: 'RONNIE SCOTT’S', status: 'On Sale' },
    ],
  },
  {
    id: '3',
    slug: 'carolina-de-athey',
    name: 'CAROLINA DE ATHEY',
    category: 'Alternative Rock',
    role: 'Pop & World Fusion Artist',
    imageUrl:
      'https://soboldents.com/wp-content/uploads/2023/10/Carolina-de-Athey-home-page-slide-1024x1024.jpg',
    coverUrl:
      'https://soboldents.com/wp-content/uploads/2025/01/music-awards-carolina-1024x1024.jpg',
    bio: 'Latin-fusion powerhouse artist whose hit single "Besame" surpassed 100K+ YouTube views. Host of the Music Awards After-Party.',
    quote: 'Passion in music transcends all language barriers.',
    stats: [
      { label: 'YouTube Views', value: '100K+ Besame' },
      { label: 'Event Host', value: 'Music Awards Party' },
    ],
    discography: [
      { title: 'BESAME', year: '2025', type: 'Single', coverUrl: 'https://soboldents.com/wp-content/uploads/2023/10/Carolina-de-Athey-home-page-slide-1024x1024.jpg' },
    ],
  },
  {
    id: '4',
    slug: 'badonna',
    name: 'BADONNA',
    category: 'Hip Hop',
    role: 'Hip Hop / R&B Performing Artist',
    imageUrl:
      'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg',
    coverUrl:
      'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg',
    bio: 'Rising hip-hop force captivating audiences with her breakout 2026 anthem "Honey Comb". Managed under SO BOLD ENT consulting & development roster.',
    quote: 'Authenticity is the currency of longevity.',
    stats: [
      { label: 'Breakout Release', value: 'Honey Comb (2026)' },
    ],
    discography: [
      { title: 'HONEY COMB', year: '2026', type: 'Single', coverUrl: 'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg' },
    ],
  },
  {
    id: '5',
    slug: 'douglas-lofton-jr',
    name: 'DOUGLAS LOFTON JR.',
    category: 'Producer',
    role: 'CEO & Founder — Talent Architecture & Business Consulting',
    imageUrl:
      'https://billboardworldmusic.com/wp-content/uploads/2025/08/Screenshot-2025-08-20-at-01.08.57.png',
    coverUrl:
      'https://billboardworldmusic.com/wp-content/uploads/2025/08/Screenshot-2025-08-20-at-01.08.57.png',
    bio: 'Former rap artist and business entrepreneur who turned a passion for entertainment culture into SO BOLD ENT. Featured in Billboard Music for signing major distribution deals with Tuff Gong, Virgin Music Group, and Universal Music Group.',
    quote: 'This partnership is about more than music. It’s about building a legacy platform where real artists get real opportunities.',
    stats: [
      { label: 'Press Spotlight', value: 'Billboard Music' },
      { label: 'Major Deal', value: 'Tuff Gong / Virgin / UMG' },
    ],
  },
];

export const MOCK_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm1',
    slug: 'aingee-constellations-ep',
    title: 'AINGEE — CONSTELLATIONS EP',
    category: 'World Premiere',
    director: 'SO BOLD ENT Visuals',
    thumbnailUrl:
      'https://soboldents.com/wp-content/uploads/2026/08/Constellations-Album-Cover-5-1024x1024.png',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '04:15',
    releaseDate: 'AUG 2026',
    featured: true,
  },
  {
    id: 'm2',
    slug: 'carolina-de-athey-besame',
    title: 'CAROLINA DE ATHEY — BESAME (100K VIEWS)',
    category: 'Music Video',
    director: 'SO BOLD ENT Production',
    thumbnailUrl:
      'https://soboldents.com/wp-content/uploads/2023/10/Carolina-de-Athey-home-page-slide-1024x1024.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '03:45',
    releaseDate: 'JAN 2025',
  },
  {
    id: 'm3',
    slug: 'tre-sax-live-concert',
    title: 'TRE’ SAX — LIVE IN CONCERT',
    category: 'Live Session',
    director: 'Grammy Weekly Showcase',
    thumbnailUrl:
      'https://soboldents.com/wp-content/uploads/2025/01/Tre-Sax-saxin4-1.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '08:20',
    releaseDate: 'JAN 2025',
  },
  {
    id: 'm4',
    slug: 'badonna-honey-comb',
    title: 'BADONNA — HONEY COMB',
    category: 'Short Film',
    director: 'SO BOLD ENT Films',
    thumbnailUrl:
      'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '03:30',
    releaseDate: 'JAN 2026',
  },
];

export const MOCK_DISPATCHES: Dispatch[] = [
  {
    id: 'd0',
    number: '00',
    title: 'DOUGLAS "II NICE" LOFTON JR. CEO OF SO BOLD ENT LAUNCHES BOLD NEW ERA WITH BILLBOARD MUSIC SPOTLIGHT',
    category: 'Industry Feature',
    date: 'AUG 19, 2025',
    author: 'BILLBOARD MUSIC',
    summary:
      'SO BOLD ENT CEO Douglas Lofton Jr. signs major distribution partnership with Tuff Gong, Virgin Music Group, UMG, and YOU42.',
    content:
      'So Bold Entertainment, under the visionary leadership of Douglas "II Nice" Lofton Jr., has taken a powerful step onto the global stage. The company signed a distribution deal with Tuff Gong, Virgin Music Group, and Universal Music Group, alongside digital platform partner YOU42.',
  },
  {
    id: 'd1',
    number: '01',
    title: 'AINGEE RELEASES HER SECOND STUDIO EP "CONSTELLATIONS"',
    category: 'Press Release',
    date: 'AUG 20, 2026',
    author: 'SO BOLD ENT EDITORIAL',
    summary:
      'Vocalist and electronic producer Aingee drops her highly anticipated 2nd studio EP Constellations across all streaming platforms.',
    content:
      'Following the success of her 2nd studio album "Love Unsweetened", Aingee returns with "Constellations" — an ambient yet powerful 5-track project demonstrating her vocal evolution and sonic production depth.',
  },
  {
    id: 'd2',
    number: '02',
    title: 'TRE’ SAX FEATURED ON GRAMMY WEEKLY SHOWCASE',
    category: 'Industry Feature',
    date: 'MAR 10, 2026',
    author: 'PRESS DESK',
    summary:
      'Grammy Weekly spotlights virtuosic saxophonist Tre’ Sax for his pioneering integration of contemporary soul and classical jazz.',
    content:
      'Grammy Weekly published an in-depth feature celebrating Tre’ Sax and his latest concert series, highlighting how SO BOLD ENT business management strategy has expanded his global footprint.',
  },
  {
    id: 'd3',
    number: '03',
    title: 'AINGEE FEATURED IN SOUNDCLOUD REPOSTEXCHANGE INTERVIEW',
    category: 'Interview',
    date: 'FEB 10, 2026',
    author: 'MEDIA TEAM',
    summary:
      'SoundCloud’s RepostExchange interviews Aingee regarding creative independence, songwriting techniques, and catalog development.',
    content:
      'Aingee sat down with SoundCloud RepostExchange for an exclusive interview on navigating the independent music industry, building an authentic fanbase, and managing artistic vision under SO BOLD ENT guidance.',
  },
  {
    id: 'd4',
    number: '04',
    title: 'CAROLINA DE ATHEY "BESAME" CROSSES 100K YOUTUBE VIEWS',
    category: 'Milestone',
    date: 'JAN 30, 2025',
    author: 'ANALYTICS DIVISION',
    summary:
      'Latin fusion hit "Besame" reaches 100,000 organic views on YouTube as Carolina de Athey hosts the Music Awards After-Party.',
    content:
      'Carolina de Athey celebrates a major streaming milestone as "Besame" passes 100,000 views on YouTube, demonstrating rapid international momentum across Latin and pop music communities.',
  },
];

export const MOCK_PARTNERS: Partner[] = [
  {
    id: 'p0',
    name: 'VIRGIN MUSIC GROUP & UMG',
    category: 'Distribution & Label Services',
    location: 'GLOBAL',
    logoText: 'VIRGIN MUSIC GROUP',
    description: 'Major strategic distribution and global label partnership powering SO BOLD ENT music and film catalog worldwide.',
  },
  {
    id: 'p00',
    name: 'TUFF GONG INTERNATIONAL',
    category: 'Record Label',
    location: 'KINGSTON / GLOBAL',
    logoText: 'TUFF GONG',
    description: 'Legendary music label and global distribution collaborator for SO BOLD ENT artist releases.',
  },
  {
    id: 'p1',
    name: 'THE ORCHARD',
    category: 'Distribution & Label Services',
    location: 'NEW YORK / GLOBAL',
    logoText: 'THE ORCHARD',
    description: 'Digital playlisting and global streaming distribution partner for SO BOLD ENT releases.',
  },
  {
    id: 'p2',
    name: 'GRAMMY WEEKLY',
    category: 'Press & Media',
    location: 'LOS ANGELES',
    logoText: 'GRAMMY WEEKLY',
    description: 'Editorial feature partner spotlighting SO BOLD ENT vanguard concert artists.',
  },
  {
    id: 'p3',
    name: 'SOUNDCLOUD REPOSTEXCHANGE',
    category: 'Digital Platform',
    location: 'GLOBAL',
    logoText: 'SOUNDCLOUD',
    description: 'Artist promotion and global streaming optimization partner.',
  },
  {
    id: 'p4',
    name: 'AMUSE DISTRIBUTION',
    category: 'Music Tech',
    location: 'STOCKHOLM',
    logoText: 'AMUSE',
    description: 'Global digital distribution for single releases and catalog licensing.',
  },
  {
    id: 'p5',
    name: 'YOU42 CHANNELS',
    category: 'Media Network',
    location: 'ATLANTA',
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
    imageUrl:
      'https://billboardworldmusic.com/wp-content/uploads/2025/08/Screenshot-2025-08-20-at-01.08.57.png',
    linkText: 'EXPLORE AGENCY SERVICES',
  },
];
