import type { ReactNode } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/landing/ScrollReveal";
import butterfly from "@/components/landing/assets/hero/butterfly.webp";

export default function StudioHeading({ children, description, id, ornament = false }: { children: ReactNode; description?: ReactNode; id?: string; ornament?: boolean }) {
  return (
    <ScrollReveal className="relative mx-auto max-w-3xl text-center">
      {ornament && <Image src={butterfly} alt="" sizes="80px" className="mx-auto mb-5 h-16 w-20 object-contain sm:h-20" />}
      <h2 id={id} className="section-title text-marketing-ink">{children}</h2>
      {description && <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-marketing-muted">{description}</p>}
    </ScrollReveal>
  );
}
