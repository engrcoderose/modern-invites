import type { Metadata } from "next";
import { PhotoManagement } from "@/features/photo-sharing/presentation/photo-management";

export const metadata: Metadata = {
  title: "Photo Sharing Demo | Modern Invites",
  robots: { index: false, follow: false },
};

export default function PhotoSharingPage() {
  return <PhotoManagement />;
}
