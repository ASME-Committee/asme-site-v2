import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { nav, site } from "@/lib/content";

type FooterLink = { label: string; href: string; icon?: boolean };

/** The Explore column is generated from the same `nav` array the header renders,
 *  so the footer can never drift out of sync with the top navigation. Add a page
 *  to `nav` in lib/content.ts and it appears in both places. */
const cols: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Explore",
    // Flattened: a nav item's children are real pages, and the footer is where
    // people look when the dropdown has already closed on them.
    links: nav.flatMap((n) =>
      n.children
        ? n.children.map((c) => ({ label: c.label, href: c.href }))
        : [{ label: n.label, href: n.href }],
    ),
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Email us", href: `mailto:${site.email}` },
      { label: "Follow us on LinkedIn", href: site.linkedin, icon: true },
    ],
  },
];

/**
 * The footer sits on the grey ground, not on a dark block.
 *
 * It used to be a full-bleed slab of near-black, which was the last survivor of
 * the previous design: on a page that is now white panels floating on grey, an
 * inverted band at the bottom reads as a different site. Ending on the same
 * ground the page began on closes it properly, and the logo can appear in its
 * own colours instead of being knocked out to white.
 *
 * The container matches the panel width exactly so the footer columns line up
 * with the left edge of every panel above them.
 */
export function Footer() {
  return (
    <footer className="relative">
      <Container className="pb-16 pt-4 md:pb-20 md:pt-6">
        <div className="border-t border-border pt-12 md:pt-16">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <LogoMark />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted pretty">
                The home for clinicians building and shaping the future of
                healthcare. Founded by clinicians, for clinicians.
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-fg-subtle">
                {site.fullName}
              </p>
              <p className="mt-2 text-xs text-fg-subtle">
                ACNC registered charity &middot; ABN 41 664 194 307
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 gap-8">
              {cols.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent))]">
                    {col.heading}
                  </h4>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {col.links.map((l) => {
                      const external =
                        l.href.startsWith("http") || l.href.startsWith("mailto");
                      return (
                        <li key={l.label}>
                          {external ? (
                            <a
                              href={l.href}
                              {...(l.href.startsWith("http") && {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              })}
                              className="inline-flex items-center gap-1.5 text-fg-muted transition-colors hover:text-fg"
                            >
                              {l.icon && <Linkedin className="h-4 w-4 shrink-0" />}
                              {l.label}
                            </a>
                          ) : (
                            <Link
                              href={l.href}
                              className="text-fg-muted transition-colors hover:text-fg"
                            >
                              {l.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-12 max-w-3xl text-xs leading-relaxed text-fg-subtle">
            ASME acknowledges the Traditional Custodians of the lands on which we
            live and work, and pays respect to Elders past and present. We
            recognise their continuing connection to land, waters, and community.
          </p>

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="transition-colors hover:text-fg">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-fg">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
