'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ArtistCategory } from '@/types';
import { useCmsStore } from '@/lib/store/cmsStore';
import FadeIn from '@/components/motion/FadeIn';

const CATEGORIES: ArtistCategory[] = [
  'All',
  'Electronic',
  'Hip Hop',
  'Alternative Rock',
  'Contemporary Classical',
  'Producer',
];

export default function ClientsPage() {
  const [activeCategory, setActiveCategory] = useState<ArtistCategory>('All');
  const artists = useCmsStore((state) => state.artists);

  const filteredArtists =
    activeCategory === 'All'
      ? artists
      : artists.filter((artist) => artist.category === activeCategory);

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Page Header */}
      <header className="mb-16 md:mb-20 pt-8 border-b border-surface-variant pb-10">
        <FadeIn direction="down">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-3">
                Roster &amp; Talent Representation
              </span>
              <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-none">
                CLIENTS &amp; ROSTER
              </h1>
            </div>
            <p className="font-body text-body-lg text-silver-leaf max-w-xl">
              Representing musicians, producers, filmmakers, models, and actors. Guided by SOBOLDENTS Consulting &amp; Business Management.
            </p>
          </div>
        </FadeIn>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-surface-variant/40">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-body text-label-caps uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-onyx-black border-primary font-bold shadow-lg'
                    : 'bg-surface-container-low text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </header>

      {/* Asymmetric Roster Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArtists.map((artist, index) => {
            // Assign responsive brutalist span classes
            const defaultSpan =
              index % 3 === 0
                ? 'md:col-span-8 h-[65vh]'
                : index % 3 === 1
                ? 'md:col-span-4 h-[65vh]'
                : 'md:col-span-6 h-[55vh]';

            const spanClass = artist.spanClass || defaultSpan;

            return (
              <motion.div
                key={artist.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                className={`relative border border-surface-variant bg-surface-container-low overflow-hidden group dark-overlay-card ${spanClass}`}
              >
                <Link href={`/clients/${artist.slug}`} className="block w-full h-full relative">
                  {/* Background Image with Monochromatic Overlay */}
                  <Image
                    src={artist.coverUrl || artist.imageUrl}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                    className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx-black via-onyx-black/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    {/* Header Badges */}
                    <div className="flex justify-between items-start">
                      <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] bg-onyx-black/80 px-3 py-1 border border-surface-variant backdrop-blur-sm">
                        {artist.category}
                      </span>

                      <div className="w-10 h-10 border border-surface-variant bg-onyx-black/80 backdrop-blur-sm flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                        <ArrowRight className="w-5 h-5 text-silver-leaf group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>

                    {/* Bottom Details */}
                    <div>
                      <span className="font-body text-label-caps text-silver-leaf/80 block uppercase tracking-widest mb-2 font-semibold">
                        {artist.role}
                      </span>
                      <h2 className="font-display text-display-lg text-primary uppercase leading-tight tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-300">
                        {artist.name}
                      </h2>

                      {/* Stat Pills */}
                      {artist.stats && artist.stats.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-variant/40">
                          {artist.stats.map((stat, i) => (
                            <span
                              key={i}
                              className="font-body text-[10px] uppercase tracking-wider text-silver-leaf/80 bg-surface-container-low px-2.5 py-1 border border-surface-variant/60"
                            >
                              {stat.label}: <strong className="text-primary">{stat.value}</strong>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Roster Callout Footer */}
      <div className="mt-20 pt-10 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-label-caps text-silver-leaf/70 uppercase tracking-widest">
          Showing {filteredArtists.length} of {artists.length} Represented Clients &amp; Artists
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-body text-label-caps text-primary uppercase tracking-[0.2em] hover:gap-5 transition-all border-b border-primary pb-1 font-bold"
        >
          <span>Submit Roster &amp; Consulting Inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
