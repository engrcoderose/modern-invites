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
    <ScrollReveal className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 text-[0.7rem] font-bold uppercase tracking-[0.28em] ${
          isDark ? "text-champagne-light" : "text-eucalyptus-dark"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-instrumentSerif text-4xl leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-6xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            isDark ? "text-white/65" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
