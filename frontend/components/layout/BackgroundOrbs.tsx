"use client";

import { motion } from "framer-motion";

export function BackgroundOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Light theme base gradient */}
      <div className="absolute inset-0 dark:hidden bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(60%_50%_at_100%_100%,rgba(217,70,239,0.14),transparent_60%),radial-gradient(40%_40%_at_0%_60%,rgba(245,158,11,0.12),transparent_60%)]" />
      {/* Dark theme base */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(50%_40%_at_100%_100%,rgba(217,70,239,0.18),transparent_55%),radial-gradient(40%_40%_at_0%_60%,rgba(245,158,11,0.10),transparent_55%)]" />

      <motion.div
        className="absolute top-[-10%] left-[10%] h-[420px] w-[420px] rounded-full bg-brand-500/30 blur-3xl"
        animate={{ x: [0, 60, -20, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[-8%] h-[480px] w-[480px] rounded-full bg-magenta-500/25 blur-3xl"
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[35%] h-[420px] w-[420px] rounded-full bg-amber-500/20 blur-3xl"
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] [background-image:linear-gradient(rgba(99,102,241,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
    </div>
  );
}
