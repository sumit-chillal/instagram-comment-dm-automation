"use client";

import { Activity, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Reel } from "@/lib/types";

interface ActivitySectionProps {
  reels: Reel[];
}

export function ActivitySection({ reels }: ActivitySectionProps) {
  const recent = reels.slice(0, 5);

  return (
    <GlassCard delay={0.22} className="h-full" data-testid="activity-section-card">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-aurora-soft">
          <Activity className="size-4 text-brand-500" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
            Automation Activity
          </h3>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Latest configured reels
          </p>
        </div>
      </div>

      {recent.length === 0 ? (
        <div className="rounded-2xl border hairline bg-white/40 dark:bg-white/[0.02] p-6 text-center">
          <Sparkles className="mx-auto size-5 text-magenta-500 mb-2" />
          <p className="text-sm text-ink-500 dark:text-ink-300">
            No activity yet — configure a reel to start the flow.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {recent.map((r) => (
            <li
              key={r.id}
              data-testid={`activity-item-${r.id}`}
              className="flex items-center gap-3 rounded-2xl border hairline bg-white/40 dark:bg-white/[0.02] px-3 py-2"
            >
              {r.thumbnail_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={r.thumbnail_url}
                  alt=""
                  className="size-9 rounded-lg object-cover border hairline shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-medium text-ink-900 dark:text-ink-50 truncate">
                  {r.caption || "Untitled reel"}
                </div>
                <div className="text-[11px] text-ink-500 dark:text-ink-300 truncate">
                  Trigger: <span className="font-mono">{r.config.trigger_keyword || "—"}</span>
                </div>
              </div>
              <span
                className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${
                  r.config.active
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-ink-400/15 text-ink-600 dark:text-ink-300"
                }`}
              >
                {r.config.active ? "Active" : "Paused"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}
