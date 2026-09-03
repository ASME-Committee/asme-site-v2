import type { Metadata } from "next";
import Image from "next/image";
import { Mail } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { asset } from "@/lib/asset";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { Events } from "@/components/sections/Events";
import { photos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "A curated calendar of clinician-innovation events across Australia: conferences, hackathons, pitch nights, workshops, and webinars that ASME hosts or rates. Browse what is coming up, and revisit what you missed.",
};

export default function EventsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Events"
        title={<>Where clinician <strong>innovation happens.</strong></>}
        lead="Conferences, pitch nights, roundtables, workshops, and webinars for clinicians building the future of healthcare. Browse what's coming up, and revisit what you missed."
        cta={{ label: "Submit an event", href: "/contact#form" }}
        secondaryCta={{ label: "Join ASME", href: site.joinPath }}
      />

      {/* Upcoming + recent (reuses the homepage Events section) */}
      <Events showFollowPrompt />

      {/* The calendar is deliberately short, so the page needs to show what
          being in the room is actually like. */}
      <section id="in-the-room" className="panel-flush">
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={asset(photos.eventPanel.src)}
            alt={photos.eventPanel.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Submit an event / follow for drops */}
      <section className="section relative">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Keep the calendar sharp</p>
            <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
              Know of an event <strong>worth sharing?</strong>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
              Conferences, hackathons, pitch nights, or webinars that matter for
              clinicians building in healthcare. Send it our way and we&rsquo;ll
              consider it for the calendar. New events go out on LinkedIn first.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/contact#form" size="md">
                <Mail className="h-4 w-4" />
                Submit an event
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <JoinCTA />
    </PageShell>
  );
}
