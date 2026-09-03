import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { doors, doorsIntro } from "@/lib/content";

/**
 * One marker per door, in palette order. The doors are a progression (has not
 * started, is building, has built and is giving back), so the colour running
 * from the blue through to the green carries the same idea the copy does.
 */
const markers = [
  "bg-[rgb(var(--accent))]",
  "bg-[rgb(var(--accent-light))]",
  "bg-[rgb(var(--give))]",
];

/**
 * The first two doors are people asking for help; the third is a person
 * offering it, and the page has to show that before the copy is read.
 *
 * The first two are rows in a list. The third is a dark blue block, because the
 * difference it marks is not a third option in a menu — it is the other side of
 * the exchange. Everything the site asks of a contributor is dark blue and
 * green: this, and the closing panel. Colouring the words instead was tried and
 * failed; green cannot be text on white at 1.25:1, and darkening it produced a
 * colour that read as neither the brand green nor a deliberate choice.
 *
 * It is also the audience the site was worst at reaching. Doors one and two are
 * served by most of the page. Door three is the supply every promise on it
 * depends on, and it was the quietest thing in the block.
 */
const isContribution = (i: number) => i === 2;

const titleTone = [
  "text-fg group-hover:text-[rgb(var(--accent))]",
  "text-fg group-hover:text-[rgb(var(--accent))]",
  "text-white",
];
const bodyTone = ["text-fg-muted", "text-fg-muted", "text-white/75"];
const ctaTone = [
  "text-[rgb(var(--accent))]",
  "text-[rgb(var(--accent))]",
  "text-white underline decoration-2 decoration-[rgb(var(--give))] underline-offset-4",
];

/**
 * Three ways in: the home page's routing block.
 *
 * Deliberately rendered as stacked rows rather than a card grid. `WhatWeDo`
 * sits directly above it as a four-card grid, and two grids in a row read as
 * two competing menus. Rows keep the delineation visible: the section above is
 * what ASME does, this one is who it does it for.
 */
export function ThreeDoors() {
  return (
    <section id="ways-in" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{doorsIntro.eyebrow}</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Three <strong>ways in.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            {doorsIntro.sub}
          </p>
        </Reveal>

        <ul className="mt-12">
          {doors.map((door, i) => (
            <Reveal key={door.id} delay={i * 0.06}>
              <li className={isContribution(i) ? "mt-8" : "border-t border-border"}>
                <Link
                  href={door.href}
                  className={`group flex flex-col gap-4 transition-colors md:flex-row md:items-start md:gap-10 ${
                    isContribution(i)
                      ? // The block bleeds out to the panel's inner edge by
                        // exactly its own padding, so the green bar and the
                        // heading start on the same left edge as the two rows
                        // above. Padded without the bleed, the whole door sat
                        // indented and read as a sub-item of door two.
                        "-mx-6 rounded-[var(--panel-radius)] bg-[rgb(var(--ink))] px-6 py-8 md:-mx-10 md:items-center md:px-10 md:py-9"
                      : "py-8"
                  }`}
                >
                  <div className="flex flex-1 gap-5">
                    <span
                      aria-hidden
                      className={`mt-1.5 h-7 w-1 shrink-0 rounded-full ${markers[i] ?? markers[0]}`}
                    />
                    <div>
                    <h3
                      className={`font-display text-xl tracking-tight transition-colors balance md:text-2xl ${titleTone[i] ?? titleTone[0]}`}
                    >
                      {door.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-2xl text-base leading-relaxed pretty ${bodyTone[i] ?? bodyTone[0]}`}
                    >
                      {door.body}
                    </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 pt-1 text-sm font-medium md:pt-2 ${ctaTone[i] ?? ctaTone[0]}`}
                  >
                    {door.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
