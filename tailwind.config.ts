import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Velvet palette — deeper than the original purple, layered for richness
        'pf-bg': '#1A0B2A',
        'pf-bg-deep': '#0E0518',
        'pf-bg-rich': '#2A1340',
        'pf-wine': '#5E2745',
        'pf-wine-soft': '#7A3858',

        'pf-fg': '#F8F1FF',
        'pf-fg-soft': '#E8DCEF',
        'pf-accent': '#D4B6F0',
        'pf-accent-soft': '#E4CCF7',
        'pf-rose': '#B0806A',
        'pf-rose-soft': '#C9987F',
        'pf-mute': '#998AAE',
        'pf-warn': '#E0A070',
      },
      fontFamily: {
        // Engraved Roman caps — for brand and section labels
        'serif-hero': ['var(--font-cinzel)', '"Trajan Pro"', 'serif'],
        // Refined italic-friendly display serif — for hero slogan
        'display':    ['var(--font-cormorant)', '"EB Garamond"', 'serif'],
        // Korean serif body — replaces the old sans
        'serif-kr':   ['var(--font-noto-serif-kr)', '"Nanum Myeongjo"', 'serif'],
        'sans-kr':    ['var(--font-noto-serif-kr)', '"Nanum Myeongjo"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
        widest4: '0.4em',
        widest5: '0.5em',
      },
      boxShadow: {
        'velvet': '0 30px 80px -20px rgba(60, 20, 80, 0.6), 0 8px 24px -8px rgba(0,0,0,0.5)',
        'card-back': '0 8px 24px -6px rgba(0,0,0,0.55), 0 2px 6px -2px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
