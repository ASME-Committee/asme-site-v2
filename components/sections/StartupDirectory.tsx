"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Linkedin, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { startups, type Startup } from "@/lib/startups";
import { asset } from "@/lib/asset";

/**
 * The directory holds 153 ventures across about seventy different sector
 * strings, most of which appear once ("Podiatry Tech", "Sleep Health Platform").
 * Rendered as one continuous list it is a wall: a reader scrolling it cannot
 * tell whether they have seen the medtech yet, and there is no way to answer
 * the question people actually arrive with, which is "who here is doing what I
 * am doing".
 *
 * Those seventy strings roll up into six themes, derived rather than hand-typed
 * so a new venture is categorised the moment it is added to lib/startups.ts.
 * Order matters: "Digital Mental Health" must be tested against mental health
 * before it is tested against digital.
 */
const THEMES = [
  { id: "mental-health", label: "Mental health", test: /mental health|psychiatr|psycholog|wellbeing/i },
  { id: "medtech", label: "MedTech & devices", test: /medtech|device|surgic|surgery|anesth|anaesth/i },
  { id: "biotech", label: "Biotech & diagnostics", test: /biotech|diagnostic|oncolog|precision|genom|vascular|research/i },
  { id: "education", label: "Education & training", test: /edtech|education|training|coach|learning/i },
  { id: "digital", label: "Digital health & AI", test: /\bai\b|healthtech|digital|tech\b|platform|telehealth|software|data|app\b/i },
  { id: "care", label: "Care & services", test: /.*/ },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

function themeOf(s: Startup): ThemeId {
  return (THEMES.find((t) => t.test.test(s.sector)) ?? THEMES[THEMES.length - 1]).id;
}

/** How many to show before the reader asks for more. Two full rows on a laptop. */
const PAGE = 24;

export function StartupDirectory() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeId | "all">("all");
  const [shown, setShown] = useState(PAGE);

  // Counts are computed once over the whole list, so each chip can carry its
  // own number and an empty theme is visibly empty before it is clicked.
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const s of startups) {
      const t = themeOf(s);
      c[t] = (c[t] ?? 0) + 1;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return startups.filter((s) => {
      if (theme !== "all" && themeOf(s) !== theme) return false;
      if (!q) return true;
      return `${s.name} ${s.company} ${s.sector} ${s.description}`.toLowerCase().includes(q);
    });
  }, [query, theme]);

  const visible = filtered.slice(0, shown);
  const filtering = theme !== "all" || query.trim().length > 0;

  function pickTheme(next: ThemeId | "all") {
    setTheme(next);
    setShown(PAGE);
  }

  function clearAll() {
    setTheme("all");
    setQuery("");
    setShown(PAGE);
  }

  const chipBase =
    "rounded-full border px-4 py-1.5 text-sm transition-colors whitespace-nowrap";
  const chipOn = "border-[rgb(var(--accent))] bg-[rgb(var(--accent))] text-white";
  const chipOff = "border-border text-fg-muted hover:border-fg/30 hover:text-fg";

  return (
    <section id="directory">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Innovator Directory</p>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            Ventures built <strong>by our members.</strong>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty">
            {startups.length} clinician founders from AUSCEP and the ASME community. Filter by what
            they are building, or search by name, venture, or sector.
          </p>
        </Reveal>

        {/* Filter by theme */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => pickTheme("all")}
              aria-pressed={theme === "all"}
              className={`${chipBase} ${theme === "all" ? chipOn : chipOff}`}
            >
              All {startups.length}
            </button>
            {THEMES.filter((t) => (counts[t.id] ?? 0) > 0).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => pickTheme(t.id)}
                aria-pressed={theme === t.id}
                className={`${chipBase} ${theme === t.id ? chipOn : chipOff}`}
              >
                {t.label} {counts[t.id]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Search */}
        <Reveal className="mt-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShown(PAGE);
                }}
                placeholder="Search founders, ventures, sectors..."
                aria-label="Search the Innovator Directory"
                className="h-12 w-full rounded-full border border-border bg-surface-elevated pl-11 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-fg/40 focus-visible:ring-2 focus-visible:ring-accent/40"
              />
            </div>
            <p className="text-sm text-fg-subtle">
              {filtered.length} {filtered.length === 1 ? "venture" : "ventures"}
              {filtering && filtered.length !== startups.length ? ` of ${startups.length}` : ""}
            </p>
            {filtering && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </Reveal>

        {/* Results */}
        {filtered.length > 0 ? (
          <>
            <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((s) => (
                <article key={`${s.name}-${s.company}`} className="flex h-full gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[rgb(var(--accent-light))]/10">
                    <Image
                      src={asset(s.photo)}
                      alt={s.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight text-fg">{s.name}</h3>
                    <p className="text-sm text-[rgb(var(--accent))]">{s.company}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-fg-subtle">
                      {s.sector}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted pretty">
                      {s.description}
                    </p>
                    {s.linkedin && (
                      <a
                        href={s.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${s.name} on LinkedIn`}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-[rgb(var(--accent))]"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {filtered.length > shown && (
              <div className="mt-12 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShown((n) => n + PAGE)}
                  className="rounded-full border border-border-strong px-6 py-2.5 text-sm font-medium text-fg transition-colors hover:border-fg/40 hover:bg-surface-subtle"
                >
                  Show {Math.min(PAGE, filtered.length - shown)} more
                </button>
                <button
                  type="button"
                  onClick={() => setShown(filtered.length)}
                  className="text-sm font-medium text-[rgb(var(--accent))]"
                >
                  Show all {filtered.length}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-12">
            <p className="text-fg-muted">
              No ventures match{query.trim() ? ` “${query.trim()}”` : " that filter"}.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 text-sm font-medium text-[rgb(var(--accent))]"
            >
              Clear the filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
