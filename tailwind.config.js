/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f5f7", 100: "#e6e6ea", 200: "#c9c9d1", 300: "#a8a8b3",
          400: "#7e7e8c", 500: "#5a5a66", 600: "#3d3d46", 700: "#2a2a31",
          800: "#1c1c22", 850: "#16161b", 900: "#111115", 950: "#0a0a0d",
        },
        brand: {
          50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047",
          400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207",
          800: "#854d0e", 900: "#713f12",
        },
        accent: { 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2" },
        success: { 400: "#4ade80", 500: "#22c55e", 600: "#16a34a" },
        warning: { 400: "#facc15", 500: "#eab308", 600: "#ca8a04" },
        error: { 400: "#f87171", 500: "#ef4444", 600: "#dc2626" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
