"use client";

import FocusTrap from "focus-trap-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

import { ThemeToggle } from "@/components/ui";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/join", label: "Join" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" }
];

export function MobileMenu({ open, onClose }: MobileMenuProps): React.ReactElement {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <FocusTrap>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            style={{ backgroundColor: "var(--color-bg-overlay)" }}
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-accent-cyan">CRASH Lab</span>
                <button
                  aria-label="Close menu"
                  className="rounded-full border border-border p-3 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  onClick={onClose}
                  type="button"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-16 flex flex-1 flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    className="rounded-2xl border border-border bg-bg-surface px-5 py-4 text-lg font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                    href={link.href}
                    key={link.href}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-2 flex items-center justify-between border-t border-border py-3">
                <span className="text-sm text-text-secondary">Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </FocusTrap>
      ) : null}
    </AnimatePresence>
  );
}
