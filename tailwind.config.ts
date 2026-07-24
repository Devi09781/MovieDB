import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: { 950: "#0a0a0b", 900: "#111113", 800: "#18181b", 700: "#232328", 600: "#2e2e34", 500: "#3f3f47" },
        brand: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309" },
        accent: { red: "#e50914", green: "#46d369" },
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"], display: ["Bebas Neue", "system-ui", "sans-serif"] },
      boxShadow: { glow: "0 0 40px -10px rgba(245,158,11,0.35)", card: "0 10px 30px -12px rgba(0,0,0,0.6)" },
      keyframes: { shimmer: { "0%": { backgroundPosition: "-1000px 0" }, "100%": { backgroundPosition: "1000px 0" } } },
      animation: { shimmer: "shimmer 2s linear infinite" },
    },
  },
  plugins: [],
};

export default config;
