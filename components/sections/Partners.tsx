import Image from "next/image";
import { Container } from "@/components/ui/Container";
import {
  institutionalPartners,
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

        <div className="mt-12 text-center">
          <TierLabel>Industry Partners</TierLabel>
        </div>

        {principalPartner && (
          <div className="mt-8 border-b border-border pb-12 text-center">
            <TierLabel>{principalPartnerLabel}</TierLabel>
            <div className="mt-7 flex justify-center">
              <PartnerMark
                partner={principalPartner}
                className="h-auto w-auto max-h-[104px] max-w-full object-contain md:max-h-[140px]"
              />
            </div>
          </div>
        )}

        <ul className="mt-12 grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-4">
          {supportingPartners.map((p) => (
            <li key={p.name} className="flex h-16 items-center justify-center">
              <PartnerMark
                partner={p}
                className="h-auto w-auto max-h-14 max-w-[170px] object-contain opacity-95 transition-opacity duration-200 hover:opacity-100"
              />
            </li>
          ))}
        </ul>

        {/* The institutional tier, named. Ecosystem collaborators are not here
            on purpose: they are peers rather than backers, and dropping them
            lets these logos sit large enough to actually be read. */}
        <div className="mt-16 border-t border-border pt-12 text-center">
          <TierLabel>Institutional Partners</TierLabel>
          <ul className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-4">
            {institutionalPartners.map((p) => (
              <li key={p.name} className="flex h-20 items-center justify-center">
                <PartnerMark
                  partner={p}
                  className="h-auto w-auto max-h-16 max-w-[185px] object-contain opacity-95 transition-opacity duration-200 hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </div>

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
  /* Sizes must come from `h-auto w-auto` plus caps, the way the Partners page
     does it. Capping height alone leaves next/image's own width and height
     attributes governing the box, so the element renders very wide and short
     and `object-contain` letterboxes the artwork inside it: small, centred, and
     surrounded by empty space. RACMA showed it worst and read as missing.

     The per-logo sizing hint from the content file was also being dropped, so
     every mark was capped by height alone. Logos whose artwork carries generous
     internal padding, RACMA's especially, then rendered small and pale beside
     neighbours that fill their box, and read as missing rather than present.
     The Partners page has always applied this hint; the home wall now does too. */
  const img = (
    <Image
      src={asset(partner.logo)}
      alt={partner.name}
      width={640}
      height={240}
      className={partner.className ? `${className} ${partner.className}` : className}
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

/** The label above a tier. Small, in the accent, the same treatment the
 *  principal partner already carried: the tiers were visible only as three
 *  shrinking logo sizes, which asks a visitor to infer a hierarchy nobody
 *  spelled out. */
function TierLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
      {children}
    </p>
  );
}
