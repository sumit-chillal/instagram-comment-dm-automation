"use client";

import { Shimmer } from "@/components/ui/Shimmer";
import { GlassCard } from "@/components/ui/GlassCard";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" data-testid="dashboard-skeleton">
      {/* Hero */}
      <div className="space-y-3 max-w-2xl">
        <Shimmer className="h-5 w-40 rounded-full" />
        <Shimmer className="h-10 w-3/4" />
        <Shimmer className="h-10 w-1/2" />
        <Shimmer className="h-5 w-2/3 mt-3" />
      </div>

      {/* Connection Health */}
      <GlassCard className="overflow-hidden">
        <Shimmer className="h-5 w-44 mb-1.5" />
        <Shimmer className="h-3.5 w-72 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-14 rounded-2xl" />
          ))}
        </div>
      </GlassCard>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <GlassCard key={i} className="overflow-hidden">
            <Shimmer className="size-10 rounded-2xl mb-6" />
            <Shimmer className="h-10 w-24 mb-2" />
            <Shimmer className="h-3.5 w-40" />
          </GlassCard>
        ))}
      </div>

      {/* Reels grid */}
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <Shimmer className="h-5 w-40" />
            <Shimmer className="h-3.5 w-56" />
          </div>
          <Shimmer className="h-10 w-64 rounded-2xl" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Shimmer key={i} className="aspect-[9/16] rounded-3xl" />
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
