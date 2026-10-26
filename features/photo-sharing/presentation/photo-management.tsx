"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Check, EyeOff, Images, Search, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoAlbum } from "../application/use-demo-album";
import { MAX_ALBUM_BYTES, formatPhotoBytes, type PhotoStatus } from "../domain/photo-sharing";
import { demoAlbumDetails } from "../infrastructure/demo-album";
import { DemoNotice } from "./demo-notice";
import { AlbumSettings } from "./album-settings";
import { AlbumSharing } from "./album-sharing";
import { ManagementPhotoCard } from "./management-photo-card";
import { PhotoLightbox } from "./photo-lightbox";
import styles from "./photo-sharing.module.css";

const filters = [{ value: "all", label: "All photos" }, { value: "pending", label: "Needs review" }, { value: "approved", label: "Approved" }, { value: "hidden", label: "Hidden" }] as const;

export function PhotoManagement() {
  const controller = useDemoAlbum();
  const { album, busy, error, update } = controller;
  const [filter, setFilter] = useState<"all" | PhotoStatus>("all");
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const photos = album?.photos ?? [];
  const visible = photos.filter(photo => (filter === "all" || photo.status === filter) && `${photo.guestName} ${photo.caption} ${photo.fileName}`.toLowerCase().includes(query.trim().toLowerCase()));
  const selected = selection.filter(id => visible.some(photo => photo.id === id));
  const bytes = photos.reduce((sum, photo) => sum + photo.size, 0);

  async function moderate(ids: string[], status: PhotoStatus) {
    const saved = await update(current => ({ ...current, photos: current.photos.map(photo => ids.includes(photo.id) ? { ...photo, status } : photo) }));
    if (saved) { setSelection([]); setMessage(`${ids.length} photo${ids.length === 1 ? "" : "s"} ${status === "approved" ? "approved" : "hidden"} in this demo.`); }
  }
  async function remove() {
    const saved = await update(current => ({ ...current, photos: current.photos.filter(photo => !deleteIds.includes(photo.id)) }));
    if (saved) { setMessage(`${deleteIds.length} photo${deleteIds.length === 1 ? "" : "s"} removed from this demo.`); setDeleteIds([]); setSelection([]); }
  }

  return <div className={`${styles.management} text-ink`}>
    <header className="flex flex-col items-start justify-between gap-6 rounded-xl bg-forest p-6 text-ivory sm:flex-row sm:items-center sm:p-8"><div className="flex items-center gap-4"><span className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-ivory/25 sm:flex"><Camera aria-hidden="true" className="size-6" strokeWidth={1.5} /></span><div><h1 className="font-elegant text-3xl sm:text-4xl">Photo sharing</h1><p className="mt-2 text-sm leading-6 text-marketing-muted-inverse">{demoAlbumDetails.names} · Demo wedding album</p></div></div><Button asChild className="min-h-11 rounded-full bg-ivory px-5 text-forest shadow-none hover:bg-white"><Link href={demoAlbumDetails.guestPath}><Upload aria-hidden="true" />Try guest upload</Link></Button></header>
    <div className="mt-5 text-forest"><DemoNotice /></div>
    {error && <div role="alert" className="mt-5 rounded-lg border border-red-200 bg-white p-4 text-sm text-red-800"><p>{error}</p>{!album && <button type="button" className="mt-2 min-h-11 underline" onClick={() => { void controller.reload(); }}>Try loading again</button>}</div>}
    {!album ? <p role="status" className="py-12">{error ? "The demo album couldn’t be opened." : "Opening the demo workspace…"}</p> : <>
      <dl className="my-7 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-black/10 py-5 sm:grid-cols-4">{[{ label: "Total photos", value: photos.length }, { label: "Needs review", value: photos.filter(photo => photo.status === "pending").length }, { label: "Approved", value: photos.filter(photo => photo.status === "approved").length }, { label: "Contributors", value: new Set(photos.map(photo => photo.guestName.toLowerCase())).size }].map(item => <div key={item.label}><dt className="text-xs text-ink-muted">{item.label}</dt><dd className="mt-1 text-2xl font-medium tabular-nums text-forest">{item.value}</dd></div>)}</dl>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-10">
        <section aria-labelledby="photos-heading" className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="photos-heading" className="font-elegant text-2xl text-forest">Guest memories</h2><p className="text-xs text-ink-muted">Select a photo to view and download.</p></div>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter photos by status">{filters.map(item => <button key={item.value} type="button" aria-pressed={filter === item.value} onClick={() => { setFilter(item.value); setSelection([]); }} className={`min-h-11 rounded-full border px-4 text-sm ${filter === item.value ? "border-forest bg-forest text-white" : "border-black/10 bg-white text-forest hover:bg-sage-50"}`}>{item.label} <span className="ml-1 tabular-nums">{item.value === "all" ? photos.length : photos.filter(photo => photo.status === item.value).length}</span></button>)}</div>
          <label className="relative mt-4 block"><Search aria-hidden="true" className="absolute left-3 top-3.5 size-4 text-ink-muted" /><span className="sr-only">Search by guest, note, or filename</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setSelection([]); }} placeholder="Search by guest, note, or filename" className="min-h-12 w-full rounded-lg border border-black/15 bg-white pl-10 pr-4 text-base placeholder:text-ink-muted" /></label>
          <div className="mt-4 flex min-h-11 flex-wrap items-center gap-3">{visible.length > 0 && <label className="flex min-h-11 cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={visible.length > 0 && selected.length === visible.length} onChange={event => setSelection(event.target.checked ? visible.map(photo => photo.id) : [])} disabled={busy} className="size-4 accent-forest" />{selected.length ? `${selected.length} selected` : "Select all shown"}</label>}{selected.length > 0 && <><Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => { void moderate(selected, "approved"); }} className="min-h-11 bg-white"><Check aria-hidden="true" />Approve</Button><Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => { void moderate(selected, "hidden"); }} className="min-h-11 bg-white"><EyeOff aria-hidden="true" />Hide</Button><Button type="button" size="sm" variant="outline" disabled={busy} onClick={() => setDeleteIds(selected)} className="min-h-11 bg-white text-red-800"><Trash2 aria-hidden="true" />Delete</Button></>}</div>
          <p role="status" className="my-3 text-sm text-forest">{message}</p>
          {deleteIds.length > 0 && <div role="region" aria-label="Confirm photo deletion" className="mb-5 rounded-lg border border-red-200 bg-white p-4"><p className="text-sm leading-6">Delete {deleteIds.length} {deleteIds.length === 1 ? "photo" : "photos"} from this demo? This cannot be undone.</p><div className="mt-3 flex gap-2"><Button type="button" variant="destructive" disabled={busy} className="min-h-11" onClick={() => { void remove(); }}>Delete photos</Button><Button type="button" variant="outline" disabled={busy} className="min-h-11" onClick={() => setDeleteIds([])}>Cancel</Button></div></div>}
          {visible.length ? <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">{visible.map(photo => (
            <ManagementPhotoCard
              key={photo.id}
              photo={photo}
              selected={selected.includes(photo.id)}
              busy={busy}
              onSelect={checked => setSelection(current => checked ? [...current, photo.id] : current.filter(id => id !== photo.id))}
              onView={() => setSelectedId(photo.id)}
              onModerate={status => { void moderate([photo.id], status); }}
              onDelete={() => setDeleteIds([photo.id])}
            />
          ))}</div> : <div className="rounded-xl border border-dashed border-black/20 py-16 text-center"><Images aria-hidden="true" className="mx-auto size-8 text-eucalyptus-dark" /><h3 className="mt-4 font-elegant text-2xl text-forest">{photos.length ? "No matching photos" : "Ready for the first memory"}</h3><p className="mx-auto mt-2 max-w-xs px-4 text-sm leading-6 text-ink-muted">{photos.length ? "Try a different search or status filter." : "Open the guest album to add a photo to this demo."}</p>{photos.length > 0 && <button type="button" onClick={() => { setQuery(""); setFilter("all"); }} className="mt-3 min-h-11 text-sm font-medium text-forest underline">Show all photos</button>}</div>}
        </section>
        <aside aria-label="Album controls" className="space-y-7 rounded-xl bg-white p-5"><AlbumSettings controller={controller} /><AlbumSharing /><section className="border-t border-black/10 pt-6"><h2 className="font-elegant text-xl text-forest">Browser storage</h2><p className="mt-2 text-sm tabular-nums">{formatPhotoBytes(bytes)} of {formatPhotoBytes(MAX_ALBUM_BYTES)} demo limit</p><progress aria-label="Demo browser storage used" max={MAX_ALBUM_BYTES} value={bytes} className="mt-3 h-2 w-full accent-forest" /><p className="mt-2 text-xs leading-5 text-ink-muted">Sample sizes are illustrative. Added files use browser storage; clearing site data removes them. This demo supports up to 100 photos.</p></section></aside>
      </div>
      {selectedId && photos.some(photo => photo.id === selectedId) && <PhotoLightbox photos={photos} selectedId={selectedId} onSelect={setSelectedId} onClose={() => setSelectedId(undefined)} />}
    </>}
  </div>;
}
