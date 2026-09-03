import { type JSX, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Accepted and ignored. Kept so call sites do not all need editing. */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
};

/**
 * Renders its children. Nothing else.
 *
 * This used to fade content up as it scrolled into view. Two reasons it does
 * not any more. The design has no animation in it, and content that starts at
 * opacity 0 is invisible to anything that does not run JavaScript, which on a
 * site whose job is to be found is a real cost for a small flourish.
 *
 * Kept as a component rather than deleted so the section markup still reads the
 * same and a reveal can be reintroduced in one file if it is ever wanted.
 */
export function Reveal({ children, className, as = "div" }: Props) {
  const Tag = as as keyof JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}
