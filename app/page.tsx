import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { Manifesto } from "@/components/sections/Manifesto";
import { RoomBand } from "@/components/sections/RoomBand";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { ThreeDoors } from "@/components/sections/ThreeDoors";
import { OnNow } from "@/components/sections/OnNow";
import { Announcements } from "@/components/sections/Announcements";
import { TrackRecord } from "@/components/sections/TrackRecord";
import { MemberSpotlights } from "@/components/sections/MemberSpotlights";
import { SystemsChange } from "@/components/sections/SystemsChange";
import { Insights } from "@/components/sections/Insights";
import { JoinCTA } from "@/components/sections/JoinCTA";

/**
 * Home page order follows the question a first-time visitor is actually asking:
 *
 *   what is this → is this for me → which one am I → is it real
 *   → what do I get → what's on → join
 *
 * Recognition runs first and escalates: the hero states the promise, the
 * premise says "this is for you" in general, and ThreeDoors says "and
 * specifically, you are this one". Identifying yourself needs no knowledge of
 * ASME, so it costs the reader nothing and buys the rest of the page.
 *
 * ThreeDoors and WhatWeDo sit apart deliberately. ThreeDoors is who ASME is
 * for; WhatWeDo is what ASME does. Adjacent, they read as two competing menus.
 *
 * Proof runs as one block rather than being scattered: TrackRecord's figures
 * (what members built), MemberSpotlights' faces (who they are), Partners'
 * institutions (who backs it), then SystemsChange (the work being done on those
 * same institutions). The partner wall used to sit at position 05, which was
 * neither of the two places a logo wall works: too late to be the hero's
 * credibility strip, too early to be evidence, and proving an offer the page
 * had not made yet. Next to SystemsChange it is also a content adjacency, since
 * that section is about the universities, hospitals and colleges the wall shows.
 *
 * Rhythm. Three grounds, and size within each. White is the default. Light blue
 * marks the two beats a reader should slow down on — which door am I, and is
 * this real — so they are found by colour on the way down the page rather than
 * only by reading. Dark blue closes it. Before this every panel was white and
 * emphasis had to come from padding alone, which gave twelve panels of
 * near-identical weight. `panel-lg` for the beats that have to land, `panel`
 * for the rest.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Container className="panel-stack py-4 md:py-6">
          <Hero />
          <div className="panel panel-lg">
            <Manifesto />
          </div>
          <div className="panel panel-lg panel-tint">
            <ThreeDoors />
          </div>
          <RoomBand />
          <div className="panel">
            <WhatWeDo />
          </div>
          {/* Announcements first: what has happened is the evidence the society
              is moving, and it carries a photograph. On now follows with what a
              reader can still turn up to. panel-lg, not a tint: TrackRecord
              below is tinted, and two tinted panels in a row lose the boundary
              between them. */}
          <div className="panel panel-lg">
            <Announcements />
          </div>
          <div className="panel">
            <OnNow />
          </div>
          <div className="panel panel-lg panel-tint">
            <TrackRecord />
          </div>
          <div className="panel">
            <MemberSpotlights />
          </div>
          <div className="panel">
            <Partners />
          </div>
          <div className="panel">
            <SystemsChange />
          </div>
          <div className="panel">
            <Insights
              eyebrow="Resources"
              heading={
                <>
                  Everything we publish, <strong>in one place.</strong>
                </>
              }
              compact
            />
          </div>
          <JoinCTA />
        </Container>
      </main>
      <Footer />
    </>
  );
}
