import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pf-bg': '#2B2042',
        'pf-fg': '#FFFFFF',
        'pf-fg-soft': '#F0EDF5',
        'pf-accent': '#C8A2E8',
        'pf-accent-soft': '#D4B8F0',
        'pf-rose': '#A07060',
        'pf-rose-soft': '#C09080',
        'pf-mute': '#B0AABA',
        'pf-warn': '#D89060',
      },
      fontFamily: {
        'serif-hero': ['"Bodoni Moda"', '"Didot"', 'serif'],
        'sans-kr': ['"Noto Sans KR"', 'sans-serif'],
        'serif-kr': ['"Nanum Myeongjo"', 'serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
    },
  },
  plugins: [],
};

export default config;
