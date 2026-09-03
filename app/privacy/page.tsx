import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "ASME privacy policy.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy policy" />
      <section className="section">
        <Container>
          <p className="max-w-2xl text-lg leading-relaxed text-fg-muted pretty">
            Our privacy policy is being finalised. For any questions about how ASME handles your information, contact us at{" "}
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
