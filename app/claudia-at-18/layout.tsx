import type { ReactNode } from "react";

import { createInvitationMetadata } from "@/lib/invitation-metadata";

export const metadata = createInvitationMetadata({
  slug: "claudia-at-18",
  title: "Claudia at 18",
  description: "You are invited to celebrate Claudia's 18th birthday.",
});

export default function ClaudiaAt18Layout({ children }: { children: ReactNode }) {
  return children;
}
