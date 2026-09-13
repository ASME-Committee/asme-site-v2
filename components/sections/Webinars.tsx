"use client";

import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { webinars, type Webinar } from "@/lib/content";

/**
 * Webinar grid with inline playback.
 *
 * Recordings are embedded rather than linked out: a card with a recording shows
 * a poster with a play button, and clicking it swaps in a real <video> player
 * in place — so nobody leaves the site to watch. The players are click-to-load
 * (not three <video> elements mounted at once), so the page stays light until
 * someone actually presses play. A session with no recording yet keeps a plain
 * link to its details.
 */
export function Webinars() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {webinars.map((w, i) => (
        <Reveal key={w.title} delay={i * 0.05}>
          <WebinarCard webinar={w} />
        </Reveal>
      ))}
    </div>
  );
}

function WebinarCard({ webinar }: { webinar: Webinar }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      {webinar.video && (
        <div className="relative aspect-video bg-surface-subtle">
          {playing ? (
            <video
              src={webinar.video}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full bg-black"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play recording: ${webinar.title}`}
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue/15 to-brand-blue/[0.04] transition-colors hover:from-brand-blue/25"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lift transition-transform group-hover:scale-105">
                <Play className="h-6 w-6 translate-x-0.5 fill-brand-blue text-brand-blue" />
              </span>
            </button>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-fg-subtle">
          {webinar.date}
        </span>
        <h3 className="mt-3 font-display text-xl tracking-tight text-fg">{webinar.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted pretty">{webinar.blurb}</p>
        {!webinar.video && webinar.link && (
          <a
            href={webinar.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
          >
            Details
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
