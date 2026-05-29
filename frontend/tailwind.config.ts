import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        magenta: {
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        ink: {
          50: "#f7f7fa",
          100: "#eceef4",
          200: "#d5d8e3",
          300: "#a9aec0",
          400: "#73798f",
          500: "#4d536a",
          600: "#363b4d",
          700: "#262a38",
          800: "#181b25",
          900: "#0c0e16",
          950: "#06070d",
        },
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "orb-drift-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(40px, -60px) scale(1.1)" },
        },
        "orb-drift-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-50px, 50px) scale(1.15)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "orb-1": "orb-drift-1 18s ease-in-out infinite",
        "orb-2": "orb-drift-2 22s ease-in-out infinite",
      },
      backgroundImage: {
        "aurora":
          "linear-gradient(135deg, #6366f1 0%, #d946ef 50%, #f59e0b 100%)",
        "aurora-soft":
          "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(217,70,239,0.18) 50%, rgba(245,158,11,0.18) 100%)",
        "shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99,102,241,0.45)",
        "glow-fuchsia": "0 0 40px -10px rgba(217,70,239,0.45)",
        "card-dark":
          "0 8px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-light":
          "0 8px 30px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
