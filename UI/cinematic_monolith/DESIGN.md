---
name: Cinematic Monolith
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c7c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  deep-slate: '#121212'
  silver-leaf: '#D1D1D1'
  onyx-black: '#000000'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 60px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.15em
spacing:
  unit: 8px
  margin-desktop: 80px
  margin-mobile: 24px
  gutter: 24px
  section-gap: 160px
---

## Brand & Style

The design system is built for a premier music management agency, evoking a sense of prestige, artistic authority, and cinematic intensity. It targets high-profile artists and industry executives who value a "behind-the-scenes" luxury aesthetic. 

The style is **Brutalist-Elegant**: a fusion of raw structural power and high-fashion refinement. It leverages massive, unapologetic typography and a stark, high-contrast palette. The interface functions like a digital gallery—minimalist in its chrome to allow the artist's photography and content to dominate. The motion language should feel heavy and intentional, like the movement of a large-format film camera.

## Colors

The palette is strictly monochromatic to maintain a "Noir" cinematic feel. 
- **Primary Background:** Use `onyx-black` (#000000) for landing sections and deep immersion.
- **Surface Layers:** Use `deep-slate` (#121212) for cards, section dividers, and containers to provide subtle depth without breaking the dark-room atmosphere.
- **Typography:** Pure white (#FFFFFF) is reserved for primary headlines to ensure maximum impact. Use `silver-leaf` (#D1D1D1) for body text and `secondary_color` (#A0A0A0) for metadata or less important labels to create a clear visual hierarchy.
- **Accents:** There are no chromatic accents; focus is directed through scale and light (white-on-black).

## Typography

The typography strategy relies on the tension between the condensed, impactful weight of **Anton** and the surgical precision of **Hanken Grotesk**.

- **Headlines:** Use Anton for all headlines. It should be used at scale, often breaking traditional margin constraints to create a "poster" feel. For Display XL, use negative letter spacing to create a tight, monolithic block of text.
- **Body & UI:** Hanken Grotesk provides a modern, high-tech contrast. Use the `label-caps` style for all navigation items, tags, and small sub-headers to inject a sense of "metadata" or industrial labeling.
- **Alignment:** Stick to hard left-alignment for long-form content, or centered alignment for hero-impact moments.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model with aggressive whitespace to mimic luxury editorial layouts.
- **Desktop:** A 12-column grid with 80px side margins. Large "Section Gaps" (160px+) are used to separate distinct content narratives, preventing the UI from feeling cluttered.
- **Mobile:** A 4-column grid with 24px margins. Headlines should scale aggressively to maintain the brand's bold character.
- **Alignment:** Use a "Swiss" inspired approach where elements are anchored to the grid lines but balanced with large areas of "void" (unoccupied black space).

## Elevation & Depth

To maintain the premium Brutalist aesthetic, avoid traditional drop shadows. Depth is achieved through **Tonal Layers** and **Border Strokes**:
- **Layering:** Elements are stacked using color values. Level 0 is #000000, Level 1 (cards/modals) is #121212.
- **Outlines:** Use thin (1px), low-contrast borders (#2A2A2A) to define shapes instead of shadows. This keeps the design looking sharp and architectural.
- **Glassmorphism:** Use sparingly for navigation overlays. A very subtle backdrop blur (20px) with a 10% white tint can be used to maintain context while scrolling over high-energy artist photography.

## Shapes

The shape language is strictly **Sharp (0px)**. The absence of rounded corners reinforces the industrial, brutalist, and professional nature of the agency. Every button, image container, and input field must have 90-degree angles. This geometric rigidity creates a sense of stability and architectural permanence.

## Components

- **Buttons:** Primary buttons are solid white rectangles with black Hanken Grotesk All-Caps text. Secondary buttons are 1px white outlines with no fill. The hover state should invert the colors instantly (no slow transitions).
- **Cards:** Cards for artists or news should be "borderless." Use high-quality imagery that fills the container, with text overlays appearing only on hover to maintain a clean, gallery-like look.
- **Input Fields:** Bottom-border only (1px white). Labels should use the `label-caps` typography style placed above the line.
- **Lists:** Music tracks or artist rosters should be presented in wide, horizontal rows separated by 1px slate-gray dividers. Use large numbers (Anton) for ranking or indexing items.
- **Navigation:** A minimal, top-aligned bar. Use the `label-caps` style for links. The active state is indicated by a simple 1px underline.
- **Additional Suggestion:** **The Marquee.** A horizontally scrolling text ticker using Anton at Display sizes, used to announce new releases or breaking news across the screen.