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
      <ScrollReveal as="h2" delay={0.06}
        className={`section-title ${
          isDark ? "text-white" : "text-marketing-ink"
        }`}
      >
        {title}
      </ScrollReveal>
      {description ? (
        <ScrollReveal as="p" delay={0.12}
          className={`mt-5 text-base leading-7 sm:text-lg ${
            isDark ? "text-marketing-muted-inverse" : "text-marketing-muted"
          }`}
        >
          {description}
        </ScrollReveal>
      ) : null}
      <ScrollReveal as="p" delay={0.18} className={`mt-6 text-sm ${isDark ? "text-brand-100" : "text-brand-800"}`}>
        {eyebrow}
      </ScrollReveal>
    </div>
  );
}
