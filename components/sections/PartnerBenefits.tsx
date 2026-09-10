import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { partnerBenefits, societyMetrics } from "@/lib/content";

/**
 * The case for partnering, above the logo walls.
 *
 * A prospect sent this page arrives asking "why us, and why now". The logos
 * answer neither. This section runs benefit, then proof, then the ask, which is
 * the order a partnership conversation actually goes in.
 *
 * The society figures are pulled from `societyMetrics` rather than retyped, so
 * the number a partner reads here can never drift from the number on the home
 * page.
 */
export function PartnerBenefits() {
  return (
    <section id="why-partner" className="panel-tint">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Why partner</p>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            What partnering with ASME <strong>gives your organisation.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            ASME is the national society for clinicians building the future of healthcare.
            Partnering puts your organisation alongside them, and alongside the institutions
            deciding whether their work becomes mainstream.
          </p>
        </Reveal>

        {/* The scale a partner is buying into, stated before the benefits so the
            claims below have something behind them. */}
        <Reveal delay={0.05} className="mt-10">
          <dl className="flex flex-wrap gap-x-12 gap-y-6 border-y border-border py-7">
            {societyMetrics.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl tracking-tight text-fg md:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-fg-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {partnerBenefits.map((group, gi) => (
            <Reveal key={group.tier} delay={gi * 0.06}>
              <div>
                <h3 className="font-display text-xl tracking-tight text-fg md:text-2xl">
                  {group.tier}
                </h3>
                <p className="mt-2 text-sm text-fg-muted">{group.lede}</p>

                <ul className="mt-7 grid gap-6">
                  {group.benefits.map((b) => (
                    <li key={b.title} className="flex gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand-blue" />
                      <div>
                        <p className="text-sm font-semibold text-fg">{b.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted pretty">
                          {b.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
