import type { ReactNode } from "react";
import ScrollScene from "./ScrollScene";
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

// Each block settles before it reaches the reading area, with no movement on exit.
export default function TextReveal({ as = "p", phase = 0, ...props }: TextRevealProps) {
  return <ScrollScene as="div" reveal><ScrollLayer as={as} profile="text" phase={phase} {...props} /></ScrollScene>;
}
