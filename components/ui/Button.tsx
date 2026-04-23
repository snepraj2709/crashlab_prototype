import Link from "next/link";
import { forwardRef } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

type NativeButtonProps = BaseButtonProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children" | "href"
  > &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  >;

export type ButtonProps = NativeButtonProps;

const controlVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-surface-strong bg-surface-strong text-text-on-strong hover:border-border-focus hover:bg-surface-shell active:translate-y-px",
  secondary:
    "border border-border-default bg-surface-panel text-text-default hover:border-border-focus hover:text-border-focus active:bg-surface-canvas",
  ghost:
    "border border-transparent bg-transparent text-text-default hover:bg-surface-panel hover:text-border-focus active:bg-surface-canvas",
  outline:
    "border border-border-default bg-transparent text-text-default hover:border-border-focus hover:text-border-focus active:bg-surface-canvas",
};

const linkVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-navy-800 bg-navy-800 text-text-on-strong hover:border-[#f6f4ee] hover:bg-navy-800 hover:shadow-[0_0_0_3px_#fafaf8,0_0_0_6px_#5c7a8f]",
  secondary:
    "border border-[#b7bec6] bg-surface-panel text-text-primary hover:border-[#f6f4ee] hover:bg-navy-800 hover:text-text-on-strong hover:shadow-[0_0_0_3px_#fafaf8,0_0_0_6px_#5c7a8f]",
  ghost:
    "border border-transparent bg-transparent text-text-default hover:bg-surface-panel hover:text-border-focus active:bg-surface-canvas",
  outline:
    "border border-border-default bg-transparent text-text-default hover:border-border-focus hover:text-border-focus active:bg-surface-canvas",
};

const controlSizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-11 px-5 text-sm md:text-base",
  lg: "h-12 px-6 text-base",
};

const linkSizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-5 text-sm md:text-base",
  lg: "h-[58px] px-7 text-base sm:px-9 sm:text-[1.05rem]",
};

function getClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  isLink: boolean,
  className?: string,
): string {
  return cn(
    "ui-focus-ring inline-flex items-center justify-center gap-2 rounded-token-pill font-medium transition duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:bg-bg-elevated disabled:text-text-tertiary disabled:opacity-60",
    isLink ? linkVariantClasses[variant] : controlVariantClasses[variant],
    isLink ? linkSizeClasses[size] : controlSizeClasses[size],
    className,
  );
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { children, className, size = "md", variant = "primary", ...props },
  ref,
): React.ReactElement {
  if (props.href) {
    const { href, target, rel, ...linkProps } = props;

    return (
      <Link
        className={getClasses(variant, size, true, className)}
        href={href}
        rel={rel}
        target={target}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...props}
      className={getClasses(variant, size, false, className)}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});
