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
        display: ["var(--font-display)", "serif"],
      },
      colors: {
        background: "#F8F6F2",
        surface:    "#EFECE6",
        elevated:   "#E7E3DB",
        border:     "#D9D5CC",
        // Darkened from #8A8680 (3.35:1) to reach WCAG AA 4.5:1 on the cream background.
        muted:      "#6B6762",
        secondary:  "#5C5854",
        primary:    "#1A1916",
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
