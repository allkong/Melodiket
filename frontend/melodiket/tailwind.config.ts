import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
  plugins: [],
};
export default config;
