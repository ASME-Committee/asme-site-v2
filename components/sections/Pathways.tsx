"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { pathways, type Pathway } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Pathways() {
  const [active, setActive] = useState<Pathway["id"]>("founder");
  const current = pathways.find((p) => p.id === active)!;

  return (
    <section id="pathways" className="section relative bg-surface-subtle">
      <Container>
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Career pathways</span>
          <h2 className="h-display mt-3 text-display-lg balance">
            What kind of clinician are you?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted pretty">
            Pick the role you're closest to today. ASME meets you there, and helps you move.
          </p>
        </Reveal>

        {/* Mobile: simple stacked cards (the tab/panel split doesn't work on phones) */}
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          {pathways.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <article className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tracking-wider text-brand-blue">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight text-fg">{p.title}</h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-fg-muted pretty">{p.pitch}</p>
                <ul className="mt-4 space-y-2">
                  {p.unlocks.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-sm text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                      {u}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Desktop: interactive tabs + panel */}
        <div className="mt-12 hidden gap-8 lg:grid lg:grid-cols-12">
          {/* Tab list */}
          <div className="lg:col-span-5">
            <ul role="tablist" className="relative flex flex-col border-l-2 border-border">
              {pathways.map((p) => {
                const isActive = p.id === active;
                return (
                  <li key={p.id} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="pathway-active"
                        className="absolute inset-y-0 -left-[2px] w-[2px] bg-brand-gradient"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        aria-hidden
                      />
                    )}
                    <button
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(p.id)}
                      className={cn(
                        "group relative flex w-full items-center justify-between py-5 pl-5 pr-3 text-left transition-colors",
                        isActive
                          ? "text-fg"
                          : "text-fg-muted hover:text-fg",
                      )}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={cn(
                            "font-mono text-xs tracking-wider transition-colors",
                            isActive ? "text-brand-blue" : "text-fg-subtle",
                          )}
                        >
                          {String(pathways.indexOf(p) + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-2xl tracking-tight md:text-3xl">
                          {p.title}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 transition-all",
                          isActive
                            ? "text-fg translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-0",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Content panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="card relative overflow-hidden p-8 md:p-10"
              >
                {/* Decorative gradient accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgb(43 88 224 / 0.45), transparent 60%)",
                  }}
                />

                <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
                  Pathway · {current.title}
                </p>
                <p className="mt-4 text-xl leading-relaxed text-fg pretty md:text-2xl">
                  {current.pitch}
                </p>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
                    What this unlocks
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {current.unlocks.map((u) => (
                      <li
                        key={u}
                        className="flex items-start gap-3 text-sm text-fg-muted"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                        <span className="text-fg">{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
