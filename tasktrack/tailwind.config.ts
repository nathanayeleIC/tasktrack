import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
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
        }
      }
    }
  },
  plugins: []
};

export default config;
