import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function AboutPage() {
  const leadership = [
    {
      name: 'DOUGLAS "II NICE" LOFTON JR.',
      role: 'Founder & CEO — Talent Architecture & Business Consulting',
      bio: 'Former rap artist and business entrepreneur who turned a passion for entertainment culture into SOBOLDENTS. Featured in Billboard Music for securing global distribution deals with Tuff Gong, Virgin Music Group, Universal Music Group, and YOU42.',
      image:
        'https://billboardworldmusic.com/wp-content/uploads/2025/08/Screenshot-2025-08-20-at-01.08.57.png',
    },
    {
      name: 'HELENA ROTH',
      role: 'Head of Consulting & Business Management',
      bio: 'Senior executive directing artist catalog development, streaming distribution strategies, and high-profile film scoring alignments.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBtbjX8TYME_WglX8HxiuRtFZdNrMQVBFWsxQNrvMWJE2JP_PFiEtNtgMRAYO7gZcOaDboCmN02H6x8a-hnlwTHMvGcycW9un9uJK6UQ5V7PmDpsW5oJyoH1fGRL_wpWkap3zn9tgkTHRdpgvIGgVvLkfKexSQJSCLGVoQ_3Hi6lS31cvLVxgcTCbUVdbPJlqxZNtpKpgogYz2lvK7Se-4ujjet8JnF5Zt92j2Gp7O_jOyROiCYan98',
    },
  ];

  return (
    <div className="w-full pt-28 sm:pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="mb-16 sm:mb-24 pt-6 sm:pt-8 border-b border-surface-variant pb-8 sm:pb-12">
        <FadeIn direction="down">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-3 sm:mb-4">
            Consulting &amp; Business Management Architecture
          </span>
          <h1 className="font-display text-[32px] sm:text-[48px] md:text-display-xl lg:text-[96px] text-primary uppercase leading-[0.95] tracking-tighter mb-6 sm:mb-8 break-words">
            ABOUT SOBOLDENTS
          </h1>
          <p className="font-body text-body-md sm:text-body-lg text-silver-leaf max-w-3xl leading-relaxed">
            SOBOLDENTS CEO Douglas Lofton Jr. entered the music industry as a rap artist and business entrepreneur with a deep passion for entertainment culture. Today, as our company shifts into full-spectrum Consulting &amp; Business Management, our focus is helping music artists, filmmakers, models, and actors build international fame and lasting success in the entertainment industry.
          </p>
        </FadeIn>
      </header>

      {/* Press Highlight Banner */}
      <section className="border border-primary/40 bg-surface-container-low p-6 sm:p-8 md:p-12 mb-16 sm:mb-24 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="font-body text-label-caps text-primary uppercase tracking-[0.2em] flex items-center gap-2 mb-2 font-bold">
              <Award className="w-4 h-4" /> Billboard Music Feature Spotlight
            </span>
            <h2 className="font-display text-headline-md sm:text-headline-lg text-primary uppercase leading-tight">
              "Douglas Lofton Jr. Launch Bold New Era"
            </h2>
            <p className="font-body text-body-md text-silver-leaf max-w-2xl mt-2">
              Billboard Music highlighted SOBOLDENTS landmark distribution and partnership deal with Tuff Gong, Virgin Music Group, Universal Music Group, and YOU42.
            </p>
          </div>
          <a
            href="https://billboardworldmusic.com/douglas-ii-nice-lofton-jr-ceo-of-so-bold-entertainment-launch-bold-new-era/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto"
          >
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
              Read Billboard Article
            </Button>
          </a>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 sm:py-16 border-y border-surface-variant mb-16 sm:mb-24">
        <div>
          <p className="font-display text-[42px] sm:text-[64px] md:text-hero-massive text-primary leading-none">
            100K+
          </p>
          <p className="font-body text-label-caps text-silver-leaf uppercase tracking-widest mt-2 text-[10px] sm:text-[12px]">
            Streaming Milestones
          </p>
        </div>
        <div>
          <p className="font-display text-[42px] sm:text-[64px] md:text-hero-massive text-primary leading-none">
            4
          </p>
          <p className="font-body text-label-caps text-silver-leaf uppercase tracking-widest mt-2 text-[10px] sm:text-[12px]">
            Talent Pillars (Music, Film, Fashion, Acting)
          </p>
        </div>
        <div>
          <p className="font-display text-[42px] sm:text-[64px] md:text-hero-massive text-primary leading-none">
            2026
          </p>
          <p className="font-body text-label-caps text-silver-leaf uppercase tracking-widest mt-2 text-[10px] sm:text-[12px]">
            Global EP &amp; Album Releases
          </p>
        </div>
        <div>
          <p className="font-display text-[42px] sm:text-[64px] md:text-hero-massive text-primary leading-none">
            100%
          </p>
          <p className="font-body text-label-caps text-silver-leaf uppercase tracking-widest mt-2 text-[10px] sm:text-[12px]">
            Independent Ownership
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="mb-16 sm:mb-24">
        <h2 className="font-display text-headline-lg text-primary uppercase mb-12 border-b border-surface-variant pb-4">
          LEADERSHIP &amp; ARCHITECTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {leadership.map((person, idx) => (
            <FadeIn key={person.name} delay={idx * 0.1}>
              <div className="border border-surface-variant bg-surface-container-low p-6 sm:p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="relative aspect-square w-full mb-6 bg-black overflow-hidden border border-surface-variant">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <span className="font-body text-[10px] sm:text-label-caps text-silver-leaf uppercase tracking-widest block mb-1">
                    {person.role}
                  </span>
                  <h3 className="font-display text-headline-md text-primary uppercase mb-4 leading-tight">
                    {person.name}
                  </h3>
                  <p className="font-body text-body-md text-silver-leaf/80 leading-relaxed">
                    {person.bio}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <div className="pt-10 border-t border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <p className="font-body text-label-caps text-silver-leaf/70 uppercase tracking-widest text-[10px] sm:text-[12px]">
          SOBOLDENTS Media &amp; Business Management Group
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-body text-label-caps text-primary uppercase tracking-[0.2em] hover:gap-5 transition-all border-b border-primary pb-1 font-bold"
        >
          <span>Initiate Strategic Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
