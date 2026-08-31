import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MOCK_PARTNERS } from '@/lib/data/mockData';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

export default function PartnersPage() {
  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Header */}
      <header className="mb-24 pt-8 border-b border-surface-variant pb-12">
        <FadeIn direction="down">
          <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4">
            Global Ecosystem
          </span>
          <h1 className="font-display text-display-xl-mobile md:text-display-xl text-primary uppercase leading-none mb-6">
            PARTNERS
          </h1>
          <p className="font-body text-body-lg text-silver-leaf max-w-2xl">
            A curated global network of premier record labels, fashion houses, film studios, and technology platforms driving cultural authority worldwide.
          </p>
        </FadeIn>
      </header>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-24">
        {MOCK_PARTNERS.map((partner) => (
          <div
            key={partner.id}
            className="group border border-surface-variant bg-surface-container-low p-8 flex flex-col justify-between hover:border-primary transition-all duration-300 min-h-[280px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-label-caps text-silver-leaf/60 uppercase tracking-widest">
                  {partner.category}
                </span>
                <span className="font-body text-[10px] text-silver-leaf/40 uppercase tracking-wider border border-surface-variant px-2 py-0.5">
                  {partner.location}
                </span>
              </div>
              <h3 className="font-display text-headline-md text-primary uppercase mb-4 group-hover:text-primary transition-colors">
                {partner.name}
              </h3>
              <p className="font-body text-body-md text-silver-leaf/80">
                {partner.description}
              </p>
            </div>

            <div className="pt-6 border-t border-surface-variant/50 flex items-center justify-between">
              <span className="font-display text-headline-md text-surface-variant group-hover:text-primary transition-colors">
                {partner.logoText}
              </span>
              <ExternalLink className="w-5 h-5 text-silver-leaf/50 group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Partner Alignment CTA */}
      <div className="bg-onyx-black border border-surface-variant p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h3 className="font-display text-headline-lg text-primary uppercase">
            Initiate Brand Partnership
          </h3>
          <p className="font-body text-body-md text-silver-leaf max-w-md mt-2">
            Align your enterprise with our premier roster of cultural architects for fashion campaigns, film scores, and global tour sponsorships.
          </p>
        </div>
        <Link href="/contact">
          <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
            Submit Partnership Brief
          </Button>
        </Link>
      </div>
    </div>
  );
}
