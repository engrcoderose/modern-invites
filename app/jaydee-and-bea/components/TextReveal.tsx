import type { ReactNode } from "react";
import ScrollLayer from "./ScrollLayer";

interface TextRevealProps {
  children: ReactNode;
  as?: "p" | "h2" | "h3" | "h4" | "time";
  className?: string;
  id?: string;
  dateTime?: string;
  phase?: number;
  "aria-describedby"?: string;
}

// Text owns its timed entrance; the wrapper preserves the existing block layout.
export default function TextReveal({ as = "p", phase = 0, ...props }: TextRevealProps) {
  return <div><ScrollLayer as={as} profile="text" phase={phase} {...props} /></div>;
}
