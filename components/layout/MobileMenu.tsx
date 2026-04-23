"use client";

import FocusTrap from "focus-trap-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { navItems } from "@/components/layout/Navbar";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps): React.ReactElement {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === "Escape") onClose();
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
            style={{ backgroundColor: "var(--color-overlay-scrim)" }}
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col px-6 py-6">
              <div className="flex items-center justify-between">
                <BrandMark compact onClick={onClose} />
                <button
                  aria-label="Close menu"
                  className="ui-focus-ring inline-flex h-11 w-11 items-center justify-center rounded-token-pill border border-border-default bg-surface-panel text-text-default"
                  onClick={onClose}
                  type="button"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-16 flex flex-1 flex-col gap-2 overflow-y-auto">
                {navItems.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const isExpanded = expanded === item.label;

                  return (
                    <div key={item.href}>
                      <div className="flex items-stretch">
                        <Link
                          className="ui-focus-ring flex-1 rounded-l-token-sm border border-r-0 border-border-default bg-surface-panel px-5 py-4 text-lg font-medium text-text-default"
                          href={item.href}
                          onClick={onClose}
                        >
                          {item.label}
                        </Link>
                        {hasChildren ? (
                          <button
                            aria-expanded={isExpanded}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="flex items-center rounded-r-token-sm border border-border-default bg-surface-panel px-4 text-text-muted transition-colors hover:text-text-default"
                            onClick={() => setExpanded(isExpanded ? null : item.label)}
                            type="button"
                          >
                            <ChevronDown
                              className={cn("size-4 transition-transform duration-150", isExpanded ? "rotate-180" : "")}
                            />
                          </button>
                        ) : null}
                      </div>

                      {hasChildren && isExpanded ? (
                        <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-border-focus pl-4">
                          {item.children!.map((child) => (
                            <Link
                              className="ui-focus-ring block rounded-token-xs border border-border-default bg-surface-canvas px-4 py-3 text-base text-text-secondary transition-colors hover:text-text-default"
                              href={child.href}
                              key={child.href}
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                <Button
                  className="mt-2 w-full text-lg font-semibold"
                  href="/join"
                  onClick={onClose}
                  size="lg"
                >
                  Apply to Join
                </Button>
              </nav>
            </div>
          </motion.div>
        </FocusTrap>
      ) : null}
    </AnimatePresence>
  );
}
