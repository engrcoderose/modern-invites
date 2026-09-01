import type { Metadata } from "next";

type InvitationMetadataOptions = {
  slug: string;
  title: string;
  description: string;
};

export function createInvitationMetadata({
  slug,
  title,
  description,
}: InvitationMetadataOptions): Metadata {
  const pathname = `/${slug}`;
  const imagePath = `${pathname}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type: "website",
      url: pathname,
      title,
      description,
      siteName: "Modern Invites",
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: `${title} invitation preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
    },
  };
}
