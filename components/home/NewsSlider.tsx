'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Newspaper } from 'lucide-react';
import { useCmsStore } from '@/lib/store/cmsStore';
import Button from '@/components/ui/Button';

export default function NewsSlider() {
  const dispatches = useCmsStore((state) => state.dispatches);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (!isMounted || dispatches.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % dispatches.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isMounted, dispatches.length]);

  if (!isMounted || dispatches.length === 0) return null;

  const currentItem = dispatches[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % dispatches.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + dispatches.length) % dispatches.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop border-t border-surface-variant">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-surface-variant gap-4">
        <div>
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] sm:tracking-[0.3em] block mb-2 flex items-center gap-2 font-bold">
            <Newspaper className="w-4 h-4 text-primary" />
            Media &amp; Press Radar
          </span>
          <h2 className="font-display text-[32px] sm:text-headline-lg text-primary uppercase">
            LATEST DISPATCHES
          </h2>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous Dispatch"
            className="p-3 border border-surface-variant hover:border-primary text-primary transition-colors bg-surface-container-low"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Dispatch"
            className="p-3 border border-surface-variant hover:border-primary text-primary transition-colors bg-surface-container-low"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className="relative min-h-[420px] md:min-h-[380px] bg-surface-container-low border border-surface-variant p-8 md:p-12 overflow-hidden flex flex-col justify-between shadow-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full"
          >
            {/* Left Content Column */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-primary text-sm font-bold bg-surface-container px-3.5 py-1 border border-surface-variant">
                  #{currentItem.number || String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-xs text-primary font-semibold uppercase tracking-wider bg-primary/20 px-3 py-1 border border-primary/40">
                  {currentItem.category}
                </span>
                <span className="font-body text-xs text-silver-leaf uppercase">
                  {currentItem.date}
                </span>
              </div>

              <h3 className="font-display text-[26px] sm:text-[38px] text-primary uppercase leading-tight tracking-tight">
                {currentItem.title}
              </h3>

              <p className="font-body text-body-md text-silver-leaf leading-relaxed max-w-3xl line-clamp-3">
                {currentItem.summary}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href={`/news/${currentItem.slug || currentItem.id}`}>
                  <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                    Read Full News Dispatch
                  </Button>
                </Link>
                <span className="font-body text-xs text-silver-leaf uppercase font-semibold">
                  Source: {currentItem.author || 'SOBOLDENTS EDITORIAL'}
                </span>
              </div>
            </div>

            {/* Right Cover Image or Badge */}
            <div className="md:col-span-4 flex items-center justify-center border border-surface-variant/40 overflow-hidden bg-black/40 h-[220px] md:h-[260px] relative rounded-lg">
              {currentItem.imageUrl ? (
                <Image
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container border border-primary/40 flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <span className="font-display text-headline-sm text-primary uppercase tracking-widest mb-1">
                    SOBOLDENTS
                  </span>
                  <span className="font-body text-xs text-silver-leaf uppercase tracking-widest font-semibold">
                    VERIFIED MEDIA DESK
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar & Slide Dots */}
        <div className="mt-8 pt-6 border-t border-surface-variant/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {dispatches.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-surface-variant'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="font-body text-xs text-silver-leaf uppercase tracking-widest font-semibold">
            Dispatch {currentIndex + 1} of {dispatches.length}
          </span>
        </div>
      </div>
    </section>
  );
}
