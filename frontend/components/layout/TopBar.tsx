"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Github, BookOpen } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { brand } from "@/lib/brand";

interface TopBarProps {
  backendOnline: boolean | null;
}

export function TopBar({ backendOnline }: TopBarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme : "dark";
  const toggle = () => setTheme(current === "dark" ? "light" : "dark");

  return (
    <header
      data-testid="top-bar"
      className="sticky top-0 z-40 w-full"
    >
      <div className="absolute inset-0 -z-10 backdrop-blur-xl bg-white/40 dark:bg-ink-950/40 border-b hairline" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size={36} animated />
          <div className="flex flex-col leading-tight">
            <span
              className="font-display font-semibold text-[15px] tracking-tight text-ink-900 dark:text-ink-50"
              data-testid="brand-name"
            >
              {brand.name}
            </span>
            <span className="text-[11px] text-ink-500 dark:text-ink-300 font-medium tracking-wide hidden sm:block">
              {brand.tagline}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <StatusPill
            data-testid="topbar-backend-status"
            label={
              backendOnline === null
                ? "Checking…"
                : backendOnline
                ? "All systems normal"
                : "Backend offline"
            }
            tone={
              backendOnline === null
                ? "neutral"
                : backendOnline
                ? "green"
                : "rose"
            }
            pulsing={!!backendOnline}
            className="hidden md:inline-flex"
          />

          <a
            href={brand.social.docsUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="topbar-docs-link"
          >
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <BookOpen className="size-4" />
              <span>Docs</span>
            </Button>
          </a>

          <Button
            variant="subtle"
            size="sm"
            onClick={toggle}
            aria-label="Toggle theme"
            data-testid="theme-toggle-btn"
            className="w-9 px-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current}
                initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {current === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </header>
  );
}
