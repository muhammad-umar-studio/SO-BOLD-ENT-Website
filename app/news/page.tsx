'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, ArrowRight, Award } from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function NewsPage() {
  const dispatches = useCmsStore((state) => state.dispatches);

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* News Header */}
      <header className="mb-16 pt-8 border-b border-surface-variant pb-12">
        <FadeIn direction="down">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4 flex items-center gap-2 font-bold">
            <Newspaper className="w-4 h-4 text-primary" />
            Billboard Features &amp; Press Announcements
          </span>
          <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-none mb-6">
            NEWS &amp; DISPATCHES
          </h1>
          <p className="font-body text-body-lg text-silver-leaf max-w-3xl">
            Official press announcements, Billboard Music features, global distribution partnerships, and talent roster milestones from SOBOLDENTS Management Group.
          </p>
        </FadeIn>
      </header>

      {/* Featured Press Release Banner with Cover Image */}
      {dispatches.length > 0 && (
        <section className="border border-primary/40 bg-surface-container-low p-6 md:p-10 mb-16 relative overflow-hidden rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-4">
              <span className="font-body text-label-caps text-primary uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Award className="w-4 h-4 text-primary" /> Billboard Feature Spotlight — #{dispatches[0].number}
              </span>
              <h2 className="font-display text-[28px] sm:text-headline-lg text-primary uppercase leading-tight">
                {dispatches[0].title}
              </h2>
              <p className="font-body text-body-md text-silver-leaf mt-2 leading-relaxed line-clamp-3">
                {dispatches[0].summary}
              </p>
              <div className="pt-4">
                <Link href={`/news/${dispatches[0].slug || dispatches[0].id}`}>
                  <Button
                    variant="primary"
                    icon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto justify-center"
                  >
                    Read Spotlight Feature
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Cover Art */}
            {dispatches[0].imageUrl && (
              <div className="md:col-span-5 relative w-full h-[240px] md:h-[300px] border border-surface-variant rounded-lg overflow-hidden bg-black/40">
                <Image
                  src={dispatches[0].imageUrl}
                  alt={dispatches[0].title}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dispatches List */}
      <div className="space-y-6 max-w-6xl mx-auto">
        <h3 className="font-display text-headline-sm uppercase text-primary tracking-wider mb-8 border-b border-surface-variant pb-4">
          All Press Dispatches &amp; Media Statements ({dispatches.length})
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {dispatches.map((dispatch, index) => (
            <FadeIn key={dispatch.id} direction="up" delay={index * 0.03}>
              <Link
                href={`/news/${dispatch.slug || dispatch.id}`}
                className="group block bg-surface-container-low p-6 md:p-8 border border-surface-variant hover:border-primary transition-all duration-300 shadow-sm rounded-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Thumbnail Image if available */}
                  {dispatch.imageUrl && (
                    <div className="relative w-full md:w-48 h-36 shrink-0 border border-surface-variant rounded-md overflow-hidden bg-black/40">
                      <Image
                        src={dispatch.imageUrl}
                        alt={dispatch.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-body text-xs bg-surface-container text-primary font-bold px-2.5 py-1 uppercase tracking-widest border border-surface-variant">
                        #{dispatch.number}
                      </span>
                      <span className="font-body text-xs text-silver-leaf uppercase tracking-widest">
                        {dispatch.category} • {dispatch.date}
                      </span>
                    </div>

                    <h2 className="font-display text-headline-sm md:text-headline-md text-primary uppercase group-hover:text-primary transition-colors leading-tight">
                      {dispatch.title}
                    </h2>

                    <p className="font-body text-body-md text-silver-leaf line-clamp-2">
                      {dispatch.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-body text-label-caps uppercase tracking-wider group-hover:translate-x-2 transition-transform shrink-0 font-bold self-start md:self-center">
                    <span>Read Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
