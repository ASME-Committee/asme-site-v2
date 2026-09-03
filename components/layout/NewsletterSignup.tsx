"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Footer newsletter capture. ASME sends through Mailchimp (the domain carries
 * Mailchimp DKIM records), so wire `onSubmit` to a Mailchimp embedded-form
 * action or audience API before launch. For now it confirms client-side.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: POST to Mailchimp audience (replace with real endpoint).
    setDone(true);
  }

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg">
        The members newsletter
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        Field notes, opportunities, and founder stories. No spam.
      </p>

      {done ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-fg">
          <Check className="h-4 w-4 text-brand-blue" />
          You are on the list. Welcome.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 flex max-w-sm gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@hospital.org"
            aria-label="Email address"
            className="h-11 w-full rounded-full border border-border bg-surface-elevated px-4 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus-visible:border-fg/40 focus-visible:ring-2 focus-visible:ring-accent/40"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-fg-inverse transition-all hover:bg-fg/90 active:scale-[0.98]"
          >
            Join
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
