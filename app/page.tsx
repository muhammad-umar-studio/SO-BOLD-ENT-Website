import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Marquee from '@/components/motion/Marquee';
import FadeIn from '@/components/motion/FadeIn';
import NewsSlider from '@/components/home/NewsSlider';

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
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background Atmosphere Image */}
        <div className="absolute inset-0 z-0 bg-deep-slate">
          <Image
            src="/images/products/c12_tube_mic.png"
            alt="Studio Atmosphere"
            fill
            priority
            className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 ease-out mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background" />
        </div>

        {/* Large Background Watermark Typography */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <h2 className="font-display text-[22vw] text-stroke-subtle opacity-15 whitespace-nowrap -rotate-2 transform scale-125">
            PREMIER
          </h2>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center mt-12 md:mt-24">
          <FadeIn direction="down" delay={0.1}>
            <p className="font-body text-[10px] md:text-label-caps text-silver-leaf mb-4 md:mb-10 tracking-[0.3em] sm:tracking-[0.4em] uppercase border-b border-surface-variant pb-2 sm:pb-3 w-max max-w-full">
              Global Talent &amp; Architecture
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <h1 className="font-display text-[38px] sm:text-[64px] md:text-display-xl lg:text-hero-massive text-primary uppercase leading-[0.9] tracking-tighter mb-6 md:mb-12 flex flex-col items-center break-words">
              <span className="block hover:scale-105 transition-transform duration-700 ease-out">
                Architects
              </span>
              <span className="block text-stroke-white text-transparent italic hover:scale-105 transition-transform duration-700 ease-out delay-100">
                Of Culture
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="font-body text-body-md md:text-body-lg text-silver-leaf max-w-xl mb-8 md:mb-14 leading-relaxed">
              Constructing legacies across music, film, and fashion. Representing the vanguard of global culture with high-contrast cinematic authority.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/clients" className="w-full sm:w-auto">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
                  Explore Roster
                </Button>
              </Link>
              <Link href="/news" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto justify-center">
                  Latest News &amp; Press
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="w-full border-y border-surface-variant py-4 bg-surface-container-low">
        <Marquee items={marqueeItems} speed={40} />
      </div>

      {/* Featured Roster Teaser */}
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
          </div>

          <div className="md:col-span-4 relative aspect-square md:aspect-auto md:h-[600px] border border-surface-variant overflow-hidden group bg-surface-container-low dark-overlay-card">
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
          </div>
        </div>
      </section>

      {/* Animated News Carousel Slider */}
      <NewsSlider />
    </div>
  );
}
