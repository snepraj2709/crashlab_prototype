import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          surface: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)"
        },
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)"
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)"
        },
        accent: {
          cyan: "var(--color-accent-cyan)",
          orange: "var(--color-accent-orange)",
          green: "var(--color-accent-green)",
          yellow: "var(--color-accent-yellow)"
        }
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Georgia",
          "serif"
        ],
        sans: [
          "var(--font-sans)",
          "system-ui",
          "sans-serif"
        ],
        mono: [
          "var(--font-mono)",
          "monospace"
        ]
      },
      boxShadow: {
        glow: "var(--shadow-glow)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top right, var(--color-accent-cyan-muted), transparent 35%), radial-gradient(circle at 20% 20%, var(--color-accent-orange-muted), transparent 26%)"
      }
    }
  },
  plugins: [
    forms,
    typography
  ]
};

export default config;
