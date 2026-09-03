import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { jointStatement } from "@/lib/content";

/**
 * Teaser for the systems-change work; full detail lives on /systems-change.
 * Sits on the home page after the individual-outcome sections, so the
 * "beyond inspiring individual clinicians" turn lands where it makes sense:
 * it zooms out from what ASME does for one member to what it is changing
 * across medical schools, hospital training, and the colleges.
 */
export function SystemsChange() {
  return (
    <section id="systems-change" className="section relative">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Driving Change</span>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Changing the system <strong>from within.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            Inspiring individual clinicians is half our work. The other half is changing the
            institutions that decide whether this becomes mainstream: the universities that train
            clinicians, the hospitals they train in, and the colleges that certify them.{" "}
            {jointStatement.signatories.length} medical schools have signed our joint statement, with
            more in progress.
          </p>
          <Link
            href="/changing-the-system"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))] transition-colors hover:text-[rgb(var(--accent-deep))]"
          >
            Explore our systems-change work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
