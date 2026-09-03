import { Container } from "@/components/ui/Container";
import { members } from "@/lib/content";

/**
 * Members, as a static grid. This was a hover-pausable marquee scrolling cards
 * past the reader on a 90 second loop, which meant the one card somebody wanted
 * to read was always moving away from them.
 *
 * Six is enough to make the point; the directory on Community holds the rest.
 * Ruled rather than floating: six entries in three columns with nothing between
 * them gave the eye no line to follow and the names ran together. A rule under
 * each row does what a card border used to do without reintroducing boxes.
 */
export function MemberSpotlights() {
  const shown = members.slice(0, 6);

  return (
    <section id="community">
      <Container>
        <p className="eyebrow">The community</p>
        <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
          Your people are <strong>already here.</strong>
        </h2>

        <ul className="mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m) => (
            <li key={m.name} className="border-b border-border py-7">
              <p className="text-base font-semibold tracking-tight text-fg">{m.name}</p>
              <p className="mt-1 text-sm text-fg-subtle">
                {m.role} &middot; {m.org}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">{m.bio}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
