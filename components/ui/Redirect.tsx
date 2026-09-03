"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";

/**
 * A moved page.
 *
 * The site is a static export, so `next.config` redirects are not available:
 * there is no server to issue a 301. These stub pages stand in. They redirect
 * on load and, for anything that does not run JavaScript, leave a real link and
 * a plain sentence rather than a blank screen.
 *
 * They exist because renaming a URL breaks every link already in a newsletter,
 * a LinkedIn post or a partner's site. Cheap to keep, expensive to have skipped.
 */
export function Redirect({ to, label }: { to: string; label: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <section className="panel-lg">
      <Container>
        <p className="eyebrow">Moved</p>
        <h1 className="h-display mt-5 text-3xl md:text-[2.5rem]">
          This page is now <strong>{label}.</strong>
        </h1>
        <p className="mt-6 text-base text-fg-muted">
          Taking you there now. If nothing happens,{" "}
          <Link href={to} className="text-[rgb(var(--accent))] underline underline-offset-4">
            follow this link
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
