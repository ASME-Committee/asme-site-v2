import Image from "next/image";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { endorsements, people, type Person } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * Patrons lead on a full-width feature card carrying a portrait and their own
 * words. Everyone else shares one uniform grid below, where standing is shown
 * by a small badge rather than a different card treatment.
 *
 * Both tiers are built from the roster first, then from any remaining quotes,
 * so adding an ambassador to `people` is enough to put them on the page. A
 * quote is optional: grid attribution is centred when there is nothing above
 * it, which keeps every tile the same height.
 */
type Card = {
  name: string;
  role: string;
  quote?: string;
  badge?: string;
  linkedin?: string;
  inMemoriam?: boolean;
};

/** Only patrons are badged. Ambassadors sit in the grid unmarked, so the tiles
 *  stay uniform and the patron card keeps the section's only piece of emphasis. */
const BADGES: Partial<Record<Person["group"], string>> = {
  Patron: "ASME patron",
};

export function BackedBy() {
  const patrons = people.filter((p) => p.group === "Patron");
  const roster = people.filter((p) => p.group !== "Team");

  const quoteFor = (p: Person) => endorsements.find((e) => sameHuman(e.name, p.name));

  // Grid order follows `endorsements`, so the running order lives in one place
  // rather than being an artifact of which array somebody happens to sit in.
  // Roster people are enriched from their entry; anyone without a quote is
  // appended at the end.
  const cards: Card[] = [
    ...endorsements
      .filter((e) => !patrons.some((p) => sameHuman(e.name, p.name)))
      .map((e) => {
        const person = roster.find((p) => sameHuman(e.name, p.name));
        return {
          name: e.name,
          role: e.role,
          quote: e.quote,
          badge: person ? BADGES[person.group] : e.badge,
          linkedin: person?.linkedin,
          inMemoriam: e.inMemoriam,
        };
      }),
    ...roster
      .filter(
        (p) =>
          p.group !== "Patron" && !endorsements.some((e) => sameHuman(e.name, p.name)),
      )
      .map((p) => ({
        name: p.name,
        role: p.title,
        badge: BADGES[p.group],
        linkedin: p.linkedin,
      })),
  ];

  return (
    <section id="endorsements" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Patrons and ambassadors</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Backed by people who <strong>set the standard.</strong>
          </h2>
        </Reveal>

        {/* Patrons lead the section. */}
        {patrons.length > 0 && (
          <div className="mt-12 space-y-10">
            {patrons.map((p, i) => {
              const quote = quoteFor(p);
              return (
                <Reveal key={p.name} delay={i * 0.06}>
                  <figure className="border-b border-border pb-10">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
                    <div className="flex items-center gap-4 md:w-72 md:shrink-0">
                      <Avatar person={p} size={64} />
                      <div className="min-w-0">
                        <p className="font-display text-lg tracking-tight text-fg">{p.name}</p>
                        <p className="mt-0.5 text-xs text-fg-subtle pretty">{p.title}</p>
                        <div className="mt-2.5 flex items-center gap-2.5">
                          <span className="inline-flex items-center rounded-full bg-[rgb(var(--accent-light))]/10 px-2.5 py-0.5 text-[11px] font-medium text-[rgb(var(--accent))]">
                            {BADGES.Patron}
                          </span>
                          <ProfileLink person={p} />
                        </div>
                      </div>
                    </div>
                    {quote && (
                      <blockquote className="border-t border-border pt-6 text-base leading-relaxed text-fg pretty md:border-l md:border-t-0 md:pl-10 md:pt-0">
                        &ldquo;{quote.quote}&rdquo;
                      </blockquote>
                    )}
                    </div>

                    {p.bio && p.bio.length > 0 && (
                      <div className="mt-6 max-w-3xl space-y-3 border-t border-border pt-5">
                        {p.bio.map((para) => (
                          <p key={para.slice(0, 32)} className="text-sm leading-relaxed text-fg-muted pretty">
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </figure>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* Everyone else, on one uniform tile. */}
        <div className="mt-10 grid auto-rows-fr gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <figure className="flex h-full flex-col">
                {c.quote && (
                  <blockquote className="text-sm leading-relaxed text-fg pretty">
                    &ldquo;{c.quote}&rdquo;
                  </blockquote>
                )}
                <figcaption
                  className={
                    c.quote
                      ? "mt-5 border-t border-border pt-4"
                      : "flex flex-1 flex-col justify-center"
                  }
                >
                  <p className="text-sm font-medium text-fg">
                    {c.inMemoriam ? `The late ${c.name}` : c.name}
                  </p>
                  {c.role && <p className="mt-0.5 text-xs text-fg-subtle pretty">{c.role}</p>}
                  {(c.badge || c.linkedin) && (
                    <div className="mt-2.5 flex items-center gap-2.5">
                      {c.badge && (
                        <span className="inline-flex items-center rounded-full bg-[rgb(var(--accent-light))]/10 px-2.5 py-0.5 text-[11px] font-medium text-[rgb(var(--accent))]">
                          {c.badge}
                        </span>
                      )}
                      {c.linkedin && <ProfileLink href={c.linkedin} name={c.name} />}
                    </div>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProfileLink({
  person,
  href,
  name,
}: {
  person?: Person;
  href?: string;
  name?: string;
}) {
  const url = href ?? person?.linkedin;
  const who = name ?? person?.name ?? "";
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${who} on LinkedIn`}
      className="text-fg-subtle transition-colors hover:text-brand-blue"
    >
      <Linkedin className="h-3.5 w-3.5" />
    </a>
  );
}

function Avatar({ person, size }: { person: Person; size: number }) {
  const box = { width: size, height: size };
  if (person.photo) {
    return (
      <div
        style={box}
        className="relative shrink-0 overflow-hidden rounded-full border border-border shadow-soft"
      >
        <Image
          src={asset(person.photo)}
          alt={person.name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      style={box}
      className="flex shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#2B58E0,#1B3FB4)] text-lg font-semibold tracking-tight text-white shadow-soft"
    >
      {person.initials}
    </div>
  );
}

/** Endorsements and roster entries spell titles differently ("Professor Fiona
 *  Wood AM" vs "Prof. Fiona Wood AM"), so match on surname-bearing words only. */
function sameHuman(a: string, b: string) {
  const strip = (s: string) =>
    s
      .toLowerCase()
      .replace(/\b(dr|prof|professor|mr|ms|mrs|am|ao|oam)\b\.?/g, "")
      .replace(/[^a-z ]/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .join(" ");
  return strip(a) === strip(b);
}
