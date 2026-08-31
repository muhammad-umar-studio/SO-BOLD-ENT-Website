'use client';

import React from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number; // duration in seconds
  reverse?: boolean;
  className?: string;
}

export default function Marquee({
  items,
  speed = 25,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const content = items.join('   —   ') + '   —   ';

  return (
    <div
      className={`w-full bg-background border-y border-surface-variant py-6 overflow-hidden relative group cursor-default z-20 ${className}`}
    >
      <div className="flex w-[200%] overflow-hidden whitespace-nowrap">
        <div
          className={`font-display text-headline-md text-surface-variant uppercase tracking-[0.1em] group-hover:text-primary transition-colors duration-700 flex shrink-0 items-center justify-around space-x-8 px-4 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          }`}
          style={{ animationDuration: `${speed}s` }}
        >
          <span>{content}</span>
          <span>{content}</span>
          <span>{content}</span>
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
}
