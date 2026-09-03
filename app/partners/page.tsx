import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { partnerGroups, site, type PartnerOrg } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The organisations behind ASME: our Principal Industry Partner DBG Health, Supporting Industry Partners, Institutional Partners, and Ecosystem Collaborators — and how your organisation can partner with us.",
};

const partnerMailto = `mailto:${site.email}?subject=${encodeURIComponent("Partnering with ASME")}`;

/** A single partner: its logo, or a clean wordmark when no logo exists. Sits on
 *  the page background with no card of its own.
 *
 *  The cell is a grid cell now, not a fixed pixel box. Every logo in a row gets
 *  the same width and the same optical height, so a wide wordmark and a tall
 *  roundel read at the same weight and the row aligns on both axes. Only the
 *  height cap changes between the two variants: "industry" is the paying
 *  supporting tier, "wall" (institutional and ecosystem) stays restrained. The
 *  principal partner is not rendered here at all — see FeaturedPartner.
 */
function OrgLogo({ org, variant = "wall" }: { org: PartnerOrg; variant?: "industry" | "wall" }) {
  const cellHeight = variant === "industry" ? "h-24" : "h-20";
  // Both variants cap width and height rather than forcing one, so logos of
  // very different aspect ratios land at a comparable optical weight.
  const cap =
    variant === "industry"
      ? `h-auto w-auto ${org.logoClass ?? "max-h-[58px] max-w-[180px]"}`
      : `h-auto w-auto ${org.logoClass ?? "max-h-[52px] max-w-[170px]"}`;
  const textSize = variant === "wall" ? "text-base" : "text-xl";

  const inner = org.logo ? (
    <Image
      src={asset(org.logo)}
      alt={org.name}
      width={320}
      height={120}
      className={`object-contain ${cap}`}
    />
  ) : (
    <span className={`font-display ${textSize} tracking-tight text-fg-muted text-center balance`}>
      {org.name}
    </span>
  );

  // The paying tier reads at full strength; the wall dims slightly until hover.
  const emphasis =
    variant === "wall" ? "opacity-85 transition-opacity hover:opacity-100" : "opacity-100";
  const classes = `flex ${cellHeight} w-full items-center justify-center ${emphasis}`;

  if (!org.href) return <div className={classes}>{inner}</div>;
  return (
    <a
      href={org.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={org.name}
      className={classes}
    >
      {inner}
    </a>
  );
}

/**
 * The principal partner, given its own band.
 *
 * It used to render as one cell of a four-column grid at a slightly taller cap
 * than the supporting partners below it. That is a hierarchy you can measure
 * and cannot see: at a glance it read as the first of five industry logos with
 * a small line of text above. The principal partner is the only organisation
 * that pays to be alone in its tier, so it gets the whole width, a tinted
 * ground of its own, and a mark roughly three times the area of anything else
 * on the page.
 */
function FeaturedPartner({ org }: { org: PartnerOrg }) {
  const inner = org.logo ? (
    <Image
      src={asset(org.logo)}
      alt={org.name}
      width={720}
      height={280}
      className="h-[120px] w-auto max-w-full object-contain md:h-[184px]"
    />
  ) : (
    <span className="font-display text-3xl tracking-tight text-fg md:text-4xl">{org.name}</span>
  );

  if (!org.href) return <div className="flex items-center justify-center">{inner}</div>;
  return (
    <a
      href={org.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={org.name}
      className="flex items-center justify-center transition-opacity hover:opacity-80"
    >
      {inner}
    </a>
  );
}

export default function PartnersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Partners"
        title={<>Working together to <strong>transform healthcare.</strong></>}
        lead="ASME brings together industry, institutions, and ecosystem organisations with a shared commitment to improving healthcare through innovation, entrepreneurship, and enterprise. Here is who we partner with — and how your organisation can join them."
        cta={{ label: "Talk to us about partnering", href: "/contact#form" }}
        secondaryCta={{ label: `Email ${site.email}`, href: partnerMailto }}
      />

      {/* Tiered partner groups.
          Each tier reads top to bottom rather than left to right: the tier name
          and what the tier means run across the page, then the logos spread
          across the full width underneath. The previous version put the
          explanation in a narrow left rail and squeezed the logos into the
          remaining two-thirds, which left the lead partner floating in a wide
          empty band and made the whole page read as unfinished. */}
      <section id="who-we-partner-with">
        <Container className="space-y-16 md:space-y-24">
          {partnerGroups.map((group, gi) => (
            <Reveal key={group.tier} delay={gi === 0 ? 0 : 0.05}>
              <div className={gi === 0 ? "" : "border-t border-border pt-16 md:pt-20"}>
                {/* Tier header, across the page */}
                <div className="grid gap-x-12 gap-y-4 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <p className="eyebrow">{group.tagline}</p>
                    <h2 className="h-display mt-4 text-2xl md:text-[2rem]">{group.tier}</h2>
                  </div>
                  <p className="text-base leading-relaxed text-fg-muted pretty md:col-span-7 md:pt-9">
                    {group.description}
                  </p>
                </div>

                {/* Logos, across the page */}
                <div className="mt-12 space-y-10">
                  {group.subtiers.map((st, si) => {
                    const isIndustry = group.tier === "Industry Partners";

                    // The featured sub-tier is the principal partner. It gets a
                    // band of its own rather than a cell in the grid below.
                    if (st.featured) {
                      return (
                        <div
                          key={st.label ?? si}
                          className="border-b border-border pb-14 text-center md:pb-16"
                        >
                          {st.label && (
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
                              {st.label}
                            </p>
                          )}
                          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
                            {st.orgs.map((org) => (
                              <FeaturedPartner key={org.name} org={org} />
                            ))}
                          </div>
                        </div>
                      );
                    }

                    const variant = isIndustry ? "industry" : "wall";
                    return (
                      <div key={st.label ?? si}>
                        {st.label && (
                          <p className="mb-6 text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
                            {st.label}
                          </p>
                        )}
                        {/* One even grid per sub-tier. The lead partner is a
                            single wide cell so it is plainly the lead rather
                            than one logo stranded in a four-column row. */}
                        {/* Every sub-tier uses the same grid, so the lead
                            partner sits in the first cell of the same four
                            columns the supporting partners fill and lines up
                            with the logo directly beneath it. */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                          {st.orgs.map((org) => (
                            <OrgLogo key={org.name} org={org} variant={variant} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* The partner ask. Its own tinted panel rather than a box inside a white
          one: the page has just spent its length showing who is already here,
          and this is the one place it asks the reader to be next. */}
      <section id="partner-with-us" className="panel-tint">
        <Container>
          <Reveal className="md:flex md:items-end md:justify-between md:gap-12">
            <div className="max-w-xl">
              <p className="eyebrow">Get involved</p>
              <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
                Partner <strong>with ASME.</strong>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                Whether through financial support, program participation, or collaboration, there is
                a way for your organisation to help shape the future of clinician innovation in
                Australia. We would love to hear from you.
              </p>
            </div>
            <div className="mt-8 flex shrink-0 flex-col items-start gap-3 md:mt-0 md:items-end">
              <ButtonLink href="/contact#form" size="lg">
                Talk to us about partnering
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <a
                href={partnerMailto}
                className="text-sm font-medium text-[rgb(var(--accent))] underline-offset-4 hover:underline"
              >
                Or email {site.email}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
      <JoinCTA />
    </PageShell>
  );
}
