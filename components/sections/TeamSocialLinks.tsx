import { Globe, GraduationCap, Linkedin } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { XIcon } from "@/components/ui/XIcon";
import type { SocialLinks } from "@/types/team";

function ResearchGateIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M4 18V6h6.25c2.72 0 4.4 1.42 4.4 3.82 0 1.76-.92 2.98-2.5 3.48l3.02 4.7h-3.4l-2.6-4.2H7.08V18H4Zm3.08-6.72h2.68c1.18 0 1.9-.52 1.9-1.44 0-.94-.72-1.48-1.9-1.48H7.08v2.92Z"
        fill="currentColor"
      />
      <path
        d="M16.1 18c-1.85 0-3.1-1.16-3.1-2.9 0-1.82 1.4-3.02 3.52-3.02.7 0 1.32.08 1.82.22v-.32c0-.98-.66-1.58-1.78-1.58-.88 0-1.78.28-2.6.84v-2.18c.86-.46 1.94-.7 3.18-.7 2.56 0 4.12 1.28 4.12 3.56V18h-2.64v-.8c-.62.56-1.48.8-2.52.8Zm.82-1.92c.9 0 1.6-.46 1.6-1.14v-.62a4.12 4.12 0 0 0-1.3-.2c-.92 0-1.48.38-1.48 1 0 .58.46.96 1.18.96Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface SocialLinkItem {
  key: keyof SocialLinks;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const socialLinkItems: SocialLinkItem[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "twitter", label: "X", icon: XIcon },
  { key: "googleScholar", label: "Google Scholar", icon: GraduationCap },
  { key: "personalWebsite", label: "Personal Website", icon: Globe },
  { key: "researchgate", label: "ResearchGate", icon: ResearchGateIcon }
];

interface TeamSocialLinksProps {
  name: string;
  socialLinks?: SocialLinks;
  className?: string;
  variant?: "default" | "compact";
}

export function TeamSocialLinks({
  name,
  socialLinks,
  className,
  variant = "default"
}: TeamSocialLinksProps): React.ReactElement | null {
  const links = socialLinkItems.flatMap((item) => {
    const href = socialLinks?.[item.key];

    return href
      ? [
          {
            href,
            icon: item.icon,
            key: item.key,
            label: item.label
          }
        ]
      : [];
  });

  if (!links.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center",
        variant === "compact" ? "justify-center gap-3" : "gap-2",
        className
      )}
      role="list"
    >
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <a
            aria-label={`${name} on ${link.label}`}
            className={cn(
              "ui-focus-ring-panel inline-flex items-center justify-center border border-border-default text-text-muted transition hover:border-border-focus hover:text-border-focus",
              variant === "compact"
                ? "h-9 w-9 rounded-full bg-surface-canvas"
                : "h-11 w-11 rounded-token-pill bg-surface-panel"
            )}
            href={link.href}
            key={link.key}
            rel="noreferrer"
            role="listitem"
            target="_blank"
            title={link.label}
          >
            <Icon className={variant === "compact" ? "h-3.5 w-3.5" : "h-4 w-4"} />
          </a>
        );
      })}
    </div>
  );
}
