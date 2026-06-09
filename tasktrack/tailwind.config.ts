import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#ffffff'
        },
        brand: {
          50: '#eef4ff',
          100: '#dce9ff',
          200: '#b3c8ff',
          300: '#7f9ffc',
          400: '#5b78f8',
          500: '#3c5fe4',
          600: '#2f4dc1',
          700: '#28439c',
          800: '#233a7f',
          900: '#1f3368'
        },
        success: {
          50: '#ecfbef',
          100: '#d6f6da',
          200: '#a5e7b4',
          300: '#6fd78d',
          400: '#3eb96a',
          500: '#0e9a51',
          600: '#0a7a3d',
          700: '#065c2c',
          800: '#044726',
          900: '#03381f'
        },
        warning: {
          50: '#fff6e4',
          100: '#fde8b7',
          200: '#fbd786',
          300: '#f7c75b',
          400: '#f5b235',
          500: '#e89a1e',
          600: '#b77417',
          700: '#8a5813',
          800: '#69440f',
          900: '#4f340c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 12px 40px -22px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
