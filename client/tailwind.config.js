/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in-out": "fadeInOut 4s ease-out forwards",
      },
      keyframes: {
        fadeInOut: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
        }
      },
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

