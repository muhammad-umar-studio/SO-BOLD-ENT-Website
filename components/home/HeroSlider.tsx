'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface SlideProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
  linkHref: string;
  buttonLabel: string;
  quote?: string;
}

const HERO_PROJECT_SLIDES: SlideProject[] = [
  {
    id: 'aingee',
    title: 'AINGEE',
    subtitle: 'EP "CONSTELLATIONS" & LP "LOVE UNSWEETENED" — FEATURED ON THE ORCHARD',
    category: 'ELECTRONIC & EXPERIMENTAL ARTIST',
    imageUrl: 'https://soboldents.com/wp-content/uploads/2026/08/Constellations-Album-Cover-5-1024x1024.png',
    linkHref: '/clients/aingee',
    buttonLabel: 'Explore AINGEE Roster & Discography',
    quote: 'Music is an emotional constellation where vulnerability meets sonic power.',
  },
  {
    id: 'tre-sax',
    title: "TRE' SAX",
    subtitle: 'VIRTUOSO SAXOPHONIST & COMPOSER — GRAMMY WEEKLY FEATURED ARTIST',
    category: 'CONTEMPORARY CLASSICAL & SOUL JAZZ',
    imageUrl: 'https://soboldents.com/wp-content/uploads/2025/01/Tre-Sax-saxin4-1.jpg',
    linkHref: '/clients/tre-sax',
    buttonLabel: "Explore TRE' SAX Concerts & Press",
    quote: 'The saxophone is the closest instrument to the human soul.',
  },
  {
    id: 'carolina-de-athey',
    title: 'CAROLINA DE ATHEY',
    subtitle: 'POP & WORLD FUSION POWERHOUSE — 100K+ YOUTUBE VIEWS ON "BESAME"',
    category: 'ALTERNATIVE ROCK & LATIN FUSION',
    imageUrl: 'https://soboldents.com/wp-content/uploads/2023/10/Carolina-de-Athey-home-page-slide-1024x1024.jpg',
    linkHref: '/clients/carolina-de-athey',
    buttonLabel: 'Explore Carolina de Athey Releases',
    quote: 'Passion in music transcends all language barriers.',
  },
  {
    id: 'badonna',
    title: 'BADONNA',
    subtitle: 'BREAKOUT HIP HOP ANTHEM "HONEY COMB" (2026 RELEASE)',
    category: 'HIP HOP & R&B PERFORMING ARTIST',
    imageUrl: 'https://soboldents.com/wp-content/uploads/2026/01/Honey-Comb.jpg',
    linkHref: '/clients/badonna',
    buttonLabel: 'Explore Badonna Project Details',
    quote: 'Authenticity is the currency of longevity.',
  },
  {
    id: 'douglas-lofton-jr',
    title: 'DOUGLAS LOFTON JR.',
    subtitle: 'CEO & FOUNDER — TALENT ARCHITECTURE & BUSINESS MANAGEMENT',
    category: 'SO BOLD ENT EXECUTIVE LEADERSHIP',
    imageUrl: 'https://billboardworldmusic.com/wp-content/uploads/2025/08/Screenshot-2025-08-20-at-01.08.57.png',
    linkHref: '/clients/douglas-lofton-jr',
    buttonLabel: 'View Executive Spotlight & Press',
    quote: 'Architecting cultural dominance through vision, leverage, and execution.',
  },
  {
    id: 'c12-mic',
    title: 'VANGUARD C12 TUBE MIC',
    subtitle: 'HAND-ASSEMBLED CK12 CAPSULE & VINTAGE 6072A VACUUM TUBE',
    category: 'STUDIO HARDWARE REFORMATION',
    imageUrl: '/images/products/c12_tube_mic.png',
    linkHref: '/store/soboldents-vanguard-c12-tube-mic',
    buttonLabel: 'Order Hardware in Studio Store',
    quote: 'Mastered for lead vocal tracking and orchestral acoustic sessions.',
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % HERO_PROJECT_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isMounted]);

  if (!isMounted) return null;

  const currentSlide = HERO_PROJECT_SLIDES[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_PROJECT_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_PROJECT_SLIDES.length) % HERO_PROJECT_SLIDES.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0.2,
      scale: 1.05,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0.2,
      scale: 0.95,
    }),
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-[92vh] min-h-[650px] bg-black text-white overflow-hidden dark-overlay-card border-b border-surface-variant">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.65, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image / Cover */}
          <div className="relative w-full h-full group cursor-pointer">
            <Link href={currentSlide.linkHref} className="block w-full h-full relative">
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Dark Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />

              {/* Foreground Typography Content */}
              <div className="absolute inset-0 p-8 sm:p-14 md:p-20 flex flex-col justify-between z-10 max-w-[1440px] mx-auto left-0 right-0">
                {/* Top Category Badge */}
                <div className="flex justify-between items-start pt-16 sm:pt-20">
                  <div className="flex items-center gap-3">
                    <span className="font-body text-label-caps text-white/90 uppercase tracking-[0.25em] bg-black/80 px-4 py-2 border border-white/20 backdrop-blur-md font-bold shadow-lg">
                      {currentSlide.category}
                    </span>
                    <span className="font-body text-xs text-white/70 uppercase tracking-widest hidden sm:inline-block font-semibold">
                      Featured Release #{String(currentIndex + 1).padStart(2, '0')} / {String(HERO_PROJECT_SLIDES.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Bottom Main Title & Call to Action */}
                <div className="max-w-4xl space-y-4 pb-12 sm:pb-16">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="font-display text-[42px] sm:text-[72px] md:text-[96px] text-white uppercase leading-[0.88] tracking-tighter group-hover:translate-x-2 transition-transform duration-500"
                  >
                    {currentSlide.title}
                  </motion.h2>

                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="font-body text-body-md sm:text-body-lg text-white/90 uppercase tracking-wider font-semibold max-w-2xl"
                  >
                    {currentSlide.subtitle}
                  </motion.p>

                  {currentSlide.quote && (
                    <motion.p
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="font-body text-body-md text-white/70 italic hidden md:block max-w-xl"
                    >
                      "{currentSlide.quote}"
                    </motion.p>
                  )}

                  <div className="pt-4 flex items-center gap-4">
                    <Button
                      variant="primary"
                      icon={<ArrowRight className="w-4 h-4" />}
                      className="bg-white text-black hover:bg-white/90 border-white font-bold"
                    >
                      {currentSlide.buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Sony Music-Style Left / Right Chevron Controls */}
      <button
        onClick={handlePrev}
        aria-label="Previous Project"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all cursor-pointer shadow-2xl"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Project"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-16 sm:h-16 border border-white/30 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all cursor-pointer shadow-2xl"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Sony Music-Style Bottom Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/70 backdrop-blur-md px-5 py-2.5 border border-white/20 rounded-full shadow-2xl">
        {HERO_PROJECT_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-9 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to project slide ${idx + 1}: ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}
