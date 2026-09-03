import { type ReactNode } from "react";
import { Network, Compass, Sparkles, ShieldCheck, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { memberBenefits } from "@/lib/content";

const iconMap: Record<string, ReactNode> = {
  network: <Network className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  spark: <Sparkles className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
};

type Props = { id?: string; heading?: string; subtle?: boolean };

export function Benefits({ id = "benefits", heading = "Why join", subtle = false }: Props) {
  return (
    <section id={id} className={`section relative ${subtle ? "bg-surface-subtle" : ""}`}>
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{heading}</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Free to join.<br /><strong>Built to be worth it.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            Membership costs nothing. Here is what it gets you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {memberBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <article className="group h-full">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--accent-light))]/10 text-[rgb(var(--accent))] transition-colors duration-200 group-hover:bg-[rgb(var(--accent))] group-hover:text-white">
                  {iconMap[b.glyph]}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                  {b.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
