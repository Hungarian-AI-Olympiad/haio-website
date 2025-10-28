import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        desert: {
          50: '#E8EDF5',   // Very light blue-gray
          100: '#D1DBEB',  // Light blue-gray
          200: '#A3B7D7',  // Soft blue
          300: '#7593C3',  // Medium blue
          400: '#4A6FA0',  // Deep blue
          500: '#2C4875',  // Navy blue
          600: '#1F3556',  // Dark navy
          700: '#16243D',  // Very dark blue
          800: '#0F1829',  // Almost black blue
          900: '#080D16',  // Deepest night blue
        },
        'off-white': '#F5F7FA',
        'warm-blue': '#5B7AA0',
        'dark-blue': '#1A2B44',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
    }
  },

  plugins: [require("@tailwindcss/typography")]
} as Config;
