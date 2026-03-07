"use client";

import FocusTrap from "focus-trap-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/join", label: "Join" },
  { href: "/partners", label: "Partners" },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Blog" }
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
            className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-accent-cyan">CRASH Lab</span>
                <button
                  aria-label="Close menu"
                  className="rounded-full border border-white/10 p-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  onClick={onClose}
                  type="button"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="mt-16 flex flex-1 flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-lg font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                    href={link.href}
                    key={link.href}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button href="/join" onClick={onClose} size="lg">
                Join the Lab
              </Button>
            </div>
          </motion.div>
        </FocusTrap>
      ) : null}
    </AnimatePresence>
  );
}
