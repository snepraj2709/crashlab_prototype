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
  "relative box-border shrink-0 cursor-help overflow-hidden rounded-none opacity-70 transition-opacity hover:opacity-100 h-16 w-16 bg-transparent p-2 sm:h-[4.25rem] sm:w-[4.25rem] sm:p-2.5 lg:h-[5.25rem] lg:w-[5.25rem] lg:p-3";

const TRUST_SLOT_INNER =
  "flex size-full items-center justify-center [min-height:0] [min-width:0]";

const TRUST_MARQUEE_IMG =
  "logo-clean relative mx-auto block h-auto max-h-full w-auto max-w-full shrink-0 object-contain object-center";

const FEATURED_PILL =
  "inline-flex min-h-10 cursor-help shrink-0 items-center gap-2.5 whitespace-nowrap rounded-none border border-border bg-bg-secondary px-3 py-2 sm:min-h-[2.75rem] sm:gap-3 sm:px-4 sm:py-2";

function MarqueeSection(props: MarqueeSectionProps) {
  const { eyebrow, title, description, animationDuration = 28 } = props;

  const logoItems =
    props.kind === "logos" ? repeatMarqueeStrip(props.logos) : null;

  const venueItems =
    props.kind === "venues" ? repeatMarqueeStrip(props.venues) : null;

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

        <div className="trust-logo-slideshow mt-2 sm:mt-3">
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
                  className="trust-logo-slideshow__track items-center gap-5 sm:gap-6 lg:gap-8"
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
                          sizes="(min-width: 1024px) 5.25rem, (min-width: 640px) 4.25rem, 4rem"
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

          {props.kind === "venues" && venueItems ? (
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
                  className="trust-logo-slideshow__track items-center gap-3 sm:gap-4"
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
                          <span className="inline-flex h-7 w-8 shrink-0 items-center justify-center sm:h-8 sm:w-9">
                            <Image
                              alt=""
                              aria-hidden
                              className={cn(
                                "trust-logo-slideshow__image relative block max-h-[1.5rem] w-auto max-w-full object-contain object-center sm:max-h-[1.75rem]",
                                venue.logoTuning,
                              )}
                              height={42}
                              sizes="(min-width: 640px) 2rem, 1.75rem"
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
        </div>
      </div>
    </div>
  );
}

const supportedByLogos: LogoItem[] = [
  { name: "DST", src: "/logos/DST.svg" },
  { name: "ANRF", src: "/logos/ANRF.svg" },
  { name: "IndiaAI", src: "/logos/india_ai_summit.svg" },
  { name: "Koita Foundation", src: "/logos/koita-foundation.svg" },
  { name: "OpenAI", src: "/logos/openai.svg" },
  { name: "Google.org", src: "/logos/google-logo.svg" },
];

const collaborationLogos: LogoItem[] = [
  { name: "AIIMS Delhi", src: "/logos/AIIMS_Delhi.svg" },
  { name: "JIPMER", src: "/logos/jipmer.svg" },
  { name: "KMC Manipal", src: "/logos/kastubra_medical_college.svg" },
  { name: "Microsoft Research India", src: "/logos/microsoft.svg" },
  { name: "NIMHANS", src: "/logos/National_Institute_of_Mental_Health.svg" },
  { name: "Tata Memorial", src: "/logos/tmc.svg" },
  { name: "Harvard", src: "/logos/harvard-medical-school.svg" },
  { name: "Stanford", src: "/logos/stanford_university.svg" },
  { name: "Johns Hopkins", src: "/logos/john_hopkins.svg" },
  /** Spaces in pathname — encoded so both dev and prod static serving resolve reliably. */
  { name: "NUS", src: "/logos/National%20University%20of%20Singapore.svg" },
  { name: "EPFL", src: "/logos/EPFL.svg" },
  { name: "IIT Jodhpur", src: "/logos/IIT_jodhpur.svg" },
];

const featuredVenues: VenueItem[] = [
  { name: "RSNA 2025", logoSrc: "/logos/rsna.svg" },
  { name: "MICCAI 2025" },
  { name: "KCR 2025" },
  { name: "IJRI" },
  { name: "NEJM AI" },
  { name: "AOCR 2025" },
];

export function TrustSlidesSection(): React.ReactElement {
  return (
    <section aria-labelledby="trust-slides-heading">
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-6 lg:px-8 lg:pb-6 lg:pt-8">
        <h2
          className="mb-3 font-display text-xl font-semibold leading-tight text-text-primary sm:mb-4 sm:text-2xl lg:mb-5 lg:text-3xl"
          id="trust-slides-heading"
        >
          Built on Institutional Trust and Credibility
        </h2>

        <MarqueeSection
          animationDuration={22}
          description="Grants & Institutional Funding"
          eyebrow="Supported By"
          kind="logos"
          logos={supportedByLogos}
        />
        <MarqueeSection
          animationDuration={44}
          description="Researchers and clinical groups at these institutions have collaborated with Dr. Suvrankar Datta and CRASH Lab on published or ongoing work."
          eyebrow="In Collaboration With"
          kind="logos"
          logos={collaborationLogos}
        />
        <MarqueeSection
          animationDuration={20}
          description="Recent collaborative research of Dr. Suvrankar Datta and CRASH Lab has been published and presented at:"
          eyebrow="Featured At"
          kind="venues"
          venues={featuredVenues}
        />
      </div>
    </section>
  );
}
