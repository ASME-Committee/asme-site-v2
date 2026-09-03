import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { People } from "@/components/sections/People";
import { FounderLetter } from "@/components/sections/FounderLetter";
import { BackedBy } from "@/components/sections/BackedBy";
import { visionPurpose, whoWeAre, goals, site, founderMessage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "ASME is a not-for-profit home for clinicians using their training to make an impact at scale through entrepreneurship and innovation. Why we were founded in 2023, our vision and purpose, and the people building it.",
};

export default function AboutPage() {
  // Show the real portrait once the file exists in public/people;
  // fall back to initials until then so no broken image ever renders.
  const founderPortrait =
    founderMessage.portrait &&
    existsSync(join(process.cwd(), "public", founderMessage.portrait))
      ? founderMessage.portrait
      : null;

  return (
    <PageShell>
      <PageHeader
        eyebrow="About ASME"
        title={<>Why we started, and <strong>who is building it.</strong></>}
        lead="ASME was founded in 2023 by a clinician who had built a healthcare business the hard way, without a roadmap or a community. This is the story, the people, and what we are working toward."
        cta={{ label: "Join ASME", href: site.joinPath }}
        secondaryCta={{ label: "Talk to us", href: "/contact" }}
      />

      {/* A message from the founder — opens the page: the personal "why" before
          the institutional vision. Collapses to a short preview by default. */}
      <section id="founder" className="panel-tint">
        <Container>
          <Reveal>
            <div>
              <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                {/* Portrait + attribution */}
                <div className="flex flex-col md:col-span-2 md:justify-center">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60 shadow-soft">
                    {founderPortrait ? (
                      <Image
                        src={asset(founderPortrait)}
                        alt={founderMessage.photoAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden
                        className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_30%,#2B58E0,#1B3FB4)] text-5xl font-semibold text-white"
                      >
                        {founderMessage.initials}
                      </div>
                    )}
                  </div>
                  <div className="mt-5">
                    <p className="font-display text-lg tracking-tight text-fg">
                      {founderMessage.name}
                    </p>
                    <p className="text-sm text-fg-subtle">{founderMessage.role}</p>
                  </div>
                </div>

                {/* Letter */}
                <div className="md:col-span-3">
                  <h2 className="h-display text-3xl tracking-tight md:text-4xl balance">
                    {founderMessage.title} <strong>{founderMessage.titleAccent}</strong>
                  </h2>

                  <blockquote className="mt-7 border-l-2 border-brand-blue pl-5 text-xl font-medium leading-snug text-fg balance md:text-2xl">
                    {founderMessage.pullQuote}
                  </blockquote>

                  <FounderLetter paragraphs={founderMessage.paragraphs} />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Who we are · Vision · Purpose · Goals */}
      <section id="mission" className="section relative">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Who we are</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">Why <strong>ASME exists.</strong></h2>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted pretty">
              {whoWeAre}
            </p>
          </Reveal>

          {/* Vision + Purpose */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal>
              <article className="card h-full p-8 md:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  Our vision
                </span>
                <p className="mt-4 text-xl leading-relaxed text-fg pretty">
                  {visionPurpose.vision}
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.06}>
              <article className="card h-full p-8 md:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  Our purpose
                </span>
                <p className="mt-4 text-xl leading-relaxed text-fg pretty">
                  {visionPurpose.purpose}
                </p>
              </article>
            </Reveal>
          </div>

          {/* Goals */}
          <div className="mt-4">
            <Reveal>
              <div className="card p-8 md:p-10">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  Our goals
                </span>
                <ol className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {goals.map((goal, i) => (
                    <li key={goal} className="flex gap-4">
                      <span className="font-display text-lg font-semibold tabular-nums text-brand-blue">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base leading-relaxed text-fg pretty">{goal}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <People />

      <BackedBy />

      <JoinCTA />
    </PageShell>
  );
}
