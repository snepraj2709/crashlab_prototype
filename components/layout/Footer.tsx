import Link from "next/link";
import { Linkedin } from "lucide-react";

import { XIcon } from "@/components/ui/XIcon";

const footerLinks = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/join", label: "Join" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-border-default bg-surface-canvas">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent-cyan">
              Centre for Responsible Autonomous Systems in Healthcare
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl text-text-primary">
              Responsible AI, built for healthcare systems that have to work in
              the real world.
            </h2>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Explore</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="ui-focus-ring text-text-muted transition hover:text-text-default"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">Contact</p>
            <div className="mt-4 space-y-3 text-text-secondary">
              <p>Koita Centre for Digital Health, Ashoka University</p>
              <a
                className="ui-focus-ring block rounded-token-xs text-text-muted transition hover:text-text-default"
                href="mailto:suvrankar.datta@ashoka.edu.in"
              >
                suvrankar.datta@ashoka.edu.in
              </a>
              <p>
                Built for researchers, industry partners, and funders who care
                about clinical truth.
              </p>
            </div>
          </div>
        </div>

        <nav
          aria-label="CRASH Lab social links"
          className="mt-8 flex items-center gap-4"
        >
          <a
            aria-label="CRASH Lab on X (Twitter)"
            className="ui-focus-ring rounded-token-pill p-1 text-text-tertiary transition-colors duration-200 hover:text-border-focus"
            href="https://x.com/DrDatta_AIIMS"
            rel="noopener noreferrer"
            target="_blank"
          >
            <XIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            aria-label="CRASH Lab on LinkedIn"
            className="ui-focus-ring rounded-token-pill p-1 text-text-tertiary transition-colors duration-200 hover:text-border-focus"
            href="https://linkedin.com/company/crashlab-ashoka"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Linkedin size={18} />
          </a>
        </nav>

        <hr className="mb-6 mt-10 border-border-default" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-text-tertiary sm:flex-row sm:items-center">
          <p>
            Supported by the{" "}
            <a
              className="ui-focus-ring rounded-token-xs underline underline-offset-2 hover:text-text-default"
              href="https://koitafoundation.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Koita Foundation
            </a>{" "}
            · Koita Centre for Digital Health, Ashoka University
          </p>
          <p>© {new Date().getFullYear()} CRASH Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
