import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Marquee from '@/components/motion/Marquee';
import NewsSlider from '@/components/home/NewsSlider';
import HeroSlider from '@/components/home/HeroSlider';
import { MOCK_ARTISTS } from '@/lib/data/mockData';

export default function HomePage() {
  const marqueeItems = [
    'LATEST RELEASES',
    'GLOBAL TOURS',
    'BRAND PARTNERSHIPS',
    'EXCLUSIVE CONTENT',
    'SONIC ARCHITECTURE',
    'TALENT MANAGEMENT',
  ];

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* Full-Screen Interactive Project Hero Carousel */}
      <HeroSlider />

      {/* Marquee Divider */}
      <div className="w-full border-y border-surface-variant py-4 bg-surface-container-low">
        <Marquee items={marqueeItems} speed={40} />
      </div>

      {/* Featured Roster Section — ALL ARTISTS */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-onyx-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-surface-variant gap-4">
          <div>
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-2">
              Talent Representation
            </span>
            <h2 className="font-display text-[32px] sm:text-headline-lg text-primary uppercase">
              THE ROSTER
            </h2>
          </div>
          <Link
            href="/clients"
            className="font-body text-label-caps text-primary uppercase tracking-[0.2em] hover:gap-3 transition-all flex items-center gap-2 border-b border-primary pb-1 font-bold w-max"
          >
            <span>View All Roster &amp; Clients</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Grid for ALL Artists */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {MOCK_ARTISTS.map((artist, index) => {
            const spanClass =
              index === 0
                ? 'md:col-span-8 h-[520px]'
                : index === 1
                ? 'md:col-span-4 h-[520px]'
                : index === 2
                ? 'md:col-span-6 h-[460px]'
                : index === 3
                ? 'md:col-span-6 h-[460px]'
                : 'md:col-span-12 h-[400px]';

            return (
              <div
                key={artist.id}
                className={`relative border border-surface-variant overflow-hidden group bg-surface-container-low dark-overlay-card ${spanClass}`}
              >
                <Link href={`/clients/${artist.slug}`} className="block w-full h-full relative">
                  <Image
                    src={artist.coverUrl || artist.imageUrl}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                    className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-black via-onyx-black/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest px-3 py-1 bg-surface-container-low/80 border border-surface-variant/50 backdrop-blur-sm">
                        {artist.category}
                      </span>
                      <span className="font-body text-label-caps text-neon-gold uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        View Profile <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-[28px] sm:text-headline-md text-primary uppercase leading-tight mb-2 group-hover:text-neon-gold transition-colors duration-300">
                        {artist.name}
                      </h3>
                      <p className="font-body text-body-md text-silver-leaf/80 max-w-xl line-clamp-2">
                        {artist.role} — {artist.bio}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animated News Carousel Slider */}
      <NewsSlider />
    </div>
  );
}
