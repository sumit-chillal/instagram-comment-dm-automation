"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Inbox } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ReelCard } from "@/components/dashboard/ReelCard";
import type { Reel } from "@/lib/types";

type FilterMode = "all" | "active" | "inactive";

interface ReelsGridProps {
  reels: Reel[];
  onOpenReel: (reel: Reel) => void;
}

export function ReelsGrid({ reels, onOpenReel }: ReelsGridProps) {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<FilterMode>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reels.filter((r) => {
      if (mode === "active" && !r.config.active) return false;
      if (mode === "inactive" && r.config.active) return false;
      if (!q) return true;
      return (
        r.caption?.toLowerCase().includes(q) ||
        r.config.trigger_keyword?.toLowerCase().includes(q)
      );
    });
  }, [reels, query, mode]);

  return (
    <GlassCard
      delay={0.2}
      className="overflow-hidden"
      data-testid="reels-grid-card"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
            Configured Reels
          </h3>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Click any reel to edit its automation flow
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-400" />
            <input
              data-testid="reels-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reels or keywords…"
              className="w-full sm:w-64 h-10 pl-9 pr-3 rounded-2xl bg-white/70 dark:bg-white/5 border hairline text-sm placeholder:text-ink-400 text-ink-900 dark:text-ink-50 focus-ring focus:border-brand-400"
            />
          </div>
          <div className="inline-flex rounded-2xl bg-white/70 dark:bg-white/5 border hairline p-1 text-xs">
            {(["all", "active", "inactive"] as FilterMode[]).map((m) => (
              <button
                key={m}
                data-testid={`reels-filter-${m}`}
                onClick={() => setMode(m)}
                className={`px-3 h-8 rounded-xl font-medium transition-colors capitalize ${
                  mode === m
                    ? "bg-aurora text-white shadow-glow"
                    : "text-ink-600 dark:text-ink-200 hover:text-ink-900 dark:hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState hasReels={reels.length > 0} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map((reel, i) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={i}
              onClick={() => onOpenReel(reel)}
            />
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function EmptyState({ hasReels }: { hasReels: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="size-14 rounded-2xl bg-aurora-soft flex items-center justify-center mb-4">
        <Inbox className="size-6 text-brand-500" />
      </div>
      <h4 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
        {hasReels ? "Nothing matches that filter" : "No reels detected yet"}
      </h4>
      <p className="mt-1 text-sm text-ink-500 dark:text-ink-300 max-w-md">
        {hasReels
          ? "Try clearing the search or switching filters."
          : "Connect your Instagram Business account and post a reel — it will appear here automatically."}
      </p>
    </div>
  );
}
