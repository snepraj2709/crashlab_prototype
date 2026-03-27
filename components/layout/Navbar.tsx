"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useScrollProgress } from "@/hooks/useScrollProgress";

const navLinks = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/join", label: "Join" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" }
];

function isNavLinkActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { hasScrolled } = useScrollProgress();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          hasScrolled ? "border-b backdrop-blur-xl" : "bg-transparent",
        )}
        style={
          hasScrolled
            ? {
                backgroundColor: "var(--navbar-bg-solid)",
                borderColor: "var(--navbar-border)",
              }
            : undefined
        }
        data-cursor="native"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <BrandMark />

          <div className="hidden items-center gap-3 lg:flex">
            <nav className="flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = isNavLinkActive(pathname, link.href);

                return (
                  <Link
                    className={cn(
                      "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold tracking-[0.01em] transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
                      isActive
                        ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan shadow-sm"
                        : "border-transparent text-text-secondary hover:border-border hover:bg-bg-surface hover:text-text-primary hover:shadow-sm",
                    )}
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <ThemeToggle />
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="rounded-full border border-border p-3 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary lg:hidden"
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
