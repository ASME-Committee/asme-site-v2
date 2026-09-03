import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Redirect } from "@/components/ui/Redirect";

export const metadata: Metadata = {
  title: "Moved",
  robots: { index: false, follow: true },
};

/** Kept so links to the old address still land somewhere. See Redirect. */
export default function MovedPage() {
  return (
    <PageShell>
      <Redirect to="/resources/articles" label="Resources / Articles" />
    </PageShell>
  );
}
