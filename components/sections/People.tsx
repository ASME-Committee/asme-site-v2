import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { people, type Person } from "@/lib/content";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

// Patrons and ambassadors are rendered by BackedBy, alongside the endorsements,
// so that a patron who has also given a quote appears exactly once on the page.
const groups: { key: Person["group"]; label: string; blurb: string }[] = [
  { key: "Team", label: "Team", blurb: "The people who run ASME." },
];

export function People() {
  return (
    <section id="people" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Our people</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            The clinicians <strong>behind ASME.</strong>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-14">
          {groups.map((g) => {
            const members = people.filter((p) => p.group === g.key);
            if (members.length === 0) return null;
            return (
              <div key={g.key}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl tracking-tight text-fg">{g.label}</h3>
                  <p className="text-sm text-fg-subtle">{g.blurb}</p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {members.map((p, i) => (
                    <Reveal key={`${p.name}-${i}`} delay={i * 0.04}>
                      <article
                        className={cn(
                          "card h-full p-6",
                          p.placeholder && "border-dashed opacity-70",
                        )}
                      >
                        {p.photo ? (
                          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border shadow-soft">
                            <Image
                              src={asset(p.photo)}
                              alt={p.name}
                              fill
                              sizes="64px"
                              className="object-cover grayscale"
                            />
                          </div>
                        ) : (
                          <div
                            aria-hidden
                            className={cn(
                              "flex h-16 w-16 items-center justify-center rounded-full text-base font-semibold tracking-tight text-white shadow-soft",
                              p.placeholder
                                ? "bg-fg-subtle"
                                : "bg-[radial-gradient(circle_at_30%_30%,#2B58E0,#1B3FB4)]",
                            )}
                          >
                            {p.initials}
                          </div>
                        )}
                        <h4 className="mt-5 font-medium text-fg">{p.name}</h4>
                        <p className="mt-0.5 text-sm text-fg-subtle">{p.title}</p>
                        {p.externalRole && (
                          <p className="mt-2 border-t border-border pt-2 text-xs leading-relaxed text-fg-muted pretty">
                            {p.externalRole}
                          </p>
                        )}
                        {p.linkedin && (
                          <a
                            href={p.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${p.name} on LinkedIn`}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-brand-blue"
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        )}
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
