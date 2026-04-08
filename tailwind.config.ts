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
        background: "#121212",
        surface:    "#1A1A1A",
        elevated:   "#252525",
        border:     "#2E2E2E",
        muted:      "#6E6E6E",
        secondary:  "#B2B2B2",
        primary:    "#F5F5F5",
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
