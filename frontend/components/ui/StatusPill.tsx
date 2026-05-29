"use client";

import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "rose" | "indigo" | "neutral";

const tones: Record<Tone, { dot: string; ring: string; bg: string; text: string }> = {
  green: {
    dot: "bg-emerald-500",
    ring: "shadow-[0_0_0_3px_rgba(16,185,129,0.18)]",
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  amber: {
    dot: "bg-amber-500",
    ring: "shadow-[0_0_0_3px_rgba(245,158,11,0.18)]",
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
  },
  rose: {
    dot: "bg-rose-500",
    ring: "shadow-[0_0_0_3px_rgba(244,63,94,0.18)]",
    bg: "bg-rose-500/10",
    text: "text-rose-700 dark:text-rose-300",
  },
  indigo: {
    dot: "bg-brand-500",
    ring: "shadow-[0_0_0_3px_rgba(99,102,241,0.2)]",
    bg: "bg-brand-500/10",
    text: "text-brand-700 dark:text-brand-300",
  },
  neutral: {
    dot: "bg-ink-400",
    ring: "shadow-[0_0_0_3px_rgba(115,121,143,0.18)]",
    bg: "bg-ink-200/40 dark:bg-white/5",
    text: "text-ink-700 dark:text-ink-200",
  },
};

interface StatusPillProps {
  label: string;
  tone?: Tone;
  pulsing?: boolean;
  className?: string;
}

export function StatusPill({
  label,
  tone = "neutral",
  pulsing = false,
  className,
}: StatusPillProps) {
  const t = tones[tone];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
        t.bg,
        t.text,
        className,
      )}
    >
      <span className="relative flex items-center justify-center">
        {pulsing && (
          <span
            className={cn(
              "absolute inline-flex h-2 w-2 rounded-full opacity-75 animate-ping",
              t.dot,
            )}
          />
        )}
        <span
          className={cn("relative inline-flex h-2 w-2 rounded-full", t.dot, t.ring)}
        />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}
