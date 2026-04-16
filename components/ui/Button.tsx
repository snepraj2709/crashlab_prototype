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

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-surface-strong bg-surface-strong text-text-on-strong shadow-soft hover:border-border-focus hover:bg-surface-shell active:translate-y-px",
  secondary:
    "border border-border-default bg-surface-panel text-text-default hover:border-border-focus hover:text-border-focus active:bg-surface-canvas",
  ghost:
    "border border-transparent bg-transparent text-text-default hover:bg-surface-panel hover:text-border-focus active:bg-surface-canvas",
  outline:
    "border border-border-default bg-transparent text-text-default hover:border-border-focus hover:text-border-focus active:bg-surface-canvas",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-sm",
  md: "h-11 px-5 text-sm md:text-base",
  lg: "h-12 px-6 text-base",
};

function getClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  return cn(
    "ui-focus-ring inline-flex items-center justify-center gap-2 rounded-token-pill font-medium transition duration-200",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:bg-bg-elevated disabled:text-text-tertiary disabled:shadow-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
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
        className={getClasses(variant, size, className)}
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
      className={getClasses(variant, size, className)}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});
