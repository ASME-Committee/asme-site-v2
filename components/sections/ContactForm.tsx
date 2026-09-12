"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { submitContact } from "@/lib/forms";

/**
 * The contact form is a router, not a catch-all.
 *
 * Everything that reaches ASME through the website used to arrive as "Join
 * ASME", which is wrong for four of the six people who want to make contact: a
 * hospital asking about Clinician+, an organisation asking about partnership, an
 * event organiser, and a journalist are not members and should not be pushed
 * through a membership form to be heard.
 *
 * The first question routes the enquiry, and the fields that follow change with
 * it, so nobody is asked for a clinical speciality to submit an event.
 *
 * Submission is not wired to a backend yet: this confirms client-side, exactly
 * as the membership form does. Both need the same piece of work.
 */

/**
 * Two groups, not one list.
 *
 * The site's whole argument is that two different people arrive: the clinician
 * who wants something from ASME, and the one who has already built something
 * and is here to give an hour back. The home page separates them, the join call
 * to action separates them, and green means contribution throughout. Contact was
 * the one place that flattened them into six equal radio buttons, so the person
 * offering to mentor picked from the same undifferentiated list as the person
 * asking to be mentored.
 *
 * Splitting them also routes better: everything under "offering" reaches
 * someone who can say yes to an offer, which is not the same inbox as a
 * membership question.
 */
const ASK_REASONS = [
  {
    value: "membership",
    label: "Joining ASME",
    help: "Membership is free. The join form is the fastest route, but ask here if you would rather.",
  },
  {
    value: "sparc",
    label: "Bringing an event or program to my organisation",
    help: "Innovation training delivered inside your hospital or university, built around clinical work.",
  },
  {
    value: "attending",
    label: "An event I want to attend",
    help: "Asking about something on the calendar, or how to get to the next one.",
  },
  {
    value: "media",
    label: "A media or press enquiry",
    help: "Interviews, comment, and requests for an ASME speaker.",
  },
  { value: "other", label: "Something else", help: "" },
] as const;

const OFFER_REASONS = [
  {
    value: "experience",
    label: "Offering my experience",
    help: "Mentoring, speaking at a dinner, hosting, or sitting for one conversation. An hour is enough.",
  },
  {
    value: "partnership",
    label: "Partnering with ASME",
    help: "Industry, investors, universities and health services who want to back this work.",
  },
  {
    value: "submit-event",
    label: "Submitting an event",
    help: "Something the clinician-innovation community should know about.",
  },
] as const;

const REASONS = [...ASK_REASONS, ...OFFER_REASONS];

type Reason = (typeof REASONS)[number]["value"];

/** Reasons that come from an organisation rather than an individual, so the
 *  organisation field appears and is required. */
const ORG_REASONS: Reason[] = ["sparc", "partnership", "submit-event", "media"];

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-surface-elevated px-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-fg/40 focus-visible:ring-2 focus-visible:ring-accent/40";

type ReasonItem = { value: string; label: string; help: string };

/** One option. A checkbox, not a radio: people arrive with more than one thing
 *  to say, and often one from each side ("I want to join, and I can mentor").
 *  Forcing a single choice made them pick the smaller of two reasons and bury
 *  the other in the message box.
 *
 *  `tone` decides the selected colour: blue for the people asking, green for the
 *  people offering, matching the meaning green carries elsewhere on the site. */
function ReasonOption({
  reason,
  active,
  tone,
  onToggle,
}: {
  reason: ReasonItem;
  active: boolean;
  tone: "ask" | "offer";
  onToggle: () => void;
}) {
  const selected =
    tone === "offer"
      ? "border-[rgb(var(--give))] bg-[rgb(var(--give))]/[0.14]"
      : "border-[rgb(var(--accent))] bg-[rgb(var(--accent-light))]/[0.07]";
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
        active ? selected : "border-border hover:border-fg/25"
      }`}
    >
      <input
        type="checkbox"
        name="reason"
        value={reason.value}
        checked={active}
        onChange={onToggle}
        className={`mt-0.5 h-4 w-4 shrink-0 rounded ${
          tone === "offer"
            ? "accent-[rgb(var(--give-deep))]"
            : "accent-[rgb(var(--accent))]"
        }`}
      />
      <span className="text-sm font-medium text-fg">{reason.label}</span>
    </label>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="mb-2 block text-sm font-medium text-fg">
      {children}
      {required && <span className="ml-0.5 text-[rgb(var(--accent))]">*</span>}
    </span>
  );
}

export function ContactForm() {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [done, setDone] = useState(false);
  /** Only shown once they have tried to submit, so the form does not scold
   *  someone who has not reached the question yet. */
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* A link can name the reason it was clicked for, e.g. /contact?reason=partnership.
     Read from window rather than useSearchParams: this site is a static export,
     so the query string only exists in the browser, and reading it here avoids
     a Suspense boundary around a form that has nothing to suspend on.

     Only values that exist in REASONS are accepted, so a hand-edited URL cannot
     put the form into a state the options do not offer. */
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("reason");
    if (!wanted) return;
    const match = REASONS.find((r) => r.value === wanted);
    if (match) setReasons([match.value as Reason]);
  }, []);

  const has = (v: Reason) => reasons.includes(v);
  function toggle(v: Reason) {
    setReasons((prev) => (prev.includes(v) ? prev.filter((r) => r !== v) : [...prev, v]));
  }

  // The organisation field appears as soon as any selected reason comes from an
  // organisation rather than an individual.
  const needsOrg = reasons.some((r) => ORG_REASONS.includes(r));
  // Help text for everything they have picked, in the order the options appear.
  const chosen = REASONS.filter((r) => reasons.includes(r.value) && r.help);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    if (reasons.length === 0) return;
    setError(null);
    setSubmitting(true);
    try {
      const fd = new FormData(e.currentTarget);
      const data: Record<string, unknown> = Object.fromEntries(fd.entries());
      data.reasons = reasons;
      await submitContact(data);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        `Something went wrong sending your message. Please try again, or email ${site.email}.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section id="form">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
              <Check className="h-7 w-7" />
            </span>
            <h2 className="h-display mt-6 text-2xl md:text-3xl">
              Thank you. <strong>We have it.</strong>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fg-muted pretty">
              Someone will read this and reply within three business days. ASME is run by
              clinicians around their clinical work, so it is a person answering, not a queue.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="form">
      <Container>
        <div className="max-w-2xl">
        <p className="eyebrow">Send us a message</p>
        <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
          Tell us <strong>what this is about.</strong>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
          One question first, so your message reaches the right person rather than a general
          inbox.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-6">
          {/* The router. Radio rather than a select: the options are the page's
              real content and a closed select hides them. Two labelled groups,
              the second carrying the green contribution mark used everywhere
              else on the site for the same idea. */}
          <fieldset>
            <legend className="sr-only">
              What are you getting in touch about?
            </legend>

            <p className="mb-6 text-sm text-fg-muted">
              Tick everything that applies. Both sides is a perfectly normal answer.
            </p>

            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <div>
                <p className="text-sm font-semibold text-fg">I am looking for something</p>
                <p className="mt-1 text-sm text-fg-muted">
                  You want to join, learn, attend, or ask.
                </p>
                <div className="mt-4 grid gap-2.5">
                  {ASK_REASONS.map((r) => (
                    <ReasonOption
                      key={r.value}
                      reason={r}
                      active={has(r.value)}
                      tone="ask"
                      onToggle={() => toggle(r.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="contribute-block">
                  <div className="contribute-mark">
                    <p className="text-sm font-semibold text-white">I have something to offer</p>
                    <p className="mt-1 text-sm text-white/75">
                      You have built something, or your organisation can back the people who are.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2.5">
                  {OFFER_REASONS.map((r) => (
                    <ReasonOption
                      key={r.value}
                      reason={r}
                      active={has(r.value)}
                      tone="offer"
                      onToggle={() => toggle(r.value)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {chosen.length > 0 && (
              <ul className="mt-6 grid gap-2">
                {chosen.map((r) => (
                  <li key={r.value} className="text-sm leading-relaxed text-fg-muted pretty">
                    <span className="font-medium text-fg">{r.label}.</span> {r.help}
                  </li>
                ))}
              </ul>
            )}

            {attempted && reasons.length === 0 && (
              <p className="mt-5 text-sm font-medium text-fg">
                Pick at least one, so we know who should read this.
              </p>
            )}
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <Label required>Name</Label>
              <input name="name" type="text" required autoComplete="name" className={inputClass} />
            </label>
            <label className="block">
              <Label required>Email</Label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@hospital.org.au"
                className={inputClass}
              />
            </label>
          </div>

          {needsOrg && (
            <label className="block">
              <Label required>Organisation</Label>
              <input
                name="organisation"
                type="text"
                required
                autoComplete="organization"
                className={inputClass}
              />
            </label>
          )}

          <label className="block">
            <Label required>Your message</Label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder={
                has("sparc")
                  ? "Which organisation, roughly how many clinicians, and what you are trying to change."
                  : has("submit-event")
                    ? "What the event is, when and where it runs, and a link if there is one."
                    : has("experience")
                      ? "What you have built, and what you would be happy to give time to."
                      : "A few lines is plenty."
              }
              className={`${inputClass} h-auto py-3 leading-relaxed`}
            />
          </label>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Sending..." : "Send message"}
            </Button>
            <p className="text-sm text-fg-muted">
              Or email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-[rgb(var(--accent))] underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
            {error && (
              <p className="basis-full text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
        </div>
      </Container>
    </section>
  );
}
