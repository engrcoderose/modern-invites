import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto w-full px-wedding-gutter",
  {
    variants: {
      size: {
        copy: "max-w-wedding-copy",
        content: "max-w-wedding-content",
        wide: "max-w-wedding-wide",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      size: "content",
    },
  },
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  ),
);

Container.displayName = "Container";

export { containerVariants };
