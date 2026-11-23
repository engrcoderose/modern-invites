import type { Metadata } from "next";
import lavenderEnvelope from "./sharing/lavender-envelope.png";

const title = "Portfolio | Modern Invites";
const description = "Explore our personalized wedding, debut, and celebration invitation websites. Find a style that feels like you and try the full experience.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    siteName: "Modern Invites",
    title,
    description,
    images: [{
      url: lavenderEnvelope.src,
      width: lavenderEnvelope.width,
      height: lavenderEnvelope.height,
      alt: "A lavender envelope with a violet seal — Modern Invites portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [lavenderEnvelope.src],
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
