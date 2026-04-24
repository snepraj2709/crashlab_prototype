import Link from "next/link";

import { XIcon } from "@/components/ui/XIcon";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/collaborate", label: "Collaborate" },
  { href: "/news", label: "News & Events" },
  { href: "/join", label: "Apply" },
];

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-white/10 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-steel-300">
              Centre for Responsible Autonomous Systems in Healthcare
            </p>
            <h2 className="mt-4 max-w-xl font-display text-3xl text-white">
              Responsible AI, built for healthcare systems that have to work in
              the real world.
            </h2>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Explore</p>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="ui-focus-ring text-slate-300 transition hover:text-white"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Contact</p>
            <div className="mt-4 space-y-3 text-slate-300">
              <p>Koita Centre for Digital Health, Ashoka University</p>
              <a
                className="ui-focus-ring block rounded-token-xs text-slate-300 transition hover:text-white"
                href="mailto:suvrankar.datta@ashoka.edu.in"
              >
                suvrankar.datta@ashoka.edu.in
              </a>
              <p>
                Built for researchers, industry partners, and funders who care
                about clinical truth in AI.
              </p>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3">
              <nav
                aria-label="CRASH Lab social links"
                className="flex items-center gap-3"
              >
                <a
                  aria-label="CRASH Lab on X (Twitter)"
                  className="ui-focus-ring inline-flex h-11 w-11 items-center justify-center rounded-token-pill border border-white/12 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-steel-300 hover:text-white"
                  href="https://x.com/DrDatta_AIIMS"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <XIcon className="h-5 w-5" />
                </a>
                <a
                  aria-label="CRASH Lab on LinkedIn"
                  className="ui-focus-ring inline-flex h-11 w-11 items-center justify-center rounded-token-pill border border-white/12 bg-white/5 text-slate-300 transition-colors duration-200 hover:border-steel-300 hover:text-white"
                  href="https://linkedin.com/company/crashlab-ashoka"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </nav>
            </div>
          </div>
        </div>

        <hr className="mb-6 mt-10 border-white/10" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            Supported by the{" "}
            <a
              className="ui-focus-ring rounded-token-xs underline underline-offset-2 hover:text-white"
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
