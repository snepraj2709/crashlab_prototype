import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
}

export function BrandMark({
  className,
  compact = false,
  onClick
}: BrandMarkProps): React.ReactElement {
  return (
    <Link
      className={cn(
        "ui-focus-ring inline-flex items-center gap-3.5 rounded-token-sm",
        compact ? "gap-3" : "gap-3.5",
        className
      )}
      href="/"
      onClick={onClick}
    >
      <span className={cn("relative shrink-0", compact ? "h-10 w-10" : "h-11 w-11")}>
        <Image
          alt=""
          aria-hidden="true"
          className="brand-mark__logo brand-mark__logo--light object-contain"
          fill
          sizes={compact ? "40px" : "44px"}
          src="/logo.svg"
        />
        <Image
          alt=""
          aria-hidden="true"
          className="brand-mark__logo brand-mark__logo--dark object-contain"
          fill
          sizes={compact ? "40px" : "44px"}
          src="/logo-white.svg"
        />
      </span>

      <span
        className={cn(
          "font-semibold uppercase leading-none tracking-[-0.04em] text-text-default",
          compact ? "text-xl" : "text-[2rem]"
        )}
      >
        Crash Lab
      </span>
    </Link>
  );
}
