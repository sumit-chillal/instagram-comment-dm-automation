"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { StatusPill } from "@/components/ui/StatusPill";
import {
  Server,
  Instagram,
  Webhook as WebhookIcon,
  Bot,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HealthStatus } from "@/lib/types";

interface ConnectionHealthProps {
  status: HealthStatus;
  onRefresh: () => void;
  refreshing?: boolean;
}

const items = [
  {
    key: "backend" as const,
    icon: Server,
    label: "Backend",
    online: "Online",
    offline: "Offline",
  },
  {
    key: "instagram" as const,
    icon: Instagram,
    label: "Instagram",
    online: "Connected",
    offline: "Disconnected",
  },
  {
    key: "webhook" as const,
    icon: WebhookIcon,
    label: "Webhook",
    online: "Verified",
    offline: "Unknown",
  },
  {
    key: "automation" as const,
    icon: Bot,
    label: "Automation",
    online: "Active",
    offline: "Idle",
  },
];

function toneFor(key: keyof HealthStatus, status: HealthStatus) {
  const v = status[key];
  if (v === "online" || v === "connected" || v === "configured" || v === "active")
    return "green" as const;
  if (v === "checking") return "neutral" as const;
  if (v === "idle" || v === "unknown") return "amber" as const;
  return "rose" as const;
}

function labelFor(key: keyof HealthStatus, status: HealthStatus, online: string, offline: string) {
  const v = status[key];
  if (v === "checking") return "Checking…";
  if (v === "online" || v === "connected" || v === "configured" || v === "active") return online;
  if (v === "idle") return "Idle";
  if (v === "unknown") return "Unknown";
  return offline;
}

export function ConnectionHealth({
  status,
  onRefresh,
  refreshing = false,
}: ConnectionHealthProps) {
  return (
    <GlassCard
      data-testid="connection-health-card"
      delay={0.05}
      className="overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
            Connection Health
          </h3>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Live status of every layer in your pipeline
          </p>
        </div>
        <Button
          data-testid="connection-health-refresh"
          variant="subtle"
          size="sm"
          onClick={onRefresh}
          disabled={refreshing}
          className="w-9 px-0"
          aria-label="Refresh health"
        >
          <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {items.map((it) => {
          const Icon = it.icon;
          const tone = toneFor(it.key, status);
          return (
            <li
              key={it.key}
              data-testid={`health-${it.key}`}
              className="group flex items-center justify-between gap-3 rounded-2xl border hairline px-4 py-3 bg-white/40 dark:bg-white/[0.02] hover:bg-white/60 dark:hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-aurora-soft text-ink-800 dark:text-ink-100">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-ink-900 dark:text-ink-50">
                    {it.label}
                  </div>
                </div>
              </div>
              <StatusPill
                label={labelFor(it.key, status, it.online, it.offline)}
                tone={tone}
                pulsing={tone === "green"}
              />
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
