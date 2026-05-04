import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type LogoItem = {
  name: string;
  src: string;
  /**
   * Optical tuning only — does not replace fixing SVG viewBox / source padding.
   * Tailwind `scale-*` + `origin-center` to even perceived size in the marquee.
   */
  tuning?: string;
};

type VenueItem = {
  name: string;
  logoSrc?: string;
  logoTuning?: string;
};

type MarqueeSectionProps = {
  eyebrow: string;
  title?: string;
  description?: string;
  animationDuration?: number;
  direction?: "left" | "right" | "static";
} & (
  | { kind: "logos"; logos: LogoItem[] }
  | { kind: "venues"; venues: VenueItem[] }
);

/** Must match `trustLogoMarquee` in `globals.css`: `translate3d(calc(-100% / N))`. */
const MARQUEE_SEGMENT_REPEAT = 6;

function repeatMarqueeStrip<T>(items: readonly T[]): T[] {
  return Array.from({ length: MARQUEE_SEGMENT_REPEAT }, () => [...items]).flat();
}

/**
 * Square slots with inner padding → centered `object-contain` reads as aligned row
 * (same optical baseline; wide marks scale down uniformly).
 */
const TRUST_MARQUEE_SLOT =
  "relative box-border shrink-0 cursor-help overflow-hidden rounded-none opacity-70 transition-opacity hover:opacity-100 h-[5.25rem] w-[5.25rem] bg-transparent p-2.5 sm:h-[6.5rem] sm:w-[6.5rem] sm:p-3 lg:h-[7.75rem] lg:w-[7.75rem] lg:p-3.5";

const TRUST_SLOT_INNER =
  "flex size-full items-center justify-center [min-height:0] [min-width:0]";

const TRUST_MARQUEE_IMG =
  "logo-clean relative mx-auto block h-auto max-h-full w-auto max-w-full shrink-0 object-contain object-center";

const FEATURED_PILL =
  "inline-flex min-h-11 cursor-help shrink-0 items-center gap-2.5 whitespace-nowrap rounded-none border border-border bg-bg-secondary px-3 py-2 sm:min-h-[3.125rem] sm:gap-3 sm:px-4 sm:py-2";

function MarqueeSection(props: MarqueeSectionProps) {
  const { eyebrow, title, description, animationDuration = 28, direction = "left" } = props;

  const isStatic = direction === "static";

  const logoItems =
    props.kind === "logos" && !isStatic ? repeatMarqueeStrip(props.logos) : null;

  const venueItems =
    props.kind === "venues" && !isStatic ? repeatMarqueeStrip(props.venues) : null;

  return (
    <div
      aria-label={eyebrow}
      className="border-b border-border py-3 last:border-b-0 sm:py-4 lg:py-5"
      role="group"
    >
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary sm:text-xs sm:tracking-[0.22em]">
          {eyebrow}
        </p>
        {title ? (
          <h3 className="mt-1 font-display text-xl text-text-primary sm:mt-1.5 sm:text-2xl lg:text-3xl">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="mt-1 max-w-4xl text-xs leading-snug text-text-secondary sm:mt-1.5 sm:text-sm sm:leading-relaxed lg:text-base lg:leading-snug">
            {description}
          </p>
        ) : null}

        <div className={cn(isStatic ? "mt-6 sm:mt-8" : "mt-2 sm:mt-3 trust-logo-slideshow")}>
          {props.kind === "logos" && logoItems ? (
            <>
              <div className="sr-only">
                <ul>
                  {props.logos.map((logo) => (
                    <li key={logo.name}>{logo.name}</li>
                  ))}
                </ul>
              </div>
              <div className="trust-logo-slideshow__viewport">
                <div
                  className={cn(
                    "trust-logo-slideshow__track items-center gap-7 sm:gap-9 lg:gap-11",
                    direction === "right" && "trust-logo-slideshow__track--reverse",
                  )}
                  style={{ animationDuration: `${animationDuration}s` }}
                >
                  {logoItems.map((logo, index) => (
                    <div
                      aria-hidden={index >= props.logos.length || undefined}
                      className={TRUST_MARQUEE_SLOT}
                      key={`${logo.name}-${index}`}
                      title={logo.name}
                    >
                      <div className={TRUST_SLOT_INNER}>
                        <Image
                          alt={index < props.logos.length ? logo.name : ""}
                          aria-hidden={index >= props.logos.length ? "true" : undefined}
                          className={cn(TRUST_MARQUEE_IMG, logo.tuning)}
                          height={256}
                          loading="lazy"
                          sizes="(min-width: 1024px) 7.75rem, (min-width: 640px) 6.5rem, 5.25rem"
                          src={logo.src}
                          unoptimized={/\.svg($|\?)/i.test(logo.src)}
                          width={256}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {props.kind === "venues" && !isStatic && venueItems ? (
            <>
              <div className="sr-only">
                <ul>
                  {props.venues.map((v) => (
                    <li key={v.name}>{v.name}</li>
                  ))}
                </ul>
              </div>
              <div className="trust-logo-slideshow__viewport">
                <div
                  className={cn(
                    "trust-logo-slideshow__track items-center gap-5 sm:gap-6",
                    direction === "right" && "trust-logo-slideshow__track--reverse",
                  )}
                  style={{ animationDuration: `${animationDuration}s` }}
                >
                  {venueItems.map((venue, index) => (
                    <div
                      aria-hidden={index >= props.venues.length || undefined}
                      className="inline-flex shrink-0 items-center"
                      key={`${venue.name}-${index}`}
                    >
                      <div className={cn(FEATURED_PILL)} title={venue.name}>
                        {venue.logoSrc ? (
                          <span className="inline-flex h-10 w-11 shrink-0 items-center justify-center sm:h-11 sm:w-12">
                            <Image
                              alt=""
                              aria-hidden
                              className={cn(
                                "trust-logo-slideshow__image relative block max-h-[2.125rem] w-auto max-w-full object-contain object-center sm:max-h-[2.375rem]",
                                venue.logoTuning,
                              )}
                              height={42}
                              sizes="(min-width: 640px) 2.375rem, 2.125rem"
                              src={venue.logoSrc}
                              unoptimized={venue.logoSrc.endsWith(".svg")}
                              width={120}
                            />
                          </span>
                        ) : null}
                        <span className="self-center font-semibold text-text-primary leading-none text-xs sm:text-sm">
                          {venue.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {props.kind === "venues" && isStatic ? (
            <ul className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {props.venues.map((venue) => (
                <li className="group relative inline-flex shrink-0 cursor-help" key={venue.name}>
                  {venue.logoSrc ? (
                    <>
                      <div className="relative h-12 w-32 sm:h-14 sm:w-36">
                        <Image
                          alt={venue.name}
                          fill
                          className={cn("object-contain object-center", venue.logoTuning)}
                          sizes="(min-width: 640px) 9rem, 8rem"
                          src={venue.logoSrc}
                          unoptimized={venue.logoSrc.endsWith(".svg")}
                        />
                      </div>
                      <span className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900/90 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        {venue.name}
                      </span>
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const supportedByLogos: LogoItem[] = [
  { name: "DST", src: "/logos/DST_clean.png" },
  { name: "ANRF", src: "/logos/ANRF_clean.png" },
  { name: "IndiaAI", src: "/logos/india_ai_summit_clean.png" },
  { name: "Koita Foundation", src: "/logos/koita-foundation_clean.png" },
  { name: "OpenAI", src: "/logos/openai_clean.png" },
  { name: "Google.org", src: "/logos/google-logo_clean.png" },
];

const collaborationLogos: LogoItem[] = [
  { name: "AIIMS Delhi", src: "/logos/AIIMS_Delhi_clean.png" },
  { name: "JIPMER", src: "/logos/jipmer_clean.png" },
  { name: "KMC Manipal", src: "/logos/KMCMAHEMANIPAL.png" },
  { name: "Microsoft Research India", src: "/logos/microsoft-research-india.png" },
  { name: "NIMHANS", src: "/logos/National_Institute_of_Mental_Health.svg" },
  { name: "Tata Memorial", src: "/logos/tmc.svg" },
  { name: "Harvard University", src: "/logos/harvard-university.svg" },
  { name: "Stanford", src: "/logos/stanford_university.svg" },
  { name: "Johns Hopkins", src: "/logos/johns_hopkins_clean.png" },
  { name: "NUS", src: "/logos/nus-logo-blue_vertical.png" },
  { name: "EPFL", src: "/logos/EPFL.svg" },
  { name: "IIT Jodhpur", src: "/logos/IIT_jodhpur_clean.png" },
];

const featuredVenues: VenueItem[] = [
  { name: "RSNA 2025", logoSrc: "/logos/rsna.svg" },
  { name: "MICCAI 2025", logoSrc: "/logos/miccai.svg" },
  { name: "KCR 2025", logoSrc: "/logos/kcr.svg" },
  { name: "IJRI", logoSrc: "/logos/ijri.svg" },
  { name: "NEJM AI", logoSrc: "/logos/nejm-ai.png" },
  { name: "AOCR 2025", logoSrc: "/logos/aocr-2025.webp" },
];

export function TrustSlidesSection(): React.ReactElement {
  return (
    <section aria-labelledby="trust-slides-heading">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-6 lg:px-8 lg:pb-6 lg:pt-8">
        <h2
          className="mb-3 font-display text-4xl text-text-primary sm:mb-4 lg:mb-5 lg:text-5xl"
          id="trust-slides-heading"
        >
          Built on Institutional Trust and Credibility
        </h2>

        <MarqueeSection
          animationDuration={22}
          description="Grants & Institutional Funding"
          direction="left"
          eyebrow="Supported By"
          kind="logos"
          logos={supportedByLogos}
        />
        <MarqueeSection
          animationDuration={44}
          description="Researchers and clinical groups at these institutions have collaborated with Dr. Suvrankar Datta and CRASH Lab on published or ongoing work."
          direction="right"
          eyebrow="In Collaboration With"
          kind="logos"
          logos={collaborationLogos}
        />
        <MarqueeSection
          description="Recent collaborative research of Dr. Suvrankar Datta and CRASH Lab has been published and presented at:"
          direction="static"
          eyebrow="Featured At"
          kind="venues"
          venues={featuredVenues}
        />
      </div>
    </section>
  );
}
