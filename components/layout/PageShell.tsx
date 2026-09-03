import { type ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

/**
 * Standard chrome for every interior page.
 *
 * The stack is the important part: every direct `<section>` child of
 * `.page-stack` is rendered as a white panel on the grey ground, exactly as on
 * the home page. That means an interior page is written as a plain sequence of
 * sections and lands in the design without each page, or each section
 * component, needing to know about panels.
 *
 * ScrollProgress is gone along with the rest of the animation.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>
        <Container className="page-stack panel-stack py-4 md:py-6">{children}</Container>
      </main>
      <Footer />
    </>
  );
}
