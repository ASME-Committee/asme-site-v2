import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Benefits } from "@/components/sections/Benefits";
import { StartupDirectory } from "@/components/sections/StartupDirectory";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { site } from "@/lib/content";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join ASME for free. The benefits of membership, who it is for, the Innovator Directory of members and their ventures, and how membership supports CPD and AHPRA registration.",
};

export default function MembershipPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Membership"
        title={<>Your people are <strong>already here.</strong></>}
        lead="Membership is free. The only thing to overcome is hesitation. Join the network, get into the next event, and meet the people building healthcare's next decade."
        cta={{ label: "Join ASME", href: site.joinPath }}
      />

      {/* Visual feature */}
      <section id="what-it-is">
        <Container>
          <Reveal className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={asset("/photos/community-workshop.jpg")}
                alt="Clinicians at an ASME workshop session"
                width={1600}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="h-display text-3xl md:text-[2.75rem]">A community, <strong>not a mailing list.</strong></h2>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
                ASME is doctors, nurses, allied health, pharmacists, and students who want to build. You will find collaborators, mentors, and people who have done it before, and the room is warm.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Benefits heading="Why join" />

      <StartupDirectory />

      <JoinCTA />
    </PageShell>
  );
}
