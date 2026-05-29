"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";

interface HeroSectionProps {
  onConfigureFirst?: () => void;
  onScrollToReels?: () => void;
}

export function HeroSection({ onScrollToReels }: HeroSectionProps) {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-10 pb-6 md:pt-16 md:pb-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-ink-700 dark:text-ink-200 mb-5">
          <Sparkles className="size-3.5 text-magenta-500" />
          <span>Real-time Instagram automation</span>
        </div>

        <h1 className="font-display tracking-tight text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] text-ink-900 dark:text-ink-50">
          {brand.tagline.split(" Into ")[0]}{" "}
          <span className="text-aurora">Into Conversations</span>
        </h1>

        <p className="mt-5 text-base md:text-lg text-ink-600 dark:text-ink-300 max-w-2xl">
          {brand.name} listens to every comment on your reels and replies with a
          personalized DM in milliseconds — no scripts, no copy-paste, just flow.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button
            data-testid="hero-cta-configure"
            size="lg"
            onClick={onScrollToReels}
          >
            <Zap className="size-4" />
            Configure your reels
          </Button>
          <a
            href={brand.social.docsUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-cta-docs"
          >
            <Button variant="outline" size="lg">
              Read the docs
              <ArrowUpRight className="size-4" />
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
