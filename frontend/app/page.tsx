"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { HealthStatus, Reel, ReelConfig, Stats } from "@/lib/types";
import { TopBar } from "@/components/layout/TopBar";
import { CreatorRibbon } from "@/components/layout/CreatorRibbon";
import { BackgroundOrbs } from "@/components/layout/BackgroundOrbs";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { ConnectionHealth } from "@/components/dashboard/ConnectionHealth";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ReelsGrid } from "@/components/dashboard/ReelsGrid";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivitySection } from "@/components/dashboard/ActivitySection";
import { DeveloperTools } from "@/components/dashboard/DeveloperTools";
import { ConfigureModal } from "@/components/dashboard/ConfigureModal";
import { BrandedLoader } from "@/components/loading/BrandedLoader";
import { DashboardSkeleton } from "@/components/loading/DashboardSkeleton";
import { brand } from "@/lib/brand";

export default function Dashboard() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [bootLoading, setBootLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingReel, setEditingReel] = useState<Reel | null>(null);
  const [health, setHealth] = useState<HealthStatus>({
    backend: "checking",
    instagram: "checking",
    webhook: "configured",
    automation: "checking",
  });
  const [bootDone, setBootDone] = useState(false);
  const reelsAnchor = useRef<HTMLDivElement | null>(null);

  const refreshHealth = useCallback(
    async (currentReels?: Reel[], currentStats?: Stats | null) => {
      const backendOk = await api.health();
      const rs = currentReels ?? reels;
      const st = currentStats ?? stats;
      const totalReels = st?.total_reels ?? rs.length;

      setHealth({
        backend: backendOk ? "online" : "offline",
        instagram: backendOk
          ? totalReels > 0
            ? "connected"
            : "disconnected"
          : "disconnected",
        webhook: "configured",
        automation: (st?.configured ?? 0) > 0 ? "active" : "idle",
      });
    },
    [reels, stats],
  );

  const fetchData = useCallback(
    async (silent = false) => {
      if (!silent) setRefreshing(true);
      try {
        const [reelsRes, statsRes] = await Promise.all([
          api.getReels(),
          api.getStats(),
        ]);
        setReels(reelsRes.reels);
        setStats(statsRes);
        await refreshHealth(reelsRes.reels, statsRes);
      } catch (e) {
        console.error("Failed to fetch data:", e);
        await refreshHealth([], null);
      } finally {
        if (!silent) setRefreshing(false);
      }
    },
    [refreshHealth],
  );

  useEffect(() => {
    (async () => {
      await fetchData(true);
      setBootLoading(false);
      // Allow the dashboard to mount before removing loader overlay
      setTimeout(() => setBootDone(true), 350);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Periodic health check
  useEffect(() => {
    const id = setInterval(() => {
      refreshHealth();
    }, 30000);
    return () => clearInterval(id);
  }, [refreshHealth]);

  const handleSave = async (id: string, config: ReelConfig) => {
    await api.updateReel(id, config);
    await fetchData(true);
  };

  const handleScrollToReels = () => {
    reelsAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundOrbs />

      <AnimatePresence>
        {!bootDone && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <BrandedLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <CreatorRibbon />
      <TopBar backendOnline={health.backend === "online"} />

      <main className="relative mx-auto max-w-7xl px-4 md:px-8 pb-24">
        {bootLoading ? (
          <div className="pt-8">
            <DashboardSkeleton />
          </div>
        ) : (
          <>
            <HeroSection onScrollToReels={handleScrollToReels} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <ConnectionHealth
                status={health}
                onRefresh={() => fetchData(false)}
                refreshing={refreshing}
              />

              {stats && <StatsOverview stats={stats} />}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <QuickActions
                    apiUrl={api.baseUrl}
                    onRefresh={() => fetchData(false)}
                    refreshing={refreshing}
                  />
                </div>
                <div className="xl:col-span-1">
                  <ActivitySection reels={reels} />
                </div>
              </div>

              <div ref={reelsAnchor} className="scroll-mt-24">
                <ReelsGrid reels={reels} onOpenReel={(r) => setEditingReel(r)} />
              </div>

              <DeveloperTools />

              <footer className="pt-8 pb-2 text-center text-xs text-ink-500 dark:text-ink-300">
                <span className="font-medium">{brand.name}</span> · {brand.tagline}
                <span className="mx-2 text-ink-300 dark:text-ink-500">·</span>
                <span className="text-aurora font-semibold">
                  {brand.creator.label}
                </span>
              </footer>
            </motion.div>
          </>
        )}
      </main>

      <ConfigureModal
        reel={editingReel}
        onClose={() => setEditingReel(null)}
        onSave={handleSave}
      />
    </div>
  );
}
