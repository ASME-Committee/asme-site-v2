import { AsmeMark } from "@/components/ui/AsmeMark";
import { cn } from "@/lib/cn";

/**
 * The ASME lockup: mark plus wordmark, one colour, one weight.
 *
 * Replaces a flat PNG of the old four-colour artwork. Three reasons this is
 * live type and vector rather than an image:
 *
 *   - Colour. The whole lockup inherits `currentColor`, so it reverses to
 *     white on a blue panel without a second asset, and the dark-mode white
 *     pill that used to sit behind the PNG is no longer needed.
 *   - Weight. The wordmark was set in two weights and two colours. It is now
 *     Manrope SemiBold throughout, which is the change this was made for.
 *   - Size. One font-size drives everything. Every dimension below is in `em`,
 *     taken from the master artwork and divided by its 40.74pt type size, so
 *     the lockup keeps the artwork's exact proportions at any scale.
 *
 * The wordmark is real text, so it is selectable, searchable, and read aloud
 * correctly. The `alt` job is done by the sr-only full name in the anchor that
 * wraps this in the nav.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-[10.9px] text-brand-blue md:text-[13.8px]",
        className,
      )}
    >
      <AsmeMark className="h-[4.052em] w-[4.052em]" />
      <span className="ml-[0.933em] font-brand font-semibold leading-[1.047] tracking-[0]">
        Australian
        <br />
        Society for Medical
        <br />
        Entrepreneurship
        <br />
        &amp; Innovation
      </span>
    </span>
  );
}
