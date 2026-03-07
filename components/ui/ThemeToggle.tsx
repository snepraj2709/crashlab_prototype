"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({
  className = ""
}: ThemeToggleProps): React.ReactElement {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div aria-hidden="true" className={`h-9 w-9 rounded-lg ${className}`} />;
  }

  const currentTheme = resolvedTheme ?? (theme === "system" ? "light" : theme) ?? "light";
  const isDark = currentTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      aria-label={label}
      className={`
        relative flex h-9 w-9 items-center justify-center rounded-lg
        border border-[var(--color-border)] bg-[var(--color-bg-surface)]
        text-[var(--color-text-secondary)] hover:border-[var(--color-accent-cyan)]
        hover:text-[var(--color-accent-cyan)] focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]
        transition-colors duration-200 ${className}
      `}
      onClick={() => setTheme(nextTheme)}
      title={label}
      type="button"
    >
      <span
        aria-hidden={!isDark}
        className="absolute inset-0 flex items-center justify-center transition-all duration-200"
        style={{ opacity: isDark ? 1 : 0, transform: isDark ? "scale(1)" : "scale(0.5)" }}
      >
        <Sun size={16} strokeWidth={1.75} />
      </span>
      <span
        aria-hidden={isDark}
        className="absolute inset-0 flex items-center justify-center transition-all duration-200"
        style={{ opacity: isDark ? 0 : 1, transform: isDark ? "scale(0.5)" : "scale(1)" }}
      >
        <Moon size={16} strokeWidth={1.75} />
      </span>
    </button>
  );
}
