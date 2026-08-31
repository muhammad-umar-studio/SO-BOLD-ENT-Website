'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { ProductCategory } from '@/types/store';
import { useCartStore } from '@/lib/store/cartStore';
import { useCmsStore } from '@/lib/store/cmsStore';
import FadeIn from '@/components/motion/FadeIn';

const CATEGORIES: ProductCategory[] = [
  'All',
  'Microphones',
  'Studio Monitors',
  'Audio Interfaces',
  'Synthesizers & Controllers',
  'Studio Accessories',
];

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'title'>('featured');
  const addItem = useCartStore((state) => state.addItem);
  const products = useCmsStore((state) => state.products);

  // Filter products by category
  let filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Hero Header */}
      <header className="mb-16 pt-8 border-b border-surface-variant pb-12">
        <FadeIn direction="down">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
            <div className="max-w-4xl">
              <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.3em] block mb-4 border-b border-surface-variant/60 pb-2 w-max">
                Pro Audio Hardware &amp; Recording Equipment
              </span>
              <h1 className="font-display text-display-lg md:text-display-xl lg:text-[88px] text-primary uppercase leading-[0.95] tracking-tighter">
                STUDIO HARDWARE <span className="text-stroke-white text-transparent italic">&amp; MICS</span>
              </h1>
            </div>
            <p className="font-body text-body-lg text-silver-leaf max-w-md lg:border-l lg:border-primary/40 lg:pl-6 py-1">
              High-performance tube microphones, active reference monitors, 32-bit audio interfaces, analog polyphonic synthesizers, and studio accessories engineered for artists, engineers, and producers.
            </p>
          </div>
        </FadeIn>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-surface-variant/40">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-body text-label-caps uppercase tracking-[0.15em] px-5 py-2.5 border transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-onyx-black border-primary font-bold shadow-lg'
                      : 'bg-surface-container-low text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-silver-leaf" />
            <span className="font-body text-label-caps text-silver-leaf uppercase tracking-wider">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-surface-container-low border border-surface-variant text-silver-leaf font-body text-label-caps uppercase px-4 py-2 focus:border-primary focus:outline-none"
            >
              <option value="featured">Featured Hardware</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Title: A-Z</option>
            </select>
          </div>
        </div>
      </header>

      {/* Asymmetric Product Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => {
            const isFirstFeatured = index === 0 && activeCategory === 'All';

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`group relative border border-surface-variant bg-surface-container-low overflow-hidden flex flex-col justify-between ${
                  isFirstFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Image Header Container */}
                  <Link
                    href={`/store/${product.slug}`}
                    className={`block relative w-full overflow-hidden bg-black ${
                      isFirstFeatured ? 'aspect-[16/10]' : 'aspect-square'
                    }`}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
                      <span className="font-body text-[10px] font-bold text-silver-leaf uppercase tracking-[0.2em] bg-onyx-black/80 px-3 py-1 border border-surface-variant/80 backdrop-blur-sm">
                        {product.category}
                      </span>
                      {product.stock === 0 ? (
                        <span className="font-body text-[10px] font-bold text-red-400 uppercase tracking-[0.2em] bg-red-950/80 px-3 py-1 border border-red-500/80 backdrop-blur-sm">
                          SOLD OUT
                        </span>
                      ) : product.compareAtPrice ? (
                        <span className="font-body text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/20 px-3 py-1 border border-primary/50 backdrop-blur-sm">
                          SALE
                        </span>
                      ) : product.isFeatured ? (
                        <span className="font-body text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-onyx-black/80 px-3 py-1 border border-primary/50 backdrop-blur-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-primary" /> FLAGSHIP HARDWARE
                        </span>
                      ) : null}
                    </div>
                  </Link>

                  {/* Product Details Content */}
                  <div className="p-6">
                    <span className="font-body text-[11px] text-silver-leaf/60 uppercase tracking-widest block mb-1">
                      SKU: {product.sku}
                    </span>
                    <Link href={`/store/${product.slug}`}>
                      <h3 className="font-display text-headline-md text-primary uppercase leading-snug mb-3 group-hover:translate-x-1 transition-transform">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-body text-body-md text-silver-leaf/80 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Price & Action Bar */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-surface-variant/40 mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-headline-md text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="font-body text-body-md text-silver-leaf/40 line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="font-body text-[10px] text-silver-leaf/60">USD</span>
                  </div>

                  <button
                    onClick={() => addItem(product, product.variants?.[0])}
                    disabled={product.stock === 0}
                    className={`font-body text-label-caps uppercase tracking-widest px-4 py-2.5 border transition-all flex items-center gap-2 ${
                      product.stock === 0
                        ? 'opacity-40 border-surface-variant cursor-not-allowed text-silver-leaf'
                        : 'bg-primary text-onyx-black border-primary font-bold hover:bg-white hover:text-black hover:border-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{product.stock === 0 ? 'SOLD OUT' : 'ADD TO BAG'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Catalog Metric Bar */}
      <div className="mt-20 pt-10 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-label-caps text-silver-leaf/70 uppercase tracking-widest">
          Showing {filteredProducts.length} of {products.length} Studio Hardware Products
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 font-body text-label-caps text-primary uppercase tracking-[0.2em] hover:gap-5 transition-all border-b border-primary pb-1 font-bold"
        >
          <span>Custom Studio Integration &amp; Engineering Consultation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
