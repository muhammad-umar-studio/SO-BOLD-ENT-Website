'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Music, Facebook } from 'lucide-react';

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/so_bold_entertainment_/', icon: <Instagram className="w-4 h-4" /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/soboldent/', icon: <Linkedin className="w-4 h-4" /> },
  { name: 'YouTube', href: 'https://www.youtube.com/@soboldent', icon: <Youtube className="w-4 h-4" /> },
  { name: 'SoundCloud', href: 'https://soundcloud.com/so-bold-entertainment', icon: <Music className="w-4 h-4" /> },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100064154040499', icon: <Facebook className="w-4 h-4" /> },
];

export default function Footer() {
  return (
    <footer className="bg-onyx-black w-full py-24 border-t border-surface-variant relative overflow-hidden flex flex-col items-center z-10">
      {/* Background Watermark */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
        <span className="font-display text-[20vw] leading-none text-primary uppercase whitespace-nowrap">
          SO BOLD ENT
        </span>
      </div>

      <div className="w-full px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter relative z-10 items-end">
        {/* Left Column */}
        <div className="md:col-span-6 flex flex-col">
          <Link
            href="/"
            className="font-display text-headline-lg md:text-[70px] text-primary uppercase tracking-tighter mb-6 hover:opacity-80 transition-opacity w-max"
          >
            SO BOLD ENT
          </Link>
          <p className="font-body text-body-md text-silver-leaf max-w-sm mb-8">
            Consulting / Business Management firm guiding musicians, filmmakers, models, and actors toward international success.
          </p>

          {/* Social Links Row */}
          <div className="flex items-center gap-4 mb-10">
            {SOCIAL_LINKS.map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.name}
                className="w-9 h-9 border border-surface-variant bg-surface-container-low flex items-center justify-center text-silver-leaf hover:text-primary hover:border-primary transition-all duration-300"
              >
                {soc.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-8 font-body text-label-caps tracking-widest uppercase">
            <Link
              href="/privacy"
              className="text-silver-leaf hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:-bottom-1 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-silver-leaf hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-primary after:-bottom-1 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-6 flex flex-col items-start md:items-end mt-12 md:mt-0">
          <div className="mb-8 text-left md:text-right">
            <span className="font-body text-label-caps text-silver-leaf/60 uppercase tracking-[0.2em] block mb-2">
              Global Headquarters &amp; Nodes
            </span>
            <p className="font-body text-body-md text-primary">
              LOS ANGELES — NEW YORK — LONDON
            </p>
          </div>

          <p className="font-body text-[11px] text-silver-leaf/50 tracking-[0.2em] uppercase text-left md:text-right">
            © {new Date().getFullYear()} SO BOLD ENT LLC.<br />
            ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
