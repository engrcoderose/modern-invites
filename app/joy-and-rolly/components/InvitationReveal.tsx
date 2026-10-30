import type { ComponentProps } from "react";
import ScrollReveal from "@/components/landing/ScrollReveal";

export default function InvitationReveal(props: ComponentProps<typeof ScrollReveal>) {
  return <ScrollReveal direction="fade" distance={8} {...props} />;
}
