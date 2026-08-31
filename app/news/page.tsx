'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, ArrowRight, Award } from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import { Dispatch } from '@/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function NewsPage() {
  const dispatches = useCmsStore((state) => state.dispatches);
  const [expandedDispatch, setExpandedDispatch] = useState<Dispatch | null>(null);

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* News Header */}
      <header className="mb-20 pt-8 border-b border-surface-variant pb-12">
        <FadeIn direction="down">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4 flex items-center gap-2">
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
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setExpandedDispatch(dispatches[0])}
              className="shrink-0 w-full sm:w-auto justify-center"
            >
              Read Spotlight Feature
            </Button>
          </div>
        </section>
      )}

      {/* Dispatches List */}
      <section className="mb-24">
        <div className="mb-8 border-b border-surface-variant pb-4">
          <h2 className="font-display text-headline-lg text-primary uppercase">
            ALL DISPATCHES ({dispatches.length})
          </h2>
        </div>

        <div className="border border-surface-variant divide-y divide-surface-variant bg-surface-container-low">
          {dispatches.map((dispatch, idx) => (
            <FadeIn key={dispatch.id} delay={idx * 0.05}>
              <div className="p-8 hover:bg-surface-variant/20 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="max-w-4xl space-y-2">
                  <div className="flex items-center gap-3 font-body text-xs text-silver-leaf uppercase tracking-widest font-semibold">
                    <span className="font-display text-primary font-bold text-sm">#{dispatch.number}</span>
                    <span>•</span>
                    <span>{dispatch.category}</span>
                    <span>•</span>
                    <span>{dispatch.date}</span>
                  </div>
                  <h3 className="font-display text-headline-md md:text-headline-lg text-primary uppercase leading-snug">
                    {dispatch.title}
                  </h3>
                  <p className="font-body text-body-md text-silver-leaf line-clamp-2">
                    {dispatch.summary}
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setExpandedDispatch(dispatch)}
                  className="shrink-0 w-full md:w-auto justify-center"
                >
                  Read Full Article
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Dispatch Reader Lightbox Modal */}
      <Modal
        isOpen={!!expandedDispatch}
        onClose={() => setExpandedDispatch(null)}
        title={expandedDispatch?.title}
      >
        {expandedDispatch && (
          <div className="space-y-6 font-body text-body-md text-silver-leaf">
            <div className="flex items-center gap-3 text-xs text-primary uppercase tracking-widest border-b border-surface-variant pb-3 font-bold">
              <span>#{expandedDispatch.number}</span>
              <span>•</span>
              <span>{expandedDispatch.category}</span>
              <span>•</span>
              <span>{expandedDispatch.date}</span>
              <span>•</span>
              <span>{expandedDispatch.author}</span>
            </div>
            <p className="text-body-lg text-primary leading-relaxed font-semibold">
              {expandedDispatch.summary}
            </p>
            <p className="leading-relaxed whitespace-pre-line text-silver-leaf/90">
              {expandedDispatch.content || expandedDispatch.summary}
            </p>
          </div>
        )}
      </Modal>

      {/* CTA Footer */}
      <div className="pt-10 border-t border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <p className="font-body text-label-caps text-silver-leaf/70 uppercase tracking-widest">
          SOBOLDENTS Media &amp; Press Relations Desk
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-body text-label-caps text-primary uppercase tracking-[0.2em] hover:gap-5 transition-all border-b border-primary pb-1 font-bold"
        >
          <span>Submit Press &amp; Media Inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
