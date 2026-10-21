import type { Metadata } from "next";
import Invitation from "./invitation";

export const metadata: Metadata = {
  title: "Adi & Jules | February 14, 2027",
  description: "A portfolio invitation featuring Adrian Miguel Reyes and Juliana Mae Villanueva, celebrating in Pasig City on February 14, 2027.",
  alternates: { canonical: "/adi-and-jules" },
};

export default function Page() {
  return <Invitation />;
}
