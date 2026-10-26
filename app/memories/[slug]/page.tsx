import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuestAlbum } from "@/features/photo-sharing/presentation/guest-album";
import { demoAlbumDetails } from "@/features/photo-sharing/infrastructure/demo-album";

export const metadata: Metadata = {
  title: "Guest Memories Demo | Modern Invites",
  description: "Preview the Modern Invites guest photo album.",
  robots: { index: false, follow: false },
};

export default async function GuestAlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== demoAlbumDetails.slug) notFound();
  return <GuestAlbum />;
}
