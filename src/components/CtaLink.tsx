import type { AnchorHTMLAttributes } from "react";

/** Visual style of a {@link CtaLink}. "outline" is for placement on dark surfaces. */
type CtaLinkVariant = "primary" | "secondary" | "outline";

/** Props accepted by {@link CtaLink}, forwarded to the underlying `a` element. */
type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: CtaLinkVariant;
};

const variantClasses: Record<CtaLinkVariant, string> = {
  primary: "bg-pine text-white hover:bg-ink dark:hover:bg-emerald-700",
  secondary:
    "bg-white text-ink ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800",
  outline: "bg-transparent text-white ring-1 ring-white/30 hover:bg-white/10"
};

/**
 * Call-to-action link styled like the FlowLedger app's `Button` component.
 * Renders as an anchor since every CTA on this landing page points to an
 * external route in the FlowLedger web app rather than to internal state.
 */
export function CtaLink({ className = "", variant = "primary", ...props }: CtaLinkProps) {
  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-6 py-2 text-sm font-semibold transition ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
