"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Camera, Heart, ImagePlus, Images } from "lucide-react";
import { useDemoAlbum } from "../application/use-demo-album";
import { demoAlbumDetails } from "../infrastructure/demo-album";
import { DemoNotice } from "./demo-notice";
import { AlbumIntroduction } from "./album-introduction";
import { AlbumGallery } from "./album-gallery";
import { PhotoLightbox } from "./photo-lightbox";
import { UploadPhotos } from "./upload-photos";
import styles from "./photo-sharing.module.css";

export function GuestAlbum() {
  const controller = useDemoAlbum();
  const { album, error } = controller;
  const [view, setView] = useState<"upload" | "gallery">("upload");
  const [selectedId, setSelectedId] = useState<string>();
  const photos = album?.settings.galleryVisible ? album.photos.filter(photo => photo.status === "approved") : [];
  return <div className={`${styles.album} min-h-screen px-4 pb-10 pt-4 sm:px-6`}>
    <div className="mx-auto max-w-5xl">
      <nav aria-label="Photo sharing preview" className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--album-line)] py-2 text-xs text-[var(--album-muted)]"><Link href="/" className="flex min-h-11 items-center gap-2 font-medium"><Camera aria-hidden="true" className="size-4" />Modern Invites</Link><Link href={demoAlbumDetails.previewPath} className="flex min-h-11 items-center gap-1 underline underline-offset-4">Manage demo album<ArrowUpRight aria-hidden="true" className="size-3.5" /></Link></nav>
      <AlbumIntroduction />
      <DemoNotice />
      <div className="mx-auto my-7 grid max-w-md grid-cols-2 gap-1 rounded-full bg-[var(--album-wash)] p-1.5" role="group" aria-label="Album view">
        {([{ key: "upload", label: "Share photos", icon: ImagePlus }, { key: "gallery", label: `The gallery${album ? ` (${photos.length})` : ""}`, icon: Images }] as const).map(item => <button key={item.key} type="button" aria-pressed={view === item.key} onClick={() => setView(item.key)} className={`flex min-h-12 items-center justify-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${view === item.key ? "bg-[var(--album-accent)] text-white" : "hover:bg-[var(--album-paper)]"}`}><item.icon aria-hidden="true" className="size-4" />{item.label}</button>)}
      </div>
      {error && <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-white p-4 text-sm text-red-800"><p>{error}</p><button type="button" className="mt-2 min-h-11 underline" onClick={() => { void controller.reload(); }}>Try loading again</button></div>}
      {!album ? <p role="status" className="py-12 text-center">{error ? "The demo album couldn’t be opened." : "Opening the album…"}</p> : view === "upload" ? <UploadPhotos controller={controller} /> : <AlbumGallery visible={album.settings.galleryVisible} photos={photos} onSelect={setSelectedId} onShare={() => setView("upload")} />}
      <footer className="mt-12 border-t border-[var(--album-line)] pt-7 text-center text-xs leading-6 text-[var(--album-muted)]"><Heart aria-hidden="true" className="mx-auto mb-3 size-4" strokeWidth={1.25} />Made for the memories. Made with Modern Invites.<br />Sample photography is for preview purposes.</footer>
      {selectedId && photos.some(photo => photo.id === selectedId) && <PhotoLightbox photos={photos} selectedId={selectedId} onSelect={setSelectedId} onClose={() => setSelectedId(undefined)} />}
    </div>
  </div>;
}
