import type { Metadata } from 'next';
import { Anton, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import CustomCursor from '@/components/motion/CustomCursor';
import CartDrawer from '@/components/store/CartDrawer';
import PayPalProviderWrapper from '@/components/store/PayPalProviderWrapper';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://soboldents.com'),
  title: 'soboldents | Premier Management & Store',
  description:
    'Constructing legacies across music, film, and fashion. Representing the vanguard of global culture with high-contrast cinematic authority.',
  keywords: [
    'soboldents',
    'Merchandise',
    'Vinyl',
    'Artist Management',
    'Record Label',
    'Music Agency',
    'Talent Architecture',
    'Global Touring',
  ],
  authors: [{ name: 'soboldents' }],
  openGraph: {
    title: 'soboldents | Architects of Culture & Merchandise',
    description:
      'Premier management agency representing visionary musicians, producers, actors, and directors.',
    siteName: 'soboldents',
    type: 'website',
    images: [
      {
        url: '/images/So-Bold-Ent-Clear-Logo.png',
        width: 1200,
        height: 630,
        alt: 'soboldents Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'soboldents',
    description: 'Constructing legacies across music, film, and fashion.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${anton.variable} ${hanken.variable}`}>
      <body className="bg-background text-on-surface font-body antialiased selection:bg-primary selection:text-onyx-black min-h-screen flex flex-col overflow-x-hidden">
        <PayPalProviderWrapper>
          <CustomCursor />
          <Navbar />
          <CartDrawer />
          <main className="flex-grow z-10">{children}</main>
          <Footer />
        </PayPalProviderWrapper>
      </body>
    </html>
  );
}
