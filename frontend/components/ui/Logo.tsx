"use client";

import { motion } from "framer-motion";
import { brand } from "@/lib/brand";

interface LogoProps {
  size?: number;
  animated?: boolean;
}

export function Logo({ size = 36, animated = false }: LogoProps) {
  return (
    <motion.div
      initial={animated ? { rotate: -8, scale: 0.9, opacity: 0 } : false}
      animate={animated ? { rotate: 0, scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={`${brand.name} logo`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cflow-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="55%" stopColor="#D946EF" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="cflow-blur">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
        {/* Outer rounded square */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="11"
          fill="url(#cflow-grad)"
          opacity="0.95"
        />
        {/* Inner mark: stylized comment/loop */}
        <path
          d="M12 16.5C12 14.5 13.6 13 15.5 13H24.5C26.4 13 28 14.5 28 16.5V21.5C28 23.5 26.4 25 24.5 25H19.2L16.2 27.4C15.6 27.9 14.8 27.5 14.8 26.7V25H15.5C13.6 25 12 23.5 12 21.5V16.5Z"
          fill="white"
          fillOpacity="0.95"
        />
        <circle cx="17" cy="19" r="1.4" fill="url(#cflow-grad)" />
        <circle cx="20" cy="19" r="1.4" fill="url(#cflow-grad)" />
        <circle cx="23" cy="19" r="1.4" fill="url(#cflow-grad)" />
      </svg>

      {animated && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(217,70,239,0.45), transparent 60%)",
            filter: "blur(12px)",
          }}
          initial={{ opacity: 0.0 }}
          animate={{ opacity: [0.0, 0.5, 0.0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
