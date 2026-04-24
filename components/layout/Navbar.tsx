"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { BrandMark } from "@/components/layout/BrandMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Active Research", href: "/research?status=active" },
      { label: "Publications", href: "/publications" }
    ]
  },
  { label: "People", href: "/people" },
  { label: "Collaborate", href: "/collaborate" },
  { label: "News & Events", href: "/news" }
];

function isNavLinkActive(pathname: string, href: string): boolean {
  const base = href.split("?")[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}

interface DropdownMenuProps {
  items: NavChild[];
  visible: boolean;
}

function DropdownMenu({ items, visible }: DropdownMenuProps): React.ReactElement | null {
  if (!visible) return null;
  return (
    <div
      className="absolute left-0 top-full mt-2 min-w-[200px] overflow-hidden rounded-token-sm border border-border-default bg-surface-panel"
      role="menu"
    >
      {items.map((child) => (
        <Link
          className="block px-4 py-3 text-sm font-medium text-text-muted transition-colors hover:bg-surface-canvas hover:text-text-default"
          href={child.href}
          key={child.href}
          role="menuitem"
        >
          {child.label}
        </Link>
      ))}
    </div>
  );
}

interface NavbarProps {
  hasBanner?: boolean;
}

export function Navbar({ hasBanner }: NavbarProps): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { hasScrolled } = useScrollProgress();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter(label: string): void {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave(): void {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
  }

  const bannerOffset = hasBanner
    ? "top-[var(--announcement-banner-offset,0px)]"
    : "top-0";

  return (
    <>
      <header
        className={cn(
          "sticky z-40 w-full transition-all duration-300",
          bannerOffset,
          hasScrolled ? "border-b backdrop-blur-xl" : "bg-transparent"
        )}
        style={
          hasScrolled
            ? {
                backgroundColor: "var(--navbar-bg-solid)",
                borderColor: "var(--navbar-border)"
              }
            : undefined
        }
        data-cursor="native"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <BrandMark compact />

          <div className="hidden items-center gap-3 lg:flex">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = isNavLinkActive(pathname, item.href);
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openDropdown === item.label;

                return (
                  <div
                    className="relative"
                    key={item.href}
                    onMouseEnter={() => hasChildren ? handleMouseEnter(item.label) : undefined}
                    onMouseLeave={() => hasChildren ? handleMouseLeave() : undefined}
                  >
                    <Link
                      aria-expanded={hasChildren ? isOpen : undefined}
                      aria-haspopup={hasChildren ? "menu" : undefined}
                      className={cn(
                        "ui-focus-ring inline-flex items-center gap-1 rounded-token-pill border px-4 py-2 text-sm font-semibold tracking-[0.01em] transition-all duration-200",
                        isActive
                          ? "border-border-focus bg-status-info-surface text-border-focus"
                          : "border-transparent text-text-muted hover:border-border-default hover:bg-surface-panel hover:text-text-default"
                      )}
                      href={item.href}
                    >
                      {item.label}
                      {hasChildren ? (
                        <ChevronDown
                          className={cn("size-3.5 transition-transform duration-150", isOpen ? "rotate-180" : "")}
                        />
                      ) : null}
                    </Link>
                    {hasChildren ? (
                      <DropdownMenu items={item.children!} visible={isOpen} />
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <Button href="/join">
              Join Us
            </Button>
          </div>

          <button
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="ui-focus-ring inline-flex h-11 w-11 items-center justify-center rounded-token-pill border border-border-default bg-surface-panel text-text-default lg:hidden"
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
