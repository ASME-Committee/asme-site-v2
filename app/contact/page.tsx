import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ASME about membership, bringing SPARC to your hospital or university, partnering with us, an event, or media. ACNC registered charity, ABN 41 664 194 307.",
};

/**
 * Until now the only way to reach ASME from the website was the membership
 * form. That works for one of the six people who arrive wanting to make
 * contact, and quietly loses the other five: the hospital asking about SPARC,
 * the organisation asking about partnership, the event organiser, the
 * journalist, and the person who just has a question.
 *
 * The page states who answers, how long it takes, and what ASME is as a legal
 * entity, because the audiences most likely to use it (health services,
 * universities, industry) need the registered name, the ABN and the charity
 * status before they can put anything through a procurement process.
 */
export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title={<>Talk to <strong>a person.</strong></>}
        lead="ASME is run by clinicians around their clinical work. Messages are read by someone who can answer them, usually within three business days."
        secondaryCta={{ label: `Email ${site.email}`, href: `mailto:${site.email}` }}
      />

      <ContactForm />

      {/* Who we are, in the terms an institution needs. */}
      <section id="details">
        <Container>
          <p className="eyebrow">The organisation</p>
          <h2 className="h-display mt-5 text-3xl md:text-[2.75rem]">
            The details <strong>for your records.</strong>
          </h2>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { term: "Registered name", detail: site.fullName },
              { term: "ABN", detail: "41 664 194 307" },
              { term: "Status", detail: "ACNC registered charity" },
              { term: "Email", detail: site.email, href: `mailto:${site.email}` },
            ].map((d) => (
              <div key={d.term}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-subtle">
                  {d.term}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-fg">
                  {d.href ? (
                    <a
                      href={d.href}
                      className="text-[rgb(var(--accent))] underline-offset-4 hover:underline"
                    >
                      {d.detail}
                    </a>
                  ) : (
                    d.detail
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-fg-muted pretty">
            Donations to ASME are used to run programs, events and the advocacy work with
            universities, hospitals and colleges. Membership itself is, and stays, free.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              href={site.joinPath}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
            >
              Join ASME
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[rgb(var(--accent))]"
            >
              Follow us on LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
