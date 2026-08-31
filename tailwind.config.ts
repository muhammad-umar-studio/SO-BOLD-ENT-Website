import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'onyx-black': '#000000',
        'deep-slate': '#121212',
        'silver-leaf': '#D1D1D1',
        'background': '#0a0a0a',
        'surface': '#131313',
        'surface-container-low': '#1c1b1b',
        'surface-container': '#201f1f',
        'surface-container-high': '#2a2a2a',
        'surface-container-highest': '#353534',
        'surface-variant': '#353534',
        'on-surface': '#e5e2e1',
        'on-surface-variant': '#c4c7c8',
        'outline': '#8e9192',
        'outline-variant': '#444748',
        'primary': '#ffffff',
        'on-primary': '#2f3131',
        'secondary': '#c7c6c6',
        'tertiary': '#ffffff',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Anton', 'sans-serif'],
        body: ['var(--font-hanken)', 'Hanken Grotesk', 'sans-serif'],
      },
      fontSize: {
        'hero-massive': ['140px', { lineHeight: '120px', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-xl': ['100px', { lineHeight: '95px', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-xl-mobile': ['36px', { lineHeight: '38px', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-lg': ['52px', { lineHeight: '58px', letterSpacing: '0.01em', fontWeight: '400' }],
        'headline-lg-mobile': ['30px', { lineHeight: '34px', letterSpacing: '0.01em', fontWeight: '400' }],
        'headline-md': ['26px', { lineHeight: '32px', letterSpacing: '0.02em', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['15px', { lineHeight: '22px', fontWeight: '400' }],
        'label-caps': ['11px', { lineHeight: '15px', letterSpacing: '0.15em', fontWeight: '700' }],
      },
      spacing: {
        gutter: '20px',
        'section-gap': '100px',
        unit: '8px',
        'margin-desktop': '64px',
        'margin-mobile': '16px',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'scroll-hint': 'scrollHint 2s cubic-bezier(0.77, 0, 0.175, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(10px)', opacity: '0' },
          '51%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
