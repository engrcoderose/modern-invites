import type { Metadata } from "next";
import OpeningPreview from "./components/OpeningPreview";

export const metadata: Metadata = {
  title: "Envelope Opening Preview | Modern Invites",
  description: "A standalone preview of a satin bow and gatefold invitation opening.",
  robots: { index: false, follow: false },
};

export default function OpeningPreviewPage() {
  return <OpeningPreview />;
}
