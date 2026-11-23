import type { ReactNode } from "react";
import ScrollReveal from "@/components/landing/ScrollReveal";

type Props = { lines: ReactNode[]; as?: "h1" | "h2" | "h3"; className?: string; id?: string };

export default function HeadingReveal({ lines, as: Heading = "h2", className = "section-title", id }: Props) {
  return (
    <Heading id={id} className={className}>
      {lines.map((line, index) => (
        <ScrollReveal as="span" key={index} delay={index * 0.08} distance={18} className="block">
          {line}{index < lines.length - 1 ? " " : null}
        </ScrollReveal>
      ))}
    </Heading>
  );
}
