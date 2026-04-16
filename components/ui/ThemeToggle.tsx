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
    return <div aria-hidden="true" className={`h-11 w-11 rounded-token-sm ${className}`} />;
  }

  const currentTheme = resolvedTheme ?? (theme === "system" ? "light" : theme) ?? "light";
  const isDark = currentTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      aria-label={label}
      className={`
        ui-focus-ring relative flex h-11 w-11 items-center justify-center rounded-token-sm
        border border-border-default bg-surface-panel text-text-muted
        hover:border-border-focus hover:text-border-focus
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
