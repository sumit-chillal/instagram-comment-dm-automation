"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { brand } from "@/lib/brand";

/**
 * Slim "Powered by …" ribbon shown above the top bar.
 * One source of truth — edit `creator` in /lib/brand.ts to change.
 */
export function CreatorRibbon() {
  const { creator } = brand;
  if (!creator?.label) return null;

  const content = (
    <span className="inline-flex items-center gap-2">
      <Sparkles className="size-3 text-amber-400" />
      <span className="font-medium">{creator.label}</span>
      <span className="hidden sm:inline text-white/60">
        · {brand.name} v1.0
      </span>
    </span>
  );

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      data-testid="creator-ribbon"
      className="relative z-50 w-full text-center text-[11.5px] tracking-wide text-white bg-aurora"
    >
      <div className="mx-auto max-w-7xl px-4 py-1.5">
        {creator.url ? (
          <a
            href={creator.url}
            target="_blank"
            rel="noreferrer"
            className="hover:underline underline-offset-4"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </motion.div>
  );
}
