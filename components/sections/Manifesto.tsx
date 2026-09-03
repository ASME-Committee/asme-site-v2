import { Container } from "@/components/ui/Container";
import { manifesto } from "@/lib/content";

/**
 * The premise. Left aligned rather than centred: everything else on the page
 * starts at the same left edge, and a centred block in the middle of a stack of
 * left-aligned panels reads as a different design.
 *
 * The three lines used to fade and unblur in sequence. They now just sit there,
 * which suits the copy better than a reveal did.
 */
export function Manifesto() {
  return (
    <section>
      <Container>
        <p className="eyebrow">{manifesto.eyebrow}</p>

        <ul className="mt-5 space-y-1">
          {manifesto.lines.map((line, i) => (
            <li
              key={line}
              className="h-display text-[2rem] md:text-[3.25rem]"
            >
              {i === manifesto.lines.length - 1 ? <strong>{line}</strong> : line}
            </li>
          ))}
        </ul>

        <div className="mt-9 grid gap-6 text-base leading-relaxed text-fg-muted pretty md:grid-cols-2 md:gap-10">
          <div className="space-y-4">
            {manifesto.body.slice(0, 1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="space-y-4">
            {manifesto.body.slice(1, -1).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {/* The last line is a summation, not another paragraph: it closes
                the premise off, so it carries weight rather than sitting at the
                same value as the prose above it. */}
            <p className="text-lg font-semibold tracking-tight text-fg">
              {manifesto.body[manifesto.body.length - 1]}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
