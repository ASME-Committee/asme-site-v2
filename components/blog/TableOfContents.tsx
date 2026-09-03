"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Item = { id: string; heading: string };

/**
 * Sticky article table of contents. Watches the section headings via
 * IntersectionObserver and highlights the section currently in view. Honours
 * prefers-reduced-motion (no smooth scroll on click).
 */
export function TableOfContents({ sections }: { sections: Item[] }) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav aria-label="Article contents" className="lg:sticky lg:top-28">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
        Contents
      </p>
      <ol className="mt-4 space-y-2 border-l border-border">
        {sections.map((s, i) => {
          const isActive = s.id === activeId;
          return (
            <li key={s.id} className="relative">
              {isActive && (
                <span
                  aria-hidden
                  className="absolute -left-px top-0 h-full w-px bg-brand-blue"
                />
              )}
              <a
                href={`#${s.id}`}
                className={cn(
                  "block py-1.5 pl-4 pr-2 text-sm leading-snug transition-colors",
                  isActive
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                <span className="mr-2 font-mono text-[0.7rem] tracking-wider text-fg-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.heading}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
