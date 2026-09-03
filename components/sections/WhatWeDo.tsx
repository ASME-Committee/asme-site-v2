import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { whatWeDo } from "@/lib/content";
import { ArrowUpRight, Compass, Network, Sparkles, Route } from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  network: <Network className="h-4 w-4" />,
  compass: <Compass className="h-4 w-4" />,
  spark: <Sparkles className="h-4 w-4" />,
  path: <Route className="h-4 w-4" />,
};

/**
 * What ASME does. Two columns rather than four: at this measure four made each
 * blurb about six words wide and the section read as a wall of narrow text.
 *
 * Items are divided by rules, not boxed as cards. The panel is already the
 * container, so a grid of bordered cards inside it would be a second frame
 * around content that is already framed.
 */
export function WhatWeDo() {
  return (
    <section id="what">
      <Container>
        <p className="eyebrow">What we do</p>
        <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
          Four ways <strong>ASME helps.</strong>
        </h2>

        <div className="mt-10 grid border-t border-border sm:grid-cols-2">
          {whatWeDo.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col gap-3 border-b border-border py-7 pr-8 sm:odd:border-r sm:odd:pr-10 sm:even:pl-10"
            >
              <div className="flex items-center gap-3">
                <span className="glyph-chip">{iconMap[item.glyph]}</span>
                <h3 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-[rgb(var(--accent))]">
                  {item.title}
                </h3>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-[rgb(var(--accent))]" />
              </div>
              <p className="text-sm leading-relaxed text-fg-muted pretty">
                {item.blurb}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
