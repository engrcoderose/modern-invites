"use client";

import type { PropsWithChildren } from "react";
import { MotionConfig } from "framer-motion";

import { cn } from "@/lib/utils";

type WeddingThemeProviderProps = PropsWithChildren<{
  className?: string;
}>;

export function WeddingThemeProvider({
  children,
  className,
}: WeddingThemeProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "wedding-theme min-h-screen bg-wedding-ivory text-wedding-ink",
          className,
        )}
      >
        {children}
      </div>
    </MotionConfig>
  );
}
