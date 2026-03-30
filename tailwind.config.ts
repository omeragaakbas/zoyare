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
        background: "#080808",
        surface: "#111111",
        border: "#1C1C1C",
        muted: "#707070",
        secondary: "#AAAAAA",
        primary: "#F5F5F5",
        accent: "#FF4500",
      },
      letterSpacing: {
        tight: "-0.03em",
        tighter: "-0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
