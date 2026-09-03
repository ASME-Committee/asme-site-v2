import Image from "next/image";
import { Container } from "@/components/ui/Container";
import {
  ecosystemPartners,
  principalPartner,
  principalPartnerLabel,
  supportingPartners,
  type Partner,
} from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * The partner wall. A static grid, not a marquee: the scrolling version was
 * motion for its own sake, and a visitor scanning for their own hospital could
 * not stop it to look.
 *
 * Logos render in their own colours. Greyscaling them kept the page tidy but
 * made the wall the quietest thing on it, and these are the organisations whose
 * names do the credibility work: a clinician scanning for their own hospital
 * should find it by its mark, not by reading fifteen grey wordmarks.
 *
 * The principal industry partner sits above the wall rather than inside it. In
 * a single even grid every logo says the same thing, which is exactly what the
 * principal partner has paid for it not to say. Separating it is the only way
 * the tier is visible at a glance, and a glance is all a logo wall gets.
 *
 * It stands on the panel with a rule under it rather than on a tinted band of
 * its own. A coloured block around a single logo reads as an advertisement
 * placed on the page; size, air and a divider say "first among these" without
 * borrowing that shape.
 */
export function Partners() {
  return (
    <section id="partners">
      <Container>
        <p className="eyebrow">Australia&rsquo;s healthcare innovation ecosystem</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-fg-muted pretty">
          The hospitals, universities, colleges, research institutes and industry
          working with us to make clinician-led innovation part of how healthcare
          runs.
        </p>

        {principalPartner && (
          <div className="mt-12 border-b border-border pb-12 text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
              {principalPartnerLabel}
            </p>
            <div className="mt-7 flex justify-center">
              <PartnerMark
                partner={principalPartner}
                className="h-[104px] w-auto max-w-full object-contain md:h-[140px]"
              />
            </div>
          </div>
        )}

        {/* The paying tier below the principal partner, on a line of its own.
            In one fifteen-logo grid they shared a row with the university that
            opens the institutional tier, which read as no tier at all. Slightly
            larger than the wall beneath, so the three sizes on this section run
            in the same order as the tiers do. */}
        <ul className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4">
          {supportingPartners.map((p) => (
            <li key={p.name} className="flex h-16 items-center justify-center">
              <PartnerMark
                partner={p}
                className="max-h-14 w-auto object-contain opacity-95 transition-opacity duration-200 hover:opacity-100"
              />
            </li>
          ))}
        </ul>

        <ul className="mt-14 grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {ecosystemPartners.map((p) => (
            <li key={p.name} className="flex h-16 items-center justify-center">
              <PartnerMark
                partner={p}
                className="max-h-12 w-auto object-contain opacity-90 transition-opacity duration-200 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * One logo. A link when the organisation has a site, a plain image when it does
 * not.
 *
 * The wall used to fall back to `href="#"` for orgs without a URL, which
 * rendered a logo that looked clickable, went nowhere, and put a dead stop in
 * the keyboard tab order.
 */
function PartnerMark({ partner, className }: { partner: Partner; className: string }) {
  const img = (
    <Image
      src={asset(partner.logo)}
      alt={partner.name}
      width={640}
      height={240}
      className={className}
    />
  );

  if (!partner.href) return img;
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className="inline-flex items-center justify-center"
    >
      {img}
    </a>
  );
}
