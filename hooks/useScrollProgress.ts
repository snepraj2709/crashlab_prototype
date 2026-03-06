"use client";

import { useEffect, useState } from "react";

export function useScrollProgress(): { progress: number; hasScrolled: boolean } {
  const [progress, setProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll(): void {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? scrollTop / documentHeight : 0;

      setProgress(nextProgress);
      setHasScrolled(scrollTop > 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { progress, hasScrolled };
}
