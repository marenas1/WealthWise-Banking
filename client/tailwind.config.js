/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        financial: {
          primary: '#4CAF50',  // Primary green
          dark: '#388E3C',     // Dark green for headers and titles
          light: '#C8E6C9',    // Light green for positive highlights
          accent: '#66BB6A',   // Accent green for hover states
          muted: '#A5D6A7',    // Muted green for secondary highlights
          lime: '#8BC34A',     // Lime green for secondary buttons
          success: '#2E7D32',  // Success green for status indicators
        },
      },
    },
  },
  plugins: [],
}

