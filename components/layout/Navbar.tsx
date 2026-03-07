"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/join", label: "Join" },
  { href: "/partners", label: "Partners" },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Blog" }
];

export function Navbar(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const { hasScrolled } = useScrollProgress();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          hasScrolled ? "border-b border-white/10 bg-bg-primary/85 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            className="flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            href="/"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-accent-cyan">
              CRASH Lab
            </span>
            <span className="text-sm text-text-secondary">Ashoka University</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                className="text-sm text-text-secondary transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/join" size="sm" variant="primary">
              Join the Lab
            </Button>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="rounded-full border border-white/10 p-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary lg:hidden"
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>
      <MobileMenu onClose={() => setMenuOpen(false)} open={menuOpen} />
    </>
  );
}
