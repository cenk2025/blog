import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#04070f",
          light: "#f4f8ff"
        },
        ink: {
          dark: "#e7f0ff",
          light: "#0e1629"
        },
        accent: {
          cyan: "#45d4ff",
          emerald: "#43f0c2",
          amber: "#f5c772"
        }
      },
      fontFamily: {
        display: [
          "\"Sora\"",
          "\"Avenir Next\"",
          "\"Segoe UI Variable Display\"",
          "\"Helvetica Neue\"",
          "sans-serif"
        ],
        body: [
          "\"General Sans\"",
          "\"Avenir Next\"",
          "\"Segoe UI Variable Text\"",
          "\"Helvetica Neue\"",
          "sans-serif"
        ]
      },
      backgroundImage: {
        "aurora-dark":
          "radial-gradient(circle at 15% 15%, rgba(69, 212, 255, 0.22), transparent 38%), radial-gradient(circle at 80% 10%, rgba(67, 240, 194, 0.18), transparent 35%), linear-gradient(160deg, #04070f 0%, #060d1d 55%, #050915 100%)",
        "aurora-light":
          "radial-gradient(circle at 10% 10%, rgba(76, 130, 255, 0.15), transparent 35%), radial-gradient(circle at 85% 0%, rgba(67, 240, 194, 0.12), transparent 30%), linear-gradient(165deg, #f4f8ff 0%, #eef4ff 45%, #f8fbff 100%)"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(69, 212, 255, 0.3), 0 10px 40px rgba(33, 191, 255, 0.2)",
        card: "0 16px 50px rgba(2, 7, 20, 0.35)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
