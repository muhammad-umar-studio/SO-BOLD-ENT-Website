'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Clients', href: '/clients' },
  { name: 'Channel', href: '/channel' },
  { name: 'Store', href: '/store' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isAdminRoute = pathname.startsWith('/admin');

  // Cart Store Hook
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = mounted ? getTotalItems() : 0;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed left-0 w-full z-40 transition-all duration-500 ${
          isAdminRoute ? 'top-[54px]' : 'top-0'
        } ${
          scrolled
            ? 'bg-onyx-black/90 backdrop-blur-[20px] py-3.5 border-b border-surface-variant'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="w-full px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 md:gap-4 group focus:outline-none"
          >
            <div className="relative w-10 h-10 md:w-14 md:h-14 shrink-0">
              <Image
                src="/images/So-Bold-Ent-Clear-Logo-600x400.png"
                alt="SOBOLDENTS Logo"
                fill
                priority
                className="object-contain mix-blend-lighten group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>
            <span className="font-display text-headline-sm sm:text-headline-md md:text-[32px] text-primary uppercase tracking-tighter hover:opacity-90 transition-opacity">
              SO BOLD ENT
            </span>
          </Link>

          {/* Desktop Navigation & Cart Trigger */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6 xl:space-x-8 font-body text-label-caps uppercase tracking-[0.15em]">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-300 ${
                      isActive
                        ? 'text-primary'
                        : 'text-silver-leaf hover:text-primary'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Cart Trigger Badge */}
            <button
              onClick={openCart}
              aria-label="Open Shopping Bag Drawer"
              className="relative p-2.5 border border-surface-variant hover:border-primary text-silver-leaf hover:text-primary transition-all group flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-body text-label-caps text-primary font-bold">
                ({totalItems})
              </span>
            </button>
          </div>

          {/* Mobile & Tablet Controls */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={openCart}
              aria-label="Open Shopping Bag"
              className="relative p-2 text-primary border border-surface-variant flex items-center gap-1.5"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span className="font-body text-label-caps text-primary font-bold">
                ({totalItems})
              </span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary p-2 focus:outline-none border border-surface-variant hover:border-primary transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
            className={`fixed inset-0 z-40 bg-onyx-black flex flex-col justify-between px-margin-mobile pb-12 overflow-y-auto ${
              isAdminRoute ? 'pt-28' : 'pt-24'
            }`}
          >
            <div className="flex flex-col space-y-5">
              <span className="font-body text-label-caps text-silver-leaf/60 uppercase tracking-[0.3em] border-b border-surface-variant pb-2">
                Navigation Menu
              </span>
              {NAV_LINKS.map((link, idx) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`font-display text-[28px] sm:text-[36px] uppercase tracking-tight block ${
                        isActive
                          ? 'text-primary'
                          : 'text-surface-variant hover:text-primary'
                      } transition-colors`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-surface-variant pt-6 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest text-[11px]">
                SO BOLD ENT HQ — LOS ANGELES
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
