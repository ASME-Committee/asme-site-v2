import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Sparc } from "@/components/sections/Sparc";
import { Auscep } from "@/components/sections/Auscep";
import { Testimonials } from "@/components/sections/Testimonials";
import { programsList, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "The Clinician+ Innovation Program, commencing November 2026 across three Melbourne Parkville precinct health services, and AUSCEP, our completed 12-month flagship that trained more than 150 clinicians.",
};

export default function ProgramsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Programs"
        title={<>Turning clinical <strong>insight into impact.</strong></>}
        lead="Practical, cohort-based programs that give clinicians the skills, mentorship, and network to turn frontline ideas into real healthcare innovation."
        cta={{ label: "Bring Clinician+ to your organisation", href: "/contact?reason=sparc#form" }}
        secondaryCta={{ label: "Join ASME", href: site.joinPath }}
      />

      {/* Overview: three programs at three different stages. Ordered by what a
          visitor can act on today, not by age. */}
      <section className="section relative">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {programsList.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <Link href={p.href} className="block h-full">
                  <article className="card card-hover flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="chip">{p.status}</span>
                      <ArrowUpRight className="h-4 w-4 text-fg-muted" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl tracking-tight text-fg">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm text-fg-subtle">{p.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-fg-muted pretty">
                      {p.body}
                    </p>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The live offer */}
      <Sparc />

      {/* Track record, not an offer */}
      <Auscep />

      {/* Outcomes & alumni */}
      <Testimonials />
      <JoinCTA />
    </PageShell>
  );
}
