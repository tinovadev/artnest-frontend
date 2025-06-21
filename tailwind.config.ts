import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['Pixelify Sans', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#18191D',
        foreground: '#FFFFFF',
        primary: '#FF5836',
        secondary: '#3C3F4B',
        muted: '#282A31',
        'muted-foreground': '#B4B9C5',
        border: '#505863',
        black: '#18191D',
        success: '#36FFB5',
        card: {
          DEFAULT: '#282A31',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT: '#282A31',
          foreground: '#FFFFFF',
        },
        input: '#505863',
        ring: '#FF5836',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;