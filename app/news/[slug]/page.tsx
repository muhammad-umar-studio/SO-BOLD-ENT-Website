'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Newspaper, Calendar, User, Tag, Share2, Award } from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

function parseWordPressContent(html: string): string {
  if (!html) return '';

  let cleaned = html
    // 1. Strip all WordPress Gutenberg comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // 2. Fix broken HTML entity codes
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, '&')
    .trim();

  // 3. Convert YouTube links into responsive iframe embeds
  cleaned = cleaned.replace(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)(?:[\&\?][^\s<"]*)?/gi,
    (match, videoId) => {
      return `<div class="my-8 aspect-video w-full border border-surface-variant overflow-hidden bg-black shadow-2xl rounded-lg">
        <iframe
          src="https://www.youtube.com/embed/${videoId}"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-full border-0"
        ></iframe>
      </div>`;
    }
  );

  // 4. Convert Spotify links into responsive iframe embeds
  cleaned = cleaned.replace(
    /https?:\/\/open\.spotify\.com\/(intl-[a-z]+\/)?(album|track|artist)\/([a-zA-Z0-9]+)(\?[^\s<"]*)?/gi,
    (match, intl, type, spotifyId) => {
      return `<div class="my-8 w-full h-[152px] border border-surface-variant overflow-hidden rounded-xl bg-black">
        <iframe
          src="https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          class="w-full h-full border-0"
        ></iframe>
      </div>`;
    }
  );

  return cleaned;
}

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

  const parsedHtml = parseWordPressContent(article.content);

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

        {/* Featured Article Cover Image with Proper Aspect Ratio & No Cropping */}
        {article.imageUrl && (
          <FadeIn direction="up">
            <div className="w-full flex justify-center bg-surface-container-low border border-surface-variant rounded-lg p-2 md:p-4 overflow-hidden shadow-2xl">
              <div className="relative w-full max-h-[550px] aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  priority
                  className="object-contain object-center"
                />
              </div>
            </div>
          </FadeIn>
        )}

        {/* Main Article Body Rendered HTML with Live Video & Spotify Embeds */}
        <FadeIn direction="up">
          <div
            className="prose prose-invert max-w-none space-y-6 text-primary font-body text-body-lg leading-relaxed pt-4 border-b border-surface-variant pb-12
              [&_p]:text-primary [&_p]:leading-relaxed [&_p]:mb-4
              [&_a]:text-neon-gold [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-primary
              [&_strong]:text-primary [&_strong]:font-bold
              [&_h2]:font-display [&_h2]:text-headline-md [&_h2]:text-primary [&_h2]:uppercase [&_h2]:mt-8 [&_h2]:mb-4
              [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-silver-leaf
              [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:mx-auto [&_img]:my-6 [&_img]:border [&_img]:border-surface-variant"
            dangerouslySetInnerHTML={{ __html: parsedHtml }}
          />

          <p className="text-silver-leaf font-body text-body-md pt-4">
            Official Press Release issued by SOBOLDENTS Media Relations Division &amp; Communications Desk. All rights reserved.
          </p>
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
