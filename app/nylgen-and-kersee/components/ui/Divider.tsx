import * as React from "react";
import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  ornament?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ornament, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-center gap-4 text-wedding-sage",
        className,
      )}
      {...props}
    >
      <span className="h-px flex-1 bg-wedding-line/60" aria-hidden="true" />
      <span className="grid size-8 place-items-center" aria-hidden="true">
        {ornament ?? <Leaf className="size-4 stroke-[1.25]" />}
      </span>
      <span className="h-px flex-1 bg-wedding-line/60" aria-hidden="true" />
    </div>
  ),
);

Divider.displayName = "Divider";
