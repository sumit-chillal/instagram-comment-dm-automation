"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Film, CheckCircle2, Sparkles } from "lucide-react";
import type { Stats } from "@/lib/types";

interface StatsOverviewProps {
  stats: Stats;
}

const cards = [
  {
    key: "total_reels" as const,
    label: "Total Reels",
    sub: "Detected on this account",
    icon: Film,
    accent: "from-brand-500/20 to-brand-500/0",
    iconColor: "text-brand-500",
    glow: "indigo" as const,
  },
  {
    key: "configured" as const,
    label: "Configured",
    sub: "With custom triggers",
    icon: CheckCircle2,
    accent: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-500",
    glow: "fuchsia" as const,
  },
  {
    key: "using_default" as const,
    label: "Using Default",
    sub: "Falling back to defaults",
    icon: Sparkles,
    accent: "from-magenta-500/20 to-magenta-500/0",
    iconColor: "text-magenta-500",
    glow: "amber" as const,
  },
];

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
      data-testid="stats-overview"
    >
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <GlassCard
            key={c.key}
            delay={0.1 + i * 0.06}
            glow={c.glow}
            interactive
            data-testid={`stat-card-${c.key}`}
            className="overflow-hidden"
          >
            <div
              className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${c.accent} blur-2xl`}
            />
            <div className="flex items-start justify-between">
              <span
                className={`inline-flex size-10 items-center justify-center rounded-2xl bg-white/70 dark:bg-white/5 ${c.iconColor}`}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-ink-400 dark:text-ink-300">
                {c.label}
              </span>
            </div>
            <div className="mt-6">
              <div className="font-display font-semibold text-5xl leading-none tracking-tight text-ink-900 dark:text-ink-50">
                <AnimatedCounter value={stats[c.key] ?? 0} />
              </div>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">
                {c.sub}
              </p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
