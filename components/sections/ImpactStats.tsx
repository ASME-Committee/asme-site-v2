import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { societyMetrics } from "@/lib/content";

export function ImpactStats() {
  return (
    <section id="impact" className="section relative">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Impact</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            The numbers <strong>so far.</strong>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {societyMetrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <div className="card h-full p-8">
                <div className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">
                  {m.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
