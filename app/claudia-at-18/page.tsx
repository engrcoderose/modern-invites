import type { Metadata } from "next";
import { headers } from "next/headers";
import InvitationExperience from "@/components/sapphire-mist/InvitationExperience";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Claudia Turns Eighteen | A Sapphire Mist Debut";
  const description =
    "Join us for Claudia's eighteenth birthday—a magical night written in sapphire blue.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `${origin}/claudia-sapphire-mist-og.png`,
          width: 1200,
          height: 630,
          alt: "Claudia turns eighteen — A Night Written in Blue",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/claudia-sapphire-mist-og.png`],
    },
  };
}

export default function ClaudiaAt18() {
  return <InvitationExperience />;
}
