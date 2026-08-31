export type ArtistCategory =
  | 'All'
  | 'Musician'
  | 'Electronic'
  | 'Hip Hop'
  | 'Alternative Rock'
  | 'Contemporary Classical'
  | 'Producer'
  | 'Actor'
  | 'Director';

export interface DiscographyItem {
  title: string;
  year: string;
  type: 'Album' | 'Single' | 'EP' | 'Score' | 'Remix' | 'Live LP';
  coverUrl: string;
}

export interface TourDate {
  date: string;
  city: string;
  venue: string;
  status: 'On Sale' | 'Sold Out' | 'Upcoming';
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  category: ArtistCategory;
  role: string;
  imageUrl: string;
  coverUrl?: string;
  bio: string;
  quote?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  discography?: DiscographyItem[];
  tourDates?: TourDate[];
  featuredVideoUrl?: string;
  socials?: {
    platform: string;
    url: string;
  }[];
  spanClass?: string;
}

export interface MediaItem {
  id: string;
  slug: string;
  title: string;
  category: 'World Premiere' | 'Music Video' | 'Short Film' | 'Live Session' | 'Behind The Scenes';
  director: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration?: string;
  releaseDate: string;
  featured?: boolean;
}

export interface Dispatch {
  id: string;
  number: string;
  title: string;
  category: 'Press Release' | 'Tour Announcement' | 'Industry Insight' | 'Special Dispatch' | 'Industry Feature' | 'Interview' | 'Milestone';
  date: string;
  author: string;
  summary: string;
  content: string;
  imageUrl?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'Record Label' | 'Film Studio' | 'Global Brand' | 'Tech Platform' | 'Live Touring' | 'Distribution & Label Services' | 'Press & Media' | 'Digital Platform' | 'Music Tech' | 'Media Network';
  location: string;
  logoText: string;
  description: string;
  websiteUrl?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  inquiryType: 'management' | 'production' | 'consultation' | 'other';
  message: string;
  createdAt: string;
  status: 'Pending' | 'Reviewed' | 'Archived';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  stats: string;
  description: string;
  imageUrl: string;
  linkText: string;
}
