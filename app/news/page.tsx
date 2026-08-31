'use client';

import React from 'react';
import Link from 'next/link';
import { Newspaper, ArrowRight, Award } from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function NewsPage() {
  const dispatches = useCmsStore((state) => state.dispatches);

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* News Header */}
      <header className="mb-20 pt-8 border-b border-surface-variant pb-12">
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

      {/* Featured Press Release Banner */}
      {dispatches.length > 0 && (
        <section className="border border-primary/40 bg-surface-container-low p-8 md:p-14 mb-20 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="max-w-3xl space-y-3">
              <span className="font-body text-label-caps text-primary uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Award className="w-4 h-4 text-primary" /> Billboard Feature Spotlight — #{dispatches[0].number}
              </span>
              <h2 className="font-display text-[32px] sm:text-headline-lg text-primary uppercase leading-tight">
                {dispatches[0].title}
              </h2>
              <p className="font-body text-body-md text-silver-leaf mt-2 leading-relaxed">
                {dispatches[0].summary}
              </p>
            </div>
            <Link
              href={`/news/${dispatches[0].slug || dispatches[0].id}`}
              className="shrink-0 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Read Spotlight Feature
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Dispatches List */}
      <div className="space-y-6 max-w-5xl mx-auto">
        <h3 className="font-display text-headline-sm uppercase text-primary tracking-wider mb-8">
          All Press Dispatches &amp; Media Statements
        </h3>

        {dispatches.map((dispatch, index) => (
          <FadeIn key={dispatch.id} direction="up" delay={index * 0.05}>
            <Link
              href={`/news/${dispatch.slug || dispatch.id}`}
              className="group block bg-surface-container-low p-8 border border-surface-variant hover:border-primary transition-all duration-300 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-xs bg-surface-container text-primary font-bold px-2.5 py-1 uppercase tracking-widest border border-surface-variant">
                      #{dispatch.number}
                    </span>
                    <span className="font-body text-xs text-silver-leaf uppercase tracking-widest">
                      {dispatch.category} • {dispatch.date}
                    </span>
                  </div>

                  <h2 className="font-display text-headline-md text-primary uppercase group-hover:text-primary transition-colors leading-tight">
                    {dispatch.title}
                  </h2>

                  <p className="font-body text-body-md text-silver-leaf line-clamp-2">
                    {dispatch.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-primary font-body text-label-caps uppercase tracking-wider group-hover:translate-x-2 transition-transform shrink-0 font-bold">
                  <span>Read Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
