import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-wedding-control font-sans text-xs font-medium uppercase tracking-[0.16em] transition duration-300 ease-wedding-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-wedding-sage-deep text-wedding-paper shadow-wedding-card hover:-translate-y-0.5 hover:bg-wedding-sage",
        secondary:
          "border border-wedding-sage-deep bg-wedding-paper text-wedding-sage-deep hover:bg-wedding-mist",
        ghost:
          "text-wedding-sage-deep hover:bg-wedding-sage-soft/55",
        text:
          "rounded-none border-b border-wedding-line px-0 text-wedding-sage-deep hover:border-wedding-sage-deep",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-6",
        lg: "h-14 px-8",
        icon: "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ size, variant }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
