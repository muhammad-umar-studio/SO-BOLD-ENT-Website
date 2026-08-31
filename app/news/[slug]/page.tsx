'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft, Newspaper, Calendar, User, Tag, Share2, Award } from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function SingleNewsPage() {
  const params = useParams();
  const slugParam = params?.slug as string;
  const dispatches = useCmsStore((state) => state.dispatches);

  const article = dispatches.find(
    (d) => (d.slug && d.slug === slugParam) || d.id === slugParam
  );

  if (!article) {
    return (
      <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-display-lg text-primary uppercase mb-4">
          Dispatch Not Found
        </h1>
        <p className="font-body text-silver-leaf mb-8">
          The requested press dispatch does not exist or has been archived.
        </p>
        <Link href="/news">
          <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to News Hub
          </Button>
        </Link>
      </div>
    );
  }

  // Related dispatches
  const relatedDispatches = dispatches
    .filter((d) => d.id !== article.id)
    .slice(0, 3);

  return (
    <article className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Top Back Navigation Bar */}
      <div className="max-w-4xl mx-auto mb-8 pt-4">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-body text-label-caps text-silver-leaf hover:text-primary transition-colors border-b border-surface-variant pb-1 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Dispatches</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Metadata & Title */}
        <header className="space-y-6">
          <FadeIn direction="down">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-body text-label-caps bg-primary text-onyx-black px-3 py-1 font-bold tracking-widest uppercase">
                {article.category}
              </span>
              <span className="font-body text-xs text-silver-leaf uppercase tracking-widest flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-primary" /> Dispatch #{article.number}
              </span>
            </div>

            <h1 className="font-display text-[32px] sm:text-headline-lg md:text-display-lg text-primary uppercase leading-tight tracking-tight mt-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-y border-surface-variant py-4 text-silver-leaf font-body text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{article.author}</span>
              </div>
            </div>
          </FadeIn>
        </header>

        {/* Highlight Summary Scrim Box */}
        <FadeIn direction="up">
          <div className="p-6 md:p-8 bg-surface-container-low border-l-4 border-primary border-y border-r border-surface-variant">
            <p className="font-body text-body-lg text-primary font-semibold leading-relaxed italic">
              "{article.summary}"
            </p>
          </div>
        </FadeIn>

        {/* Featured Article Cover Image if available */}
        {article.imageUrl && (
          <FadeIn direction="up">
            <div className="relative w-full aspect-[16/9] border border-surface-variant overflow-hidden shadow-2xl">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </FadeIn>
        )}

        {/* Main Article Body Text */}
        <FadeIn direction="up">
          <div className="prose prose-invert max-w-none space-y-6 text-primary font-body text-body-lg leading-relaxed pt-4 border-b border-surface-variant pb-12">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-primary font-body leading-relaxed">
                {paragraph}
              </p>
            ))}

            <p className="text-silver-leaf font-body text-body-md pt-6 border-t border-surface-variant/40">
              Official Press Release issued by SOBOLDENTS Media Relations Division &amp; Communications Desk. All rights reserved.
            </p>
          </div>
        </FadeIn>

        {/* Bottom Related Dispatches Hub */}
        {relatedDispatches.length > 0 && (
          <section className="pt-12 space-y-8">
            <div className="flex items-center justify-between border-b border-surface-variant pb-4">
              <h3 className="font-display text-headline-sm uppercase text-primary tracking-tight flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-primary" /> More Dispatches &amp; Press Features
              </h3>
              <Link
                href="/news"
                className="font-body text-label-caps text-silver-leaf hover:text-primary transition-colors font-bold uppercase text-xs"
              >
                View Hub
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDispatches.map((dispatch) => (
                <Link
                  key={dispatch.id}
                  href={`/news/${dispatch.slug || dispatch.id}`}
                  className="group bg-surface-container-low p-6 border border-surface-variant hover:border-primary transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="font-body text-xs text-silver-leaf uppercase tracking-widest block">
                      #{dispatch.number} • {dispatch.category}
                    </span>
                    <h4 className="font-display text-headline-sm uppercase text-primary group-hover:text-primary transition-colors line-clamp-2">
                      {dispatch.title}
                    </h4>
                  </div>
                  <span className="font-body text-xs text-primary font-bold uppercase tracking-wider block pt-4">
                    Read Article →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
