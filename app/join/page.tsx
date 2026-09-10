import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/sections/PageHeader";
import { JoinForm } from "@/components/sections/JoinForm";

export const metadata: Metadata = {
  title: "Join ASME",
  description:
    "Join the Australian Society for Medical Entrepreneurship & Innovation. Free membership for clinicians building, investing in, and shaping the future of healthcare.",
};

export default function JoinPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Membership"
        title={<>Join <strong>ASME.</strong></>}
        lead="ASME is Australia's clinician-led community for medical entrepreneurship, innovation and enterprise. Membership is free and will connect you with peers, mentors, events, and hands-on programs like AUSCEP. Joining should take less than 2 minutes."
      />
      <JoinForm />
    </PageShell>
  );
}
