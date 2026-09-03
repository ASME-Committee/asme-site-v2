import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";

/**
 * The full LinkedIn ask, for pages where "we post it there first" is a real
 * trade rather than a favour: somebody who has just read the content has an
 * obvious reason to want it earlier.
 *
 * Place it at the point of departure, directly above JoinCTA, so the page
 * escalates: read the content, follow for more, join when ready. Pages using
 * this should pass `showLinkedIn={false}` to JoinCTA so the ask is not made
 * twice within a screen.
 *
 * Deliberately says "follow", not "community": ASME has a LinkedIn page today,
 * and a group is not live yet. When it is, only `site.linkedin` changes.
 */
export function LinkedInFollow() {
  return (
    <section className="pb-8">
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-brand-gradient-subtle px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-lg tracking-tight text-fg">
                We share it on LinkedIn first.
              </h3>
              <p className="mt-1 max-w-lg text-sm text-fg-muted pretty">
                Field notes, member wins, and event drops land there before anywhere else.
                Follow along to catch them early.
              </p>
            </div>
            <ButtonLink
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="shrink-0"
            >
              <Linkedin className="h-4 w-4" />
              Follow us on LinkedIn
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
