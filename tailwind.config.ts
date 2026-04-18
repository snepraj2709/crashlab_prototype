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
        navy: {
          800: "#111d33",
          900: "#0c1527"
        },
        steel: {
          50: "#f3f7fb",
          100: "#e2ebf3",
          200: "#c0cfde",
          300: "#a8b9ca",
          400: "#7f97ae",
          500: "#61758f",
          600: "#4a5f77",
          700: "#33465d"
        },
        brand: {
          blue: "#2f5f8d"
        },
        bg: {
          primary: "var(--color-bg-primary)",
          surface: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)"
        },
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--color-border-subtle)",
          default: "var(--color-border-default)",
          focus: "var(--color-border-focus)"
        },
        surface: {
          canvas: "var(--color-surface-canvas)",
          panel: "var(--color-surface-panel)",
          shell: "var(--color-surface-shell)",
          strong: "var(--color-surface-strong)"
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          default: "var(--color-text-default)",
          muted: "var(--color-text-muted)",
          "on-strong": "var(--color-text-on-strong)"
        },
        accent: {
          cyan: "var(--color-accent-cyan)",
          orange: "var(--color-accent-orange)",
          green: "var(--color-accent-green)",
          yellow: "var(--color-accent-yellow)"
        },
        status: {
          neutral: {
            surface: "var(--color-status-neutral-surface)",
            border: "var(--color-status-neutral-border)",
            text: "var(--color-status-neutral-text)"
          },
          info: {
            surface: "var(--color-status-info-surface)",
            border: "var(--color-status-info-border)",
            text: "var(--color-status-info-text)"
          },
          success: {
            surface: "var(--color-status-success-surface)",
            border: "var(--color-status-success-border)",
            text: "var(--color-status-success-text)"
          },
          warning: {
            surface: "var(--color-status-warning-surface)",
            border: "var(--color-status-warning-border)",
            text: "var(--color-status-warning-text)"
          },
          error: {
            surface: "var(--color-status-error-surface)",
            border: "var(--color-status-error-border)",
            text: "var(--color-status-error-text)"
          }
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
      borderRadius: {
        "token-xs": "var(--radius-xs)",
        "token-sm": "var(--radius-sm)",
        "token-md": "var(--radius-md)",
        "token-pill": "var(--radius-lg)"
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        panel: "var(--shadow-panel)",
        soft: "var(--shadow-soft)"
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
