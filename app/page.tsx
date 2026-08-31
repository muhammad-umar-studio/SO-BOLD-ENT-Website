import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Marquee from '@/components/motion/Marquee';
import NewsSlider from '@/components/home/NewsSlider';
import HeroSlider from '@/components/home/HeroSlider';

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

      {/* Featured Roster Teaser Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-onyx-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-surface-variant gap-4">
          <div>
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-2">
              Featured Representation
            </span>
            <h2 className="font-display text-[32px] sm:text-headline-lg text-primary uppercase">
              THE ROSTER
            </h2>
          </div>
          <Link
            href="/clients"
            className="font-body text-label-caps text-primary uppercase tracking-[0.2em] hover:gap-3 transition-all flex items-center gap-2 border-b border-primary pb-1 font-bold w-max"
          >
            <span>View All Talent</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Grid Teaser */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          <div className="md:col-span-8 relative aspect-[4/3] md:aspect-auto md:h-[600px] border border-surface-variant overflow-hidden group bg-surface-container-low dark-overlay-card">
            <Link href="/clients/aingee" className="block w-full h-full relative">
              <Image
                src="/images/products/studio_monitors.png"
                alt="Featured Artist"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest block mb-2">
                  Electronic / Experimental
                </span>
                <h3 className="font-display text-[28px] sm:text-display-md text-primary uppercase leading-tight mb-4">
                  AINGEE
                </h3>
                <p className="font-body text-body-md text-silver-leaf/80 max-w-md hidden sm:block">
                  Sound designer and electronic artist crafting dark, architectural ambient soundscapes.
                </p>
              </div>
            </Link>
          </div>

          <div className="md:col-span-4 relative aspect-square md:aspect-auto md:h-[600px] border border-surface-variant overflow-hidden group bg-surface-container-low dark-overlay-card">
            <Link href="/clients/tre-sax" className="block w-full h-full relative">
              <Image
                src="/images/products/analog_synth.png"
                alt="Featured Producer"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest block mb-2">
                  Contemporary Classical
                </span>
                <h3 className="font-display text-[28px] sm:text-display-md text-primary uppercase leading-tight mb-4">
                  TRE' SAX
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Animated News Carousel Slider */}
      <NewsSlider />
    </div>
  );
}
