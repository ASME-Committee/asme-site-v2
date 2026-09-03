import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { partnerTiers, site } from "@/lib/content";

export function PartnerTiers() {
  return (
    <section id="partner-with-us" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Partner with us</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Reach Australia's <strong>clinician innovators.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            Partnership puts your organisation in front of the clinicians building the next decade of healthcare. Choose a tier or talk to us about something bespoke.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {partnerTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06}>
              <article className="card card-hover flex h-full flex-col p-7">
                <h3 className="font-display text-2xl tracking-tight text-fg">{tier.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{tier.blurb}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href={`mailto:${site.email}?subject=Partnering with ASME`} variant="primary" size="md">
            Get in touch
          </ButtonLink>
          <span className="text-sm text-fg-subtle">
            A downloadable partnership prospectus will live here. Add the PDF to public/ and link it.
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
