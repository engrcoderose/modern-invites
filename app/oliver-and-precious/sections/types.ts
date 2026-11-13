import type { ReactNode } from "react";

export type InvitationPage = {
  id: string;
  label: string;
  tone?: "olive" | "sage" | "woodland";
  content: ReactNode;
};
export type InvitationActions = {
  copyHashtag: () => Promise<void>;
  copied: boolean;
  copyError: boolean;
};

