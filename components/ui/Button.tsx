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
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children" | "href"> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

export type ButtonProps = NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-cyan text-slate-950 shadow-glow hover:bg-cyan-300 focus-visible:ring-accent-cyan",
  secondary:
    "border border-border bg-bg-surface text-text-primary hover:border-accent-cyan hover:text-accent-cyan focus-visible:ring-accent-cyan",
  ghost:
    "text-text-primary hover:bg-white/5 hover:text-accent-cyan focus-visible:ring-accent-cyan",
  outline:
    "border border-white/20 bg-transparent text-white hover:border-accent-cyan hover:text-accent-cyan focus-visible:ring-accent-cyan"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm md:text-base",
  lg: "h-12 px-6 text-base"
};

function getClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { children, className, size = "md", variant = "primary", ...props },
    ref
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
  }
);
