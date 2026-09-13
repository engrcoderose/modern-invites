import type { ReactNode } from "react";

import { createInvitationMetadata } from "@/lib/invitation-metadata";

export const metadata = createInvitationMetadata({
  slug: "stephanie-at-18",
  title: "Stephanie at 18 | September 9, 2023",
  description: "Celebrate Stephanie's 18th birthday with an evening of treasured moments.",
});

export default function StephanieAt18Layout({ children }: { children: ReactNode }) {
  return children;
}
