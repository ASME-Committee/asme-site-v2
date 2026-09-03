import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { Check, FileText, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { advocacyPillars, jointStatement, photos, racmaMou, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Driving Change",
  description:
    "ASME works to change the institutions that decide whether innovation, entrepreneurship and enterprise become a normal part of a clinical career: Australia's universities, training hospitals and colleges.",
};

export default function ChangingTheSystemPage() {
  // Resolve each signatory's logo to a real path only if the file exists;
  // otherwise the institution name renders as text. Lets logos land over time.
  const signatoryLogo = (logo?: string) =>
    logo && existsSync(join(process.cwd(), "public", logo)) ? logo : null;

  const statementIsPublished = existsSync(
    join(process.cwd(), "public", jointStatement.statementHref),
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="Driving Change"
        title={<>Changing the system <strong>from within.</strong></>}
        lead="Inspiring individual clinicians is half of what we do. The other half is here: changing the institutions that decide whether innovation, entrepreneurship and enterprise become a normal part of a clinical career. The universities that train clinicians, the hospitals they train in, and the colleges that certify them."
        cta={{ label: "Join ASME", href: site.joinPath }}
        secondaryCta={{ label: "Work with us on this", href: "/contact" }}
      />

      {/* The three institutions */}
      <section className="section relative">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Where we work</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              Three institutions decide whether this <strong>becomes mainstream.</strong>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {advocacyPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <article className="card flex h-full flex-col p-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                    {p.stage}
                  </span>
                  <h3 className="mt-3 font-display text-xl tracking-tight text-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{p.body}</p>
                  {p.proof && (
                    <p className="mt-auto flex items-start gap-2 pt-6 text-sm font-medium text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {p.proofHref ? (
                        <a
                          href={p.proofHref}
                          className="underline decoration-border underline-offset-4 transition-colors hover:text-brand-blue hover:decoration-brand-blue"
                        >
                          {p.proof}
                        </a>
                      ) : (
                        p.proof
                      )}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The colleges ask, and its proof. The universities pillar has the Joint
          Statement below; this is the equivalent for the colleges, and it is
          the first formal agreement of its kind, so it earns a panel. */}
      <section id="racma-mou">
        <Container>
          <Reveal className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={asset(photos.racmaMou.src)}
                  alt={photos.racmaMou.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-7">
              <p className="eyebrow">{racmaMou.eyebrow}</p>
              <h3 className="h-display mt-5 text-3xl md:text-[2.5rem]">
                {racmaMou.title} <strong>{racmaMou.titleAccent}</strong>
              </h3>
              {racmaMou.body.map((para) => (
                <p
                  key={para.slice(0, 24)}
                  className="mt-5 text-base leading-relaxed text-fg-muted pretty"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Joint Statement */}
      <section id="joint-statement" className="panel-tint scroll-mt-24">
        <Container>
          <Reveal>
            <div>
              <p className="eyebrow">{jointStatement.eyebrow}</p>
              <h3 className="h-display mt-5 max-w-3xl text-3xl md:text-[2.75rem]">
                {jointStatement.title} <strong>{jointStatement.titleAccent}</strong>
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted pretty">
                {jointStatement.intro}
              </p>

              <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
                {jointStatement.commitments.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-fg">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
                  Signed by
                </p>
                <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {jointStatement.signatories.map((s) => {
                    const logo = signatoryLogo(s.logo);
                    return (
                      <li key={s.institution} className="flex flex-col">
                        <div className="flex h-11 items-center">
                          {logo ? (
                            <Image
                              src={asset(logo)}
                              alt={s.institution}
                              width={200}
                              height={64}
                              /* The Monash and ANU crests carry a solid white
                                 field inside the shield, which reads as a white
                                 patch sitting on the tinted panel. Multiply
                                 blending drops that white to the panel colour
                                 and leaves the artwork alone, which is safer
                                 than editing white out of a university crest.
                                 The tint is barely off white, so the darkening
                                 it applies to the logos is imperceptible. */
                              className="h-auto w-auto max-h-[38px] max-w-[150px] object-contain object-left mix-blend-multiply"
                            />
                          ) : (
                            <p className="font-display text-base leading-tight tracking-tight text-fg">
                              {s.institution}
                            </p>
                          )}
                        </div>
                        <p className="mt-2.5 text-xs leading-snug text-fg-subtle">
                          {s.dean} &middot; {s.role}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 text-sm text-fg-subtle">{jointStatement.footnote}</p>

                {/* The signed statement carries six deans' signatures and is
                    held privately. The link appears only when the file is
                    actually present in public/, so putting the PDF back is the
                    single action that publishes it, and taking it out is the
                    single action that withdraws it. Nothing else on this panel
                    changes either way. */}
                {statementIsPublished && (
                  <a
                    href={asset(jointStatement.statementHref)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent-deep))]"
                  >
                    <FileText className="h-4 w-4" />
                    Read the full statement
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <JoinCTA />
    </PageShell>
  );
}
