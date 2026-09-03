"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/LogoMark";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // Always opaque. It used to be transparent until scrolled, which let
        // page content run underneath the logo and the links.
        "sticky top-0 z-50 bg-[rgb(var(--ground))]",
        scrolled ? "border-b border-border" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-x-6 md:h-24">
        <Link href="/" className="flex shrink-0 items-center gap-2 -ml-1">
          <LogoMark />
          <span className="sr-only">ASME, home</span>
        </Link>

        {/* Desktop nav with dropdowns */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {nav.map((n) =>
            n.children ? (
              <div key={n.href} className="group relative">
                <Link
                  href={n.href}
                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg hover:bg-surface-subtle group-focus-within:text-fg"
                >
                  {n.label}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                {/* pt-2 keeps a hover bridge between trigger and panel */}
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 translate-y-1 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <ul className="min-w-[15rem] rounded-2xl border border-border bg-surface-elevated p-2 shadow-lift">
                    {n.children.map((c) => (
                      <li key={`${c.label}-${c.href}`}>
                        <Link
                          href={c.href}
                          className="block rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-subtle hover:text-fg"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg hover:bg-surface-subtle"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ButtonLink
            href={site.joinPath}
            variant="primary"
            size="md"
            className="hidden whitespace-nowrap sm:inline-flex"
          >
            Join ASME
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-elevated text-fg-muted"
          >
            <span
              className={cn(
                "block h-px w-4 bg-current transition-all",
                open ? "translate-y-0 rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute block h-px w-4 bg-current transition-all",
                open ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </div>
      </Container>

      {/* Mobile menu: parents with indented children */}
      <div
        className={cn(
          "xl:hidden overflow-hidden border-b border-border bg-surface/95 backdrop-blur-xl transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0",
        )}
      >
        <Container className="py-4 flex flex-col gap-1">
          {nav.map((n) => (
            <div key={n.href} className="flex flex-col">
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-fg hover:bg-surface-subtle"
              >
                {n.label}
              </Link>
              {n.children && (
                <div className="ml-3 flex flex-col border-l border-border pl-3">
                  {n.children.map((c) => (
                    <Link
                      key={`${c.label}-${c.href}`}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-1.5 text-sm text-fg-muted hover:bg-surface-subtle hover:text-fg"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <ButtonLink
            href={site.joinPath}
            onClick={() => setOpen(false)}
            variant="primary"
            size="lg"
            className="mt-2 self-start"
          >
            Join ASME
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
