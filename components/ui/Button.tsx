import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-deep shadow-soft hover:shadow-lift active:scale-[0.98]",
  secondary:
    "border border-border-strong bg-surface-elevated text-fg hover:border-fg/40 hover:bg-surface-subtle",
  ghost:
    "text-fg-muted hover:text-fg hover:bg-surface-subtle",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CommonProps;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...rest }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...rest} />
  ),
);
Button.displayName = "Button";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;

/**
 * A button that is a link.
 *
 * Internal destinations go through next/link, external ones through a plain
 * anchor. This is not a style preference: the site is deployed under a base
 * path (a GitHub Pages project site lives at /<repo>/), and only next/link
 * prepends it. A bare <a href="/join"> renders as /join and 404s on any
 * deployment that is not served from the domain root — which is how every
 * "Join ASME" button on the site broke while every nav link kept working.
 *
 * "Internal" means a path starting with a single "/". Protocol-relative
 * ("//host"), mailto:, tel:, absolute URLs and bare "#anchor" links are left
 * to the browser.
 */
const isInternal = (href?: string) =>
  typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "primary", size = "md", href, ...rest }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);
    if (isInternal(href)) {
      return <Link ref={ref} href={href as string} className={classes} {...rest} />;
    }
    return <a ref={ref} href={href} className={classes} {...rest} />;
  },
);
ButtonLink.displayName = "ButtonLink";
