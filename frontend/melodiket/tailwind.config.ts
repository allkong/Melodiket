import type { Config } from 'tailwindcss';
// @ts-expect-error: TypeScript types for tailwind-scrollbar-hide are not available
import scrollbarHide from 'tailwind-scrollbar-hide';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      '2xs': '.625rem',
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.95rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#E28EFF',
        secondary: '#A293FF',
        purple: {
          100: '#F9F1FF',
          200: '#C090FF',
          300: '#C61FFF',
          400: '#8F00FF',
        },
        gray: {
          100: '#F7F7F7',
          200: '#D7D7D7',
          300: '#C7C1CC',
          400: '#A4A4A4',
          500: '#616161',
          600: '#3E3E3E',
        },
      },
    },
  },
  plugins: [scrollbarHide],
};
export default config;
