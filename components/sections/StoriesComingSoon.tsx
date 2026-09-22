import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import { storiesComingSoon } from "@/lib/content";

/**
 * The tease under the graduation address, for the interview series that is not
 * published yet.
 *
 * Three portrait placeholders, drawn rather than photographed. The brief asked
 * for blurred founders, but a blurred photograph is still the photograph: the
 * file ships whole and the face is one network request away, so a CSS blur
 * teases and leaks the same secret. These are gradients and a glyph, so there
 * is nothing to recover and nobody is implied to have agreed to anything.
 *
 * The mark in the right of the panel is the ASME petal, drawn as a mask over a
 * white wash rather than an <img>, so it tints with the panel instead of
 * carrying its own blue into a blue box.
 */
const MARK = {
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

export function StoriesComingSoon() {
  const mark = asset("/asme-mark.svg");

  return (
    <Reveal className="mt-12">
      <div
        className="relative overflow-hidden rounded-[var(--panel-radius)] px-6 py-10 md:px-12 md:py-14"
        style={{ backgroundColor: "rgb(var(--accent))" }}
      >
        {/* The faded petal, bleeding off the right edge. Decorative. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-12 h-64 w-64 bg-white/[0.13] md:-right-20 md:h-96 md:w-96"
          style={{ ...MARK, maskImage: `url(${mark})`, WebkitMaskImage: `url(${mark})` }}
        />
        {/* A second, smaller petal low on the right, so the corner reads as a
            considered field rather than one stamped logo. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-16 hidden h-40 w-40 bg-white/[0.07] md:block"
          style={{ ...MARK, maskImage: `url(${mark})`, WebkitMaskImage: `url(${mark})` }}
        />

        <div className="relative">
          <h3 className="h-display max-w-xl text-3xl leading-[1.08] text-white md:text-[2.6rem]">
            {storiesComingSoon.title}{" "}
            <strong className="font-semibold text-white">
              {storiesComingSoon.titleAccent}
            </strong>
          </h3>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85 pretty">
            {storiesComingSoon.body}
          </p>

          {/* Decorative: the heading above already says what these are, and
              three cards announcing "unrevealed" to a screen reader is noise. */}
          <ul
            aria-hidden="true"
            className="mx-auto mt-10 grid max-w-sm grid-cols-3 gap-2.5 sm:max-w-md sm:gap-5"
          >
            {storiesComingSoon.cards.map((field, i) => (
              <li
                key={field}
                className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-[rgb(var(--ink))]/45 p-1.5 ring-1 ring-inset ring-white/15 sm:p-3"
              >
                {/* The "portrait": two soft blooms, offset per card so the
                    three do not read as one repeated tile. */}
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(58% 42% at ${40 + i * 11}% ${28 + i * 5}%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(80% 60% at ${62 - i * 13}% ${90 - i * 4}%, rgba(8,18,48,0.6), transparent 74%)`,
                  }}
                />

                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-5xl font-semibold text-white/55 sm:text-6xl">
                    ?
                  </span>
                </span>

                <span className="relative block whitespace-nowrap rounded-full bg-white px-0.5 py-0.5 text-center text-[8px] font-semibold leading-tight tracking-tight text-[rgb(var(--ink))] sm:px-2.5 sm:py-1 sm:text-xs">
                  {field}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
