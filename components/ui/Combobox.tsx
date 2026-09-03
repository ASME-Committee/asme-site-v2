"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * A searchable single-select. Built rather than pulled in because the project
 * has no headless-UI dependency and only one field needs it.
 *
 * Matching is substring, not prefix: typing "onc" should surface both
 * "Oncology" and "Radiation Oncology", which a native select's type-ahead
 * cannot do.
 *
 * The visible input is for searching only. The value that submits lives in a
 * hidden input, so a half-typed search string can never be submitted as an
 * answer. Anything not matching an option is cleared on blur.
 */
type Props = {
  name: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export function Combobox({ name, options, placeholder = "Search or select…", required, className }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const matches = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  // Close when focus or a click leaves the component.
  useEffect(() => {
    function onDocPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(selected);
      }
    }
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [selected]);

  // Keep the highlighted option in view while arrowing through a long list.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(value: string) {
    setSelected(value);
    setQuery(value);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActive((i) => {
        if (matches.length === 0) return 0;
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        return (next + matches.length) % matches.length;
      });
    } else if (e.key === "Enter") {
      if (open && matches[active]) {
        e.preventDefault();
        choose(matches[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(selected);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <input type="hidden" name={name} value={selected} />
      <div className="relative">
        <input
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && matches[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          required={required && !selected}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
            if (selected) setSelected("");
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={className}
        />
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
        />
      </div>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-border bg-surface-elevated py-1 shadow-lift"
        >
          {matches.length === 0 ? (
            <li className="px-4 py-2.5 text-sm text-fg-subtle">No match</li>
          ) : (
            matches.map((o, i) => (
              <li
                key={o}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={o === selected}
                onPointerDown={(e) => {
                  e.preventDefault();
                  choose(o);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm ${
                  i === active ? "bg-brand-blue/10 text-fg" : "text-fg-muted"
                }`}
              >
                {o}
                {o === selected && <Check className="h-4 w-4 shrink-0 text-brand-blue" />}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
