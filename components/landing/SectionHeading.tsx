import { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <ScrollReveal as="p"
        className={`mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] ${
          isDark ? "text-champagne-light" : "text-eucalyptus-dark"
        }`}
      >
        {eyebrow}
      </ScrollReveal>
      <ScrollReveal as="h2" delay={0.06}
        className={`font-instrumentSerif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </ScrollReveal>
      {description ? (
        <ScrollReveal as="p" delay={0.12}
          className={`mt-5 text-base leading-7 sm:text-lg ${
            isDark ? "text-white/65" : "text-ink-muted"
          }`}
        >
          {description}
        </ScrollReveal>
      ) : null}
    </div>
  );
}
