import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        mountainsDesktop: 'url(../public/images/background-desktop.jpg)',
        mountainsMobile: 'url(../public/images/background-mobile.jpg)',
      },
      colors: {
        primary: '#263238',
        accent: {
          dark: '#795548',
          light: '#996B5B',
          veryLight: '#d2bab0',
        },
        light: '#78909C',
        bluegray: '#546E7A',
        'deep-sapphire-blue': '#1A3A6B',
        'emerald-green': '#2E8B57',
        'golden-yellow': '#FFD700',
        'warm-gray': '#8C8C8C',
        'mystic-teal': '#40E0D0',
        'midnight-purple': '#4B0082',
        'crimson-red': '#DC143C',
      },
    },
  },
  plugins: [],
};
export default config;
