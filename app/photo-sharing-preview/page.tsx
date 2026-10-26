import type { Metadata } from "next";
import Link from "next/link";
import { PhotoManagement } from "@/features/photo-sharing/presentation/photo-management";

export const metadata: Metadata = {
  title: "Photo Sharing Preview | Modern Invites",
  robots: { index: false, follow: false },
};

// Public, mock-only preview. It does not render the authenticated dashboard shell
// or expose real client events. The protected route composes the same workspace.
export default function PhotoSharingPreviewPage() {
  return <div className="min-h-screen bg-ivory"><header className="border-b border-black/10 bg-white"><nav aria-label="Preview navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"><Link href="/" className="min-h-11 py-2 font-elegant text-xl text-forest">Modern Invites</Link><span className="text-sm text-ink-muted">Photo sharing · Frontend preview</span></nav></header><main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"><PhotoManagement /></main></div>;
}
