"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strong?: boolean;
  glow?: "indigo" | "fuchsia" | "amber" | "none";
  delay?: number;
  interactive?: boolean;
}

const glowMap = {
  indigo: "before:bg-brand-500/20",
  fuchsia: "before:bg-magenta-500/20",
  amber: "before:bg-amber-500/20",
  none: "",
};

export function GlassCard({
  children,
  strong = false,
  glow = "none",
  delay = 0,
  interactive = false,
  className,
  ...rest
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...(rest as any)}
      className={cn(
        "relative rounded-3xl p-6",
        strong ? "glass-strong" : "glass",
        "shadow-card-light dark:shadow-card-dark",
        interactive &&
          "transition-transform duration-300 hover:-translate-y-0.5",
        glow !== "none" &&
          "before:content-[''] before:absolute before:-inset-px before:rounded-3xl before:blur-2xl before:opacity-0 hover:before:opacity-60 before:transition-opacity before:-z-10",
        glowMap[glow],
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
