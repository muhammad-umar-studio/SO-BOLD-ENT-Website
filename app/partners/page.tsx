'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PARTNERS } from '@/lib/data/mockData';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function PartnersPage() {
  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Header */}
      <header className="mb-20 pt-8 border-b border-surface-variant pb-12">
        <FadeIn direction="down">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4">
            Global Ecosystem &amp; Enterprise Alignments
          </span>
          <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-none mb-6">
            PARTNERS
          </h1>
          <p className="font-body text-body-lg text-silver-leaf max-w-2xl">
            A curated global network of premier record labels, distribution networks, media outlets, and technology platforms powering SOBOLDENTS worldwide.
          </p>
        </FadeIn>
      </header>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {MOCK_PARTNERS.map((partner, idx) => (
          <FadeIn key={partner.id} delay={idx * 0.08}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="group border border-surface-variant bg-surface-container-low p-8 flex flex-col justify-between hover:border-primary transition-all duration-300 min-h-[300px] shadow-sm hover:shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-6 border-b border-surface-variant/40 pb-4">
                  <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest font-semibold">
                    {partner.category}
                  </span>
                  <span className="font-body text-[10px] text-primary uppercase tracking-wider border border-surface-variant px-2.5 py-1 bg-surface-container font-bold flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-silver-leaf" />
                    {partner.location}
                  </span>
                </div>

                <h3 className="font-display text-headline-md text-primary uppercase mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {partner.name}
                </h3>
                <p className="font-body text-body-md text-silver-leaf leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="pt-6 border-t border-surface-variant/40 flex items-center justify-between mt-6">
                <span className="font-display text-headline-sm text-primary font-bold tracking-wider">
                  {partner.logoText}
                </span>
                <div className="w-9 h-9 border border-surface-variant flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-onyx-black transition-all">
                  <ExternalLink className="w-4 h-4 text-silver-leaf group-hover:text-onyx-black transition-colors" />
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      {/* Partner Alignment CTA */}
      <section className="bg-surface-container-low border border-surface-variant p-8 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="max-w-2xl">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] block mb-2 font-bold">
            Corporate &amp; Enterprise Relations
          </span>
          <h2 className="font-display text-headline-lg text-primary uppercase leading-tight">
            Initiate Brand Partnership
          </h2>
          <p className="font-body text-body-md text-silver-leaf mt-3 leading-relaxed">
            Align your enterprise with our premier roster of cultural architects for fashion campaigns, film scores, streaming distribution, and global tour sponsorships.
          </p>
        </div>
        <Link href="/contact" className="shrink-0 w-full sm:w-auto">
          <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto justify-center">
            Submit Partnership Brief
          </Button>
        </Link>
      </section>
    </div>
  );
}
