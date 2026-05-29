"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "outline" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-500 via-magenta-500 to-amber-500 text-white shadow-glow hover:shadow-glow-fuchsia transition-shadow",
  ghost:
    "bg-transparent text-ink-700 dark:text-ink-100 hover:bg-ink-900/5 dark:hover:bg-white/5",
  outline:
    "bg-transparent border border-ink-200 dark:border-white/10 text-ink-800 dark:text-ink-100 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-300",
  subtle:
    "bg-ink-900/5 dark:bg-white/5 text-ink-800 dark:text-ink-100 hover:bg-ink-900/10 dark:hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-xl gap-1.5",
  md: "h-11 px-4 text-sm rounded-2xl gap-2",
  lg: "h-12 px-5 text-base rounded-2xl gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-tight focus-ring active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
