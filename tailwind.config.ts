import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      colors: {
        background: "#0D0D0D",
        surface:    "#131313",
        elevated:   "#1C1C1C",
        border:     "#222222",
        muted:      "#585858",
        secondary:  "#9A9A9A",
        primary:    "#EBEBEB",
        accent:     "#F15F0E",
      },
      letterSpacing: {
        tight:   "-0.03em",
        tighter: "-0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
