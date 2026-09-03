"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The founder's letter with progressive disclosure: shows the first couple of
 * paragraphs, then reveals the rest on demand. Keeps the section from becoming
 * a wall of text while preserving the full, authentic message.
 */
export function FounderLetter({
  paragraphs,
  preview = 2,
}: {
  paragraphs: readonly string[];
  preview?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? paragraphs : paragraphs.slice(0, preview);
  const hasMore = paragraphs.length > preview;

  return (
    <div className="mt-7">
      <div className="space-y-5">
        {shown.map((p) => (
          <p key={p} className="leading-relaxed text-fg-muted pretty">
            {p}
          </p>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue transition-colors hover:text-brand-blue-deep"
        >
          {expanded ? "Show less" : "Read the full message"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}
