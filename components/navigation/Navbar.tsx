'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store/cartStore';
import ThemeToggle from '@/components/theme/ThemeToggle';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Clients', href: '/clients' },
  { name: 'Channel', href: '/channel' },
  { name: 'News', href: '/news' },
  { name: 'Store', href: '/store' },
  { name: 'Partners', href: '/partners' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useCartStore((state) => state?.items) || [];
  const openCart = useCartStore((state) => state.openCart);
  const totalItems = Array.isArray(items)
    ? items.reduce((total, item) => total + (item?.quantity || 0), 0)
    : 0;

  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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
                className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
              />
            </div>
            <span className="font-display text-headline-sm sm:text-headline-md md:text-[32px] text-primary uppercase tracking-tighter hover:opacity-90 transition-opacity">
              SO BOLD ENT
            </span>
          </Link>

          {/* Desktop Navigation & Controls */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="h-4 w-[1px] bg-surface-variant" />

            <ThemeToggle />

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative border border-surface-variant p-2.5 hover:border-primary transition-colors duration-300 flex items-center gap-2 cursor-pointer"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {totalItems > 0 && (
                <span className="font-body text-[10px] text-primary font-bold">
                  ({totalItems})
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Cart Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />

            <button
              onClick={openCart}
              className="relative border border-surface-variant p-2 hover:border-primary transition-colors cursor-pointer"
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-onyx-black font-body text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-surface-variant text-primary focus:outline-none hover:border-primary transition-colors"
              aria-label="Toggle menu"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-30 bg-onyx-black/95 backdrop-blur-[30px] pt-32 px-margin-mobile flex flex-col justify-between pb-12 lg:hidden ${
              isAdminRoute ? 'top-[54px]' : 'top-0'
            }`}
          >
            <nav className="flex flex-col space-y-6 font-display text-headline-md uppercase tracking-wider">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`transition-colors ${
                      isActive ? 'text-primary pl-2 border-l-2 border-primary' : 'text-silver-leaf'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-surface-variant pt-8 flex flex-col space-y-4">
              <span className="font-body text-label-caps text-silver-leaf uppercase tracking-[0.2em]">
                Global Ecosystem &amp; Media
              </span>
              <p className="font-body text-body-sm text-silver-leaf">
                SO BOLD ENT — Architects of Culture &amp; Sound
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
