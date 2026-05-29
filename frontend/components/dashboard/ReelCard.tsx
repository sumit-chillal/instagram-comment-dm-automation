"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { KeyRound, ExternalLink } from "lucide-react";
import type { Reel } from "@/lib/types";

interface ReelCardProps {
  reel: Reel;
  index: number;
  onClick: () => void;
}

export function ReelCard({ reel, index, onClick }: ReelCardProps) {
  return (
    <motion.button
      type="button"
      data-testid={`reel-card-${reel.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.05 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative text-left rounded-3xl overflow-hidden glass hairline border focus-ring transition-shadow hover:shadow-glow-fuchsia"
    >
      {/* Aurora glow ring on hover */}
      <span className="pointer-events-none absolute -inset-px rounded-3xl bg-aurora opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />

      <div className="relative aspect-[9/16] bg-ink-100 dark:bg-ink-800 overflow-hidden">
        {reel.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={reel.thumbnail_url}
            alt={reel.caption || "Reel"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-aurora-soft" />
        )}

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Status chip */}
        <div className="absolute top-3 left-3">
          {reel.config.active ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/95 text-white text-[11px] font-semibold px-2.5 py-1 shadow-lg">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 text-white text-[11px] font-semibold px-2.5 py-1 backdrop-blur">
              Inactive
            </span>
          )}
        </div>

        {/* Permalink */}
        {reel.permalink && (
          <a
            href={reel.permalink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 inline-flex size-7 items-center justify-center rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition-colors"
            aria-label="Open on Instagram"
          >
            <ExternalLink className="size-3.5" />
          </a>
        )}

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <p className="text-[12.5px] leading-snug line-clamp-2 font-medium">
            {reel.caption || "Untitled reel"}
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] rounded-full bg-white/15 backdrop-blur px-2 py-1 border border-white/15">
            <KeyRound className="size-3" />
            <span className="font-medium truncate max-w-[160px]">
              {reel.config.trigger_keyword || "no trigger"}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
