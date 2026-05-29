"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw, Link as LinkIcon, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

interface QuickActionsProps {
  apiUrl: string;
  onRefresh: () => void;
  refreshing?: boolean;
}

export function QuickActions({ apiUrl, onRefresh, refreshing }: QuickActionsProps) {
  const webhookUrl = `${apiUrl.replace(/\/$/, "")}/webhook`;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <GlassCard delay={0.14} className="overflow-hidden" data-testid="quick-actions-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-50">
            Quick Actions
          </h3>
          <p className="text-sm text-ink-500 dark:text-ink-300">
            Shortcuts you'll use every day
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-2xl border hairline bg-white/60 dark:bg-white/[0.02] px-3 py-2.5">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-aurora-soft">
              <LinkIcon className="size-4 text-brand-500" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-widest text-ink-400 dark:text-ink-300 font-semibold">
                Webhook URL
              </div>
              <div
                data-testid="quick-actions-webhook-url"
                className="text-xs sm:text-[13px] font-mono truncate text-ink-800 dark:text-ink-100"
              >
                {webhookUrl}
              </div>
            </div>
          </div>
          <Button
            data-testid="quick-actions-copy-webhook"
            onClick={copy}
            variant="subtle"
            size="sm"
          >
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            data-testid="quick-actions-refresh"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing…" : "Refresh reels"}
          </Button>
          <a
            href={brand.social.docsUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="quick-actions-docs"
          >
            <Button variant="outline" className="w-full">
              <BookOpen className="size-4" />
              Meta Graph docs
            </Button>
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
