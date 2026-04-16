import React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type {
  CredentialKind,
  CredentialSignalSeed,
  TrustLogoSeed,
  TrustSectionSeed
} from "@/types/trust";

interface TrustSignalsSectionProps {
  section: TrustSectionSeed;
  variant?: "featured" | "compact" | "slideshow";
}

const credentialKindMeta: Record<
  CredentialKind,
  {
    label: string;
    badgeClassName: string;
    dotClassName: string;
  }
> = {
  award: {
    label: "Award",
    badgeClassName:
      "border border-border bg-[var(--color-accent-green-muted)] text-[var(--color-accent-green)]",
    dotClassName: "bg-[var(--color-accent-green)]"
  },
  affiliation: {
    label: "Affiliation",
    badgeClassName:
      "border border-border bg-[var(--color-accent-cyan-muted)] text-[var(--color-accent-cyan)]",
    dotClassName: "bg-[var(--color-accent-cyan)]"
  },
  funding: {
    label: "Funding",
    badgeClassName:
      "border border-border bg-[var(--color-accent-orange-muted)] text-[var(--color-accent-orange)]",
    dotClassName: "bg-[var(--color-accent-orange)]"
  },
  milestone: {
    label: "Milestone",
    badgeClassName:
      "border border-border bg-[var(--color-accent-yellow-muted)] text-[var(--color-accent-yellow)]",
    dotClassName: "bg-[var(--color-accent-yellow)]"
  },
  publication: {
    label: "Publication",
    badgeClassName:
      "border border-border bg-[var(--color-accent-cyan-muted)] text-[var(--color-accent-cyan)]",
    dotClassName: "bg-[var(--color-accent-cyan)]"
  }
};

function LogoMarkup({
  logo,
  maxHeightClassName,
  tileClassName,
  ariaHidden = false,
  tabIndex
}: {
  logo: TrustLogoSeed;
  maxHeightClassName: string;
  tileClassName?: string;
  ariaHidden?: boolean;
  tabIndex?: number;
}): React.ReactElement {
  const imageClassName = cn("h-auto w-auto max-w-full object-contain", maxHeightClassName);
  const logoTileClassName = cn(
    "inline-flex items-center justify-center rounded-[20px] border border-border-subtle bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]",
    tileClassName
  );

  if (logo.href) {
    return (
      <a
        aria-hidden={ariaHidden || undefined}
        aria-label={ariaHidden ? undefined : `Visit ${logo.name} (opens in new tab)`}
        className={cn(
          logoTileClassName,
          "transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
        )}
        href={logo.href}
        key={logo.id}
        rel="noopener noreferrer"
        tabIndex={tabIndex}
        target="_blank"
      >
        <Image
          alt={logo.logo.alt}
          className={imageClassName}
          height={logo.logo.height}
          loading="lazy"
          src={logo.logo.url}
          style={{ maxWidth: `${logo.logo.width}px` }}
          width={logo.logo.width}
        />
      </a>
    );
  }

  return (
    <div
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : logo.logo.alt}
      className={logoTileClassName}
      key={logo.id}
      role={ariaHidden ? undefined : "img"}
    >
      <Image
        alt={logo.logo.alt}
        aria-hidden={ariaHidden ? "true" : undefined}
        className={imageClassName}
        height={logo.logo.height}
        loading="lazy"
        src={logo.logo.url}
        style={{ maxWidth: `${logo.logo.width}px` }}
        width={logo.logo.width}
      />
    </div>
  );
}

function CredentialLabel({
  credential,
  className
}: {
  credential: CredentialSignalSeed;
  className: string;
}): React.ReactElement {
  if (credential.href) {
    return (
      <a
        className={cn(className, "transition-colors hover:text-[var(--color-accent-cyan)]")}
        href={credential.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {credential.label}
      </a>
    );
  }

  return <span className={className}>{credential.label}</span>;
}

function FeaturedCredentialCard({
  credential
}: {
  credential: CredentialSignalSeed;
}): React.ReactElement {
  const meta = credentialKindMeta[credential.kind];

  return (
    <div className="rounded-xl border border-border bg-bg-elevated p-5 transition-colors duration-200 hover:border-accent-cyan">
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
          meta.badgeClassName
        )}
      >
        {meta.label}
      </span>
      <div className="mt-3">
        <CredentialLabel
          className="text-sm font-semibold text-text-primary"
          credential={credential}
        />
      </div>
      {credential.supportingText ? (
        <p className="mt-1.5 text-xs text-text-secondary">{credential.supportingText}</p>
      ) : null}
    </div>
  );
}

function CompactCredentialRow({
  credential
}: {
  credential: CredentialSignalSeed;
}): React.ReactElement {
  const meta = credentialKindMeta[credential.kind];

  return (
    <div className="flex items-start gap-3 border-b border-border-subtle py-2 last:border-0" key={credential.id}>
      <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", meta.dotClassName)} />
      <div className="flex-1">
        <CredentialLabel
          className="text-sm font-medium text-text-primary"
          credential={credential}
        />
        {credential.supportingText ? (
          <p className="mt-0.5 text-xs text-text-secondary">{credential.supportingText}</p>
        ) : null}
      </div>
    </div>
  );
}

export function TrustSignalsSection({
  section,
  variant = "compact"
}: TrustSignalsSectionProps): React.ReactElement | null {
  if (!section.logos.length && !section.credentials.length) {
    return null;
  }

  if (variant === "slideshow" && section.logos.length) {
    const repeatedLogos = [...section.logos, ...section.logos];

    return (
      <section aria-label="Institutional affiliations and credentials" className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="trust-logo-slideshow rounded-[36px] border border-border bg-bg-surface px-6 py-8 shadow-[var(--shadow-card)] sm:px-8 lg:px-10 lg:py-10">
            <div aria-hidden="true" className="hero-mesh absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">{section.eyebrow}</p>
              <h2 className="mt-3 max-w-4xl font-display text-3xl text-text-primary sm:text-4xl lg:text-5xl">
                {section.title}
              </h2>
              <p className="mt-4 max-w-3xl text-base text-text-secondary sm:text-lg">
                {section.description}
              </p>

              <div className="mt-10 sm:mt-12">
                <div className="sr-only">
                  <ul>
                    {section.logos.map((logo) => (
                      <li key={logo.id}>{logo.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="trust-logo-slideshow__viewport">
                  <div
                    aria-hidden="true"
                    className="trust-logo-slideshow__edge trust-logo-slideshow__edge--left"
                  />
                  <div
                    aria-hidden="true"
                    className="trust-logo-slideshow__edge trust-logo-slideshow__edge--right"
                  />

                  <div className="trust-logo-slideshow__track gap-4 sm:gap-6 lg:gap-8">
                    {repeatedLogos.map((logo, index) => (
                      <LogoMarkup
                        ariaHidden={index >= section.logos.length}
                        key={`${logo.id}-${index}`}
                        logo={logo}
                        maxHeightClassName="max-h-10 sm:max-h-12"
                        tabIndex={index >= section.logos.length ? -1 : undefined}
                        tileClassName="h-[92px] min-w-[180px] px-6 sm:h-[104px] sm:min-w-[220px] lg:min-w-[250px] lg:px-8"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isFeatured = variant === "featured";
  const visibleCredentials = isFeatured
    ? section.credentials.slice(0, 3)
    : section.credentials;

  if (isFeatured) {
    return (
      <section aria-label="Institutional affiliations and credentials" className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">{section.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl text-text-primary lg:text-3xl">{section.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-text-secondary">{section.description}</p>

          {section.logos.length ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:justify-start">
              {section.logos.map((logo) => (
                <LogoMarkup key={logo.id} logo={logo} maxHeightClassName="max-h-10" />
              ))}
            </div>
          ) : null}

          {visibleCredentials.length ? (
            <>
              {section.logos.length ? <div className="mt-12 border-t border-border-subtle" /> : null}
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {visibleCredentials.map((credential) => (
                  <FeaturedCredentialCard credential={credential} key={credential.id} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    );
  }

  const compactGridClassName =
    section.logos.length && visibleCredentials.length
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1";

  return (
    <section
      aria-label="Institutional affiliations and credentials"
      className="py-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-8 rounded-[28px] border border-border bg-bg-surface p-6 shadow-[var(--shadow-card)] lg:p-10",
            compactGridClassName,
            section.logos.length && visibleCredentials.length && "lg:grid-cols-[0.95fr_1.05fr]",
            !section.logos.length && "max-w-4xl"
          )}
        >
          <div className={cn("flex flex-col justify-center", !section.logos.length && "sr-only")}>
            <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">{section.eyebrow}</p>
            <h2 className="sr-only">{section.title}</h2>
            <p className="sr-only">{section.description}</p>
            {section.logos.length ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
                {section.logos.map((logo) => (
                  <LogoMarkup key={logo.id} logo={logo} maxHeightClassName="max-h-8" />
                ))}
              </div>
            ) : null}
          </div>

          {visibleCredentials.length ? (
            <div className="space-y-0">
              {visibleCredentials.map((credential) => (
                <CompactCredentialRow credential={credential} key={credential.id} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
