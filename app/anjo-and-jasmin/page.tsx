import type { Metadata } from "next";
import Invitation from "./invitation";

export const metadata: Metadata = {
  title: "Anjo & Jasmin | November 21, 2026",
  description: "Together with our families, join Anjo Caluya and Jasmin Sopera for a celebration of love in Malabon on November 21, 2026.",
  alternates: { canonical: "/anjo-and-jasmin" },
};

export default function Page() {
  return <Invitation />;
}
