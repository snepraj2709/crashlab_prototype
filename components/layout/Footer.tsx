import Link from "next/link";

const footerLinks = [
  { href: "/research", label: "Research" },
  { href: "/people", label: "People" },
  { href: "/join", label: "Join" },
  { href: "/partners", label: "Partners" },
  { href: "/impact", label: "Impact" },
  { href: "/blog", label: "Blog" }
];

export function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-white/10 bg-bg-primary">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent-cyan">
            Centre for Responsible Autonomous Systems in Healthcare
          </p>
          <h2 className="mt-4 max-w-xl font-display text-3xl text-white">
            Responsible AI, built for healthcare systems that have to work in the real world.
          </h2>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Explore</p>
          <ul className="mt-4 space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-text-secondary transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
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
          <div className="mt-4 space-y-3 text-text-secondary">
            <p>Koita Centre for Digital Health, Ashoka University</p>
            <a
              className="block transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              href="mailto:suvrankar.datta@ashoka.edu.in"
            >
              suvrankar.datta@ashoka.edu.in
            </a>
            <p>Built for researchers, industry partners, and funders who care about clinical truth.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
