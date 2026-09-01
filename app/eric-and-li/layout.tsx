import type { ReactNode } from "react";

import { createInvitationMetadata } from "@/lib/invitation-metadata";

export const metadata = createInvitationMetadata({
  slug: "eric-and-li",
  title: "Eric & Li | June 20, 2030",
  description:
    "Join Eric and Li for their wedding celebration in Silang, Cavite on June 20, 2030.",
});

export default function EricAndLiLayout({ children }: { children: ReactNode }) {
  return children;
}
