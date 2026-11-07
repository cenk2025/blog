import type { Config } from "tailwindcss";

// VOON IQ design system: neutral canvas + one accent (the VOON gradient).
// Colours resolve to CSS variables in app/globals.css so light/dark switch automatically.
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        "fg-2": "var(--fg-2)",
        "fg-3": "var(--fg-3)",
        line: "var(--line)",
        fill: "var(--fill)",
        brand: "var(--brand)",
        // Legacy names still used by the admin panel, remapped to VOON IQ values.
        canvas: { light: "#f5f5f7", dark: "#000000" },
        ink: { light: "#1d1d1f", dark: "#f5f5f7" },
        accent: { cyan: "#e8264f", emerald: "#fd4180", amber: "#fb2b3b" }
      },
      fontFamily: {
        display: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "\"Helvetica Neue\"", "Arial", "sans-serif"],
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Helvetica Neue\"",
          "Arial",
          "sans-serif"
        ]
      },
      backgroundImage: {
        grad: "linear-gradient(90deg, #fb2b3b, #fd4180)"
      },
      boxShadow: {
        card: "0 2px 12px -4px rgba(0, 0, 0, 0.06), 0 18px 40px -24px rgba(0, 0, 0, 0.18)",
        brand: "0 8px 24px -10px rgba(253, 53, 93, 0.7)"
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.28, 0.11, 0.32, 1)"
      },
      maxWidth: {
        text: "980px",
        wide: "1200px",
        read: "700px"
      }
    }
  },
  plugins: []
};

export default config;
