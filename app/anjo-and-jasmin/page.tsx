import type { Metadata } from "next";
import InvitationExperience from "./InvitationExperience";
import "./wildflower.css";

export const metadata: Metadata = {
  title: "Anjo & Jasmin | 21 November 2026",
  description:
    "Together with their families, Anjo and Jasmin invite you to celebrate their wedding in Malabon on November 21, 2026.",
};

export default function AnjoAndJasminWedding() {
  return <InvitationExperience />;
}
