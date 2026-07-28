import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("text-balance text-wedding-sage-deep", {
  variants: {
    variant: {
      display: "font-wedding-display text-wedding-display font-normal",
      title: "font-wedding-display text-wedding-title font-normal",
      section: "font-wedding-display text-wedding-heading font-normal",
      script:
        "font-wedding-script text-wedding-title font-normal leading-[0.9]",
      eyebrow:
        "font-sans text-wedding-eyebrow font-medium uppercase text-wedding-sage",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "section",
    align: "left",
  },
});

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingElement;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = "h2",
      align,
      className,
      variant,
      ...props
    },
    ref,
  ) => (
    <Component
      ref={ref}
      className={cn(headingVariants({ align, variant }), className)}
      {...props}
    />
  ),
);

Heading.displayName = "Heading";

export { headingVariants };
