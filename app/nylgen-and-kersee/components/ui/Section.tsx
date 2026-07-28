import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva("relative isolate overflow-hidden", {
  variants: {
    tone: {
      ivory: "bg-wedding-ivory text-wedding-ink",
      paper: "bg-wedding-paper text-wedding-ink",
      mist: "bg-wedding-mist text-wedding-ink",
      sage: "bg-wedding-sage text-wedding-paper",
      transparent: "bg-transparent",
    },
    spacing: {
      none: "",
      compact: "py-wedding-section-sm",
      default: "py-wedding-section",
    },
  },
  defaultVariants: {
    tone: "transparent",
    spacing: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, tone, spacing, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ tone, spacing }), className)}
      {...props}
    />
  ),
);

Section.displayName = "Section";

export { sectionVariants };
