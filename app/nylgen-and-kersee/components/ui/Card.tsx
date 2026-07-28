import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-wedding", {
  variants: {
    variant: {
      elevated:
        "border border-wedding-line/35 bg-wedding-paper/90 shadow-wedding-card backdrop-blur-sm",
      outlined: "border border-wedding-line/70 bg-wedding-paper/45",
      soft: "border border-transparent bg-wedding-mist/80",
      transparent: "border border-transparent bg-transparent",
    },
    padding: {
      none: "",
      sm: "p-5 sm:p-6",
      md: "p-6 sm:p-8",
      lg: "p-8 sm:p-10 lg:p-12",
    },
  },
  defaultVariants: {
    variant: "elevated",
    padding: "md",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export { cardVariants };
