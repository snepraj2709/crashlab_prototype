import Link from "next/link";

const rows = [
  {
    who: "For Industry",
    title: "Clinical validation for models that need to survive contact with practice.",
    body: "Validate your model on RadLE, commission India-specific evaluation studies, or work with the lab on deployment-grade evidence.",
    cta: "Commission a study",
    href: "/collaborate",
  },
  {
    who: "For Researchers",
    title: "Benchmarks, cohorts, and clinical collaborators for serious research.",
    body: "Join RadLE-X, propose a new cohort, or work with a lab that treats benchmark design as publishable infrastructure.",
    cta: "Propose a study",
    href: "/join",
  },
  {
    who: "For Funders",
    title: "Back the infrastructure the field will need before deployment scales.",
    body: "Support benchmark systems, data commons, and evaluation standards that make healthcare AI more accountable.",
    cta: "Talk to the lab",
    href: "/contact",
  },
];

export function CollaborateSection(): React.ReactElement {
  return (
    <section className="border-t border-border py-16 lg:py-24" id="collaborate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <h2 className="mt-6 max-w-4xl font-display text-4xl text-text-primary lg:text-5xl">
              Hold healthcare AI to the hard test.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-text-secondary lg:justify-self-end">
            CRASH Lab works with researchers, healthcare companies, and aligned funders that
            need clinically credible evaluation rather than presentation-ready claims.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {rows.map((row) => (
            <div className="border-t border-border pt-6" key={row.who}>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">{row.who}</p>
              <h3 className="mt-4 text-2xl font-medium leading-tight text-text-primary">
                {row.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-text-secondary">{row.body}</p>
              <Link
                className="mt-6 inline-flex text-sm text-accent-cyan transition hover:opacity-75"
                href={row.href}
              >
                {row.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
