"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/lib/brand";

export function BrandedLoader() {
  return (
    <div
      data-testid="branded-loader"
      className="fixed inset-0 z-[60] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(50%_40%_at_80%_70%,rgba(217,70,239,0.20),transparent_60%),radial-gradient(40%_40%_at_20%_80%,rgba(245,158,11,0.18),transparent_60%)] dark:bg-[radial-gradient(60%_50%_at_50%_30%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(50%_40%_at_80%_70%,rgba(217,70,239,0.28),transparent_60%),radial-gradient(40%_40%_at_20%_80%,rgba(245,158,11,0.22),transparent_60%)] bg-white dark:bg-ink-950" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass-strong border hairline rounded-3xl px-8 py-7 sm:px-10 sm:py-8 shadow-card-dark text-center max-w-[92vw]"
      >
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Logo size={64} animated />
          </motion.div>
        </div>

        <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
          {brand.name}
        </h2>
        <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">
          {brand.tagline}
        </p>

        <div className="mt-6 mx-auto w-56 h-1.5 rounded-full overflow-hidden bg-ink-200/60 dark:bg-white/10">
          <motion.div
            className="h-full w-1/3 rounded-full bg-aurora"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-1.5 rounded-full bg-aurora"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
