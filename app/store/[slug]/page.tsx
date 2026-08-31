'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ArrowLeft,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Maximize2,
  X,
  Plus,
  Minus,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/data/mockProducts';
import { ProductVariant } from '@/types/store';
import { useCartStore } from '@/lib/store/cartStore';
import Button from '@/components/ui/Button';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<'features' | 'shipping' | 'authenticity' | null>(
    'features'
  );

  const addItem = useCartStore((state) => state.addItem);

  const unitPrice = product.price + (selectedVariant?.priceOffset || 0);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
  };

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Back Navigation Link */}
      <div className="mb-8">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 font-body text-label-caps text-silver-leaf hover:text-primary uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery Section (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Hero Image */}
          <div className="relative aspect-square w-full bg-black border border-surface-variant group overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              priority
              className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />

            {/* Image Zoom Trigger */}
            <button
              onClick={() => setIsZoomOpen(true)}
              aria-label="Expand image preview"
              className="absolute top-4 right-4 w-10 h-10 bg-onyx-black/80 border border-surface-variant text-silver-leaf hover:text-primary hover:border-primary flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Thumbnail Gallery Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-24 h-24 shrink-0 border bg-black overflow-hidden transition-all ${
                    selectedImage === imgUrl ? 'border-primary ring-2 ring-primary/40' : 'border-surface-variant opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Category & Stock Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em] bg-surface-container-low px-3 py-1 border border-surface-variant">
                {product.category}
              </span>
              {product.stock > 0 ? (
                <span className="font-body text-[11px] font-bold text-primary uppercase tracking-widest flex items-center gap-1.5 bg-primary/10 px-3 py-1 border border-primary/40">
                  <Check className="w-3.5 h-3.5 text-primary" /> IN STOCK ({product.stock} UNITS)
                </span>
              ) : (
                <span className="font-body text-[11px] font-bold text-red-400 uppercase tracking-widest bg-red-950/80 px-3 py-1 border border-red-500/80">
                  SOLD OUT
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="font-display text-headline-lg md:text-display-md text-primary uppercase leading-tight mb-4">
              {product.title}
            </h1>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 mb-8 border-b border-surface-variant/40 pb-6">
              <span className="font-display text-display-md text-primary">
                ${unitPrice.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="font-body text-body-lg text-silver-leaf/40 line-through">
                  ${(product.compareAtPrice + (selectedVariant?.priceOffset || 0)).toFixed(2)}
                </span>
              )}
              <span className="font-body text-body-md text-silver-leaf/60 uppercase">USD</span>
            </div>

            {/* Description */}
            <p className="font-body text-body-md text-silver-leaf leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Variant Selector (Sizes / Vinyl Formats) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest block mb-3 font-semibold">
                  Select Option / Format:
                </span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`font-body text-label-caps uppercase tracking-wider px-5 py-3 border transition-all duration-300 ${
                          isSelected
                            ? 'bg-primary text-onyx-black border-primary font-bold shadow-md'
                            : 'bg-surface-container-low text-silver-leaf border-surface-variant hover:border-primary hover:text-primary'
                        }`}
                      >
                        {v.name}
                        {v.priceOffset ? ` (+ $${v.priceOffset.toFixed(2)})` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-10">
              <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest block mb-3 font-semibold">
                Quantity:
              </span>
              <div className="flex items-center border border-surface-variant bg-onyx-black w-max">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant transition-colors text-silver-leaf hover:text-primary"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-display text-headline-md text-primary">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-variant transition-colors text-silver-leaf hover:text-primary"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Brutalist Action Button */}
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full justify-center text-center py-5 text-headline-md uppercase tracking-wider mb-10"
              icon={<ShoppingBag className="w-5 h-5" />}
            >
              {product.stock === 0 ? 'SOLD OUT' : 'ADD TO BAG'}
            </Button>
          </div>

          {/* Accordion Specs & Policy Section */}
          <div className="border-t border-surface-variant divide-y divide-surface-variant">
            {/* Features Accordion */}
            {product.features && product.features.length > 0 && (
              <div className="py-4">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === 'features' ? null : 'features')
                  }
                  className="w-full flex items-center justify-between font-display text-headline-md text-primary uppercase text-left py-2"
                >
                  <span>Features &amp; Specifications</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openAccordion === 'features' ? 'rotate-180 text-primary' : 'text-silver-leaf'
                    }`}
                  />
                </button>
                {openAccordion === 'features' && (
                  <ul className="mt-4 space-y-2 font-body text-body-md text-silver-leaf/90 list-disc list-inside">
                    {product.features.map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Shipping Accordion */}
            <div className="py-4">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')
                }
                className="w-full flex items-center justify-between font-display text-headline-md text-primary uppercase text-left py-2"
              >
                <span>Shipping &amp; Delivery</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openAccordion === 'shipping' ? 'rotate-180 text-primary' : 'text-silver-leaf'
                  }`}
                />
              </button>
              {openAccordion === 'shipping' && (
                <div className="mt-4 space-y-3 font-body text-body-md text-silver-leaf/90">
                  <p className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary shrink-0" />
                    <span>Flat $10.00 Express Shipping (FREE on orders over $100.00 USD).</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-primary shrink-0" />
                    <span>Ships within 24-48 business hours from Los Angeles or London hub.</span>
                  </p>
                </div>
              )}
            </div>

            {/* Authenticity Guarantee Accordion */}
            <div className="py-4">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === 'authenticity' ? null : 'authenticity')
                }
                className="w-full flex items-center justify-between font-display text-headline-md text-primary uppercase text-left py-2"
              >
                <span>soboldents Authenticity</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openAccordion === 'authenticity' ? 'rotate-180 text-primary' : 'text-silver-leaf'
                  }`}
                />
              </button>
              {openAccordion === 'authenticity' && (
                <div className="mt-4 font-body text-body-md text-silver-leaf/90 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p>
                    Every item is manufactured directly under soboldents quality oversight in partnership with Virgin Music Group distribution networks. Guaranteed 100% authentic release.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Lightbox Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomOpen(false)}
              className="absolute inset-0 bg-onyx-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-square border border-surface-variant bg-black z-10 overflow-hidden"
            >
              <Image
                src={selectedImage}
                alt={product.title}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-onyx-black border border-surface-variant text-silver-leaf hover:text-primary flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
