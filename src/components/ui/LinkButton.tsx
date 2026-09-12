import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent px-4 text-ink hover:bg-accent-hover",
  secondary: "border border-line-strong bg-ink-2/60 px-4 text-fg hover:border-fg-faint/60 hover:bg-ink-3",
  ghost: "px-3 text-fg-muted hover:bg-ink-2 hover:text-fg",
};

export function buttonClasses(variant: ButtonVariant = "secondary", className?: string) {
  return cx(
    "group inline-flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,translate] duration-200 active:translate-y-px",
    "[&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
    variants[variant],
    className,
  );
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  external?: boolean;
  children: ReactNode;
};

export function LinkButton({ variant = "secondary", external = false, className, children, ...rest }: LinkButtonProps) {
  return (
    <a
      className={buttonClasses(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
