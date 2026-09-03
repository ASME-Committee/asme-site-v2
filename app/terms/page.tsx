import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms",
  description: "ASME terms of use.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Terms of use" />
      <section className="section">
        <Container>
          <p className="max-w-2xl text-lg leading-relaxed text-fg-muted pretty">
            Our terms of use are being finalised. For any questions, contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </PageShell>
  );
}
