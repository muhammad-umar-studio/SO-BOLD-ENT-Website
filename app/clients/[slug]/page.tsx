import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Disc } from 'lucide-react';
import { MOCK_ARTISTS } from '@/lib/data/mockData';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export function generateStaticParams() {
  return MOCK_ARTISTS.map((artist) => ({
    slug: artist.slug,
  }));
}

export default function ArtistDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const artist = MOCK_ARTISTS.find((a) => a.slug === params.slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Back Link */}
      <div className="mb-12">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 font-body text-label-caps text-silver-leaf hover:text-primary transition-colors tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Roster
        </Link>
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center mb-24 border-b border-surface-variant pb-16">
        <div className="lg:col-span-7">
          <FadeIn direction="up">
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4">
              {artist.role}
            </span>
            <h1 className="font-display text-display-xl-mobile md:text-display-xl lg:text-hero-massive text-primary uppercase leading-[0.85] tracking-tighter mb-8">
              {artist.name}
            </h1>
            {artist.quote && (
              <blockquote className="font-body text-body-lg italic text-primary border-l-2 border-primary pl-6 py-2 mb-8 max-w-2xl">
                &ldquo;{artist.quote}&rdquo;
              </blockquote>
            )}
            <p className="font-body text-body-lg text-silver-leaf max-w-2xl mb-10 leading-relaxed">
              {artist.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Book Artist
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 relative aspect-[3/4] border border-surface-variant bg-surface-container-low overflow-hidden">
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
          />
        </div>
      </div>

      {/* Stats Counter Row */}
      {artist.stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter py-12 border-b border-surface-variant mb-24">
          {artist.stats.map((stat, i) => (
            <div key={i} className="border-l border-surface-variant/50 pl-6">
              <p className="font-display text-headline-lg text-primary">
                {stat.value}
              </p>
              <p className="font-body text-label-caps text-silver-leaf/60 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Discography Section */}
      {artist.discography && artist.discography.length > 0 && (
        <section className="mb-24">
          <h2 className="font-display text-headline-lg text-primary uppercase mb-12 flex items-center gap-4">
            <Disc className="w-8 h-8 text-primary" /> Key Releases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {artist.discography.map((disc, idx) => (
              <div
                key={idx}
                className="group border border-surface-variant bg-surface-container-low p-6 flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div className="relative aspect-square mb-6 overflow-hidden border border-surface-variant">
                  <Image
                    src={disc.coverUrl}
                    alt={disc.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <span className="font-body text-label-caps text-silver-leaf/60 uppercase tracking-widest block mb-1">
                    {disc.year} — {disc.type}
                  </span>
                  <h3 className="font-display text-headline-md text-primary uppercase">
                    {disc.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tour Dates Section */}
      {artist.tourDates && artist.tourDates.length > 0 && (
        <section className="mb-24">
          <h2 className="font-display text-headline-lg text-primary uppercase mb-12 flex items-center gap-4">
            <Calendar className="w-8 h-8 text-primary" /> Tour Architecture
          </h2>
          <div className="border-t border-surface-variant divide-y divide-surface-variant">
            {artist.tourDates.map((tour, idx) => (
              <div
                key={idx}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-container-low px-4 transition-colors"
              >
                <div className="flex items-center gap-8">
                  <span className="font-display text-headline-md text-primary w-40">
                    {tour.date}
                  </span>
                  <div>
                    <h3 className="font-display text-headline-md text-primary uppercase">
                      {tour.city}
                    </h3>
                    <p className="font-body text-body-md text-silver-leaf">
                      {tour.venue}
                    </p>
                  </div>
                </div>
                <div>
                  <span
                    className={`font-body text-label-caps uppercase px-4 py-2 border ${
                      tour.status === 'Sold Out'
                        ? 'border-surface-variant text-silver-leaf/50'
                        : 'border-primary text-primary'
                    }`}
                  >
                    {tour.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Footer */}
      <div className="bg-surface-container-low border border-surface-variant p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-display text-headline-lg text-primary uppercase">
            Inquire For Booking
          </h3>
          <p className="font-body text-body-md text-silver-leaf max-w-md mt-2">
            Connect directly with {artist.name}&apos;s executive management team for global performance routing and brand partnerships.
          </p>
        </div>
        <Link href="/contact">
          <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
            Secure Session
          </Button>
        </Link>
      </div>
    </div>
  );
}
