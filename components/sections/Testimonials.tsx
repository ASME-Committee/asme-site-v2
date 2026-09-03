"use client";

import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/cn";

/** Initial discs. The old coral came from the previous palette and had no
 *  meaning here; all three now sit inside the ASME blue family so a wall of
 *  quotes reads as one thing rather than three categories. */
const accentBg: Record<Testimonial["accent"], string> = {
  blue: "bg-[rgb(var(--accent-deep))]",
  coral: "bg-[rgb(var(--accent-light))]",
  "soft-blue": "bg-[rgb(var(--accent))]",
};

export function Testimonials() {
  return (
    <section id="testimonials">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">AUSCEP alumni</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            What the program <strong>actually changed.</strong>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.04}>
                <figure className="group flex h-full flex-col">
                  <Quote className="h-4 w-4 text-[rgb(var(--accent))]/40 transition-transform duration-500 group-hover:text-[rgb(var(--accent))]" aria-hidden />
                  <blockquote className="mt-3 text-sm leading-relaxed text-fg pretty">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2.5 border-t border-border pt-4">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-semibold tracking-tight shadow-soft transition-transform duration-300 ",
                        accentBg[t.accent],
                      )}
                      aria-hidden
                    >
                      {t.initials}
                    </span>
                    <span>
                      <span className="block text-[0.8125rem] font-semibold text-fg">{t.name}</span>
                      <span className="block text-xs text-fg-subtle">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
