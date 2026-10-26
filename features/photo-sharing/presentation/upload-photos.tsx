"use client";

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { Check, ImagePlus, RotateCcw, X } from "lucide-react";
import { MAX_ALBUM_BYTES, MAX_ALBUM_PHOTOS, MAX_BATCH_PHOTOS, PHOTO_MIME_TYPES, formatPhotoBytes, validatePhoto, type AlbumPhoto } from "../domain/photo-sharing";
import type { useDemoAlbum } from "../application/use-demo-album";
import { PhotoImage } from "./photo-image";
import styles from "./photo-sharing.module.css";

interface QueuedPhoto { id: string; file: File; status: "ready" | "checking" | "failed" | "done"; progress: number; error?: string }
type AlbumController = ReturnType<typeof useDemoAlbum>;

async function decodePhoto(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image(); image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) throw new Error("Invalid image");
  } finally { URL.revokeObjectURL(url); }
}

export function UploadPhotos({ controller }: { controller: AlbumController }) {
  const { album, busy, update } = controller;
  const [guestName, setGuestName] = useState("");
  const [caption, setCaption] = useState("");
  const [queue, setQueue] = useState<QueuedPhoto[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [working, setWorking] = useState(false);
  const [dragging, setDragging] = useState(false);
  const lock = useRef(false);
  const input = useRef<HTMLInputElement>(null);
  const remaining = queue.filter(item => item.status !== "done");
  const uploadsOpen = album?.settings.uploadsOpen ?? false;

  function selectFiles(files: File[]) {
    if (lock.current || !uploadsOpen) return;
    setMessage("");
    const problems: string[] = [];
    const selected: QueuedPhoto[] = [];
    for (const file of files) {
      const issue = validatePhoto(file);
      if (issue) { problems.push(issue); continue; }
      if (queue.some(item => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified) || selected.some(item => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified)) {
        problems.push(`${file.name}: already selected.`); continue;
      }
      if (remaining.length + selected.length >= MAX_BATCH_PHOTOS) { problems.push(`Choose up to ${MAX_BATCH_PHOTOS} photos per batch.`); break; }
      selected.push({ id: crypto.randomUUID(), file, status: "ready", progress: 0 });
    }
    setErrors(problems); setQueue(current => [...current.filter(item => item.status !== "done"), ...selected]);
  }

  function drop(event: DragEvent) { event.preventDefault(); setDragging(false); selectFiles(Array.from(event.dataTransfer.files)); }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (lock.current || busy || !uploadsOpen) return;
    if (!guestName.trim()) { setErrors(["Enter your name so the couple knows who shared these photos."]); return; }
    if (!remaining.length) { setErrors(["Choose at least one photo first."]); return; }
    lock.current = true; setWorking(true); setErrors([]); setMessage("");
    const valid: AlbumPhoto[] = [];
    const failed: string[] = [];
    try {
      for (const item of remaining) {
        setQueue(current => current.map(photo => photo.id === item.id ? { ...photo, status: "checking", progress: 25, error: undefined } : photo));
        try {
          await decodePhoto(item.file);
          valid.push({ id: item.id, guestName: guestName.trim(), caption: caption.trim(), fileName: item.file.name, size: item.file.size, createdAt: new Date().toISOString(), status: "pending", source: item.file });
          setQueue(current => current.map(photo => photo.id === item.id ? { ...photo, progress: 65 } : photo));
        } catch {
          failed.push(item.id);
          setQueue(current => current.map(photo => photo.id === item.id ? { ...photo, status: "failed", progress: 0, error: "This photo couldn’t be opened. Remove it and choose another, or retry." } : photo));
        }
      }
      if (!valid.length) return;
      let requiresReview = true;
      const saved = await update(current => {
        if (!current.settings.uploadsOpen) throw new Error("The couple has closed uploads. Your photos weren’t added.");
        if (current.photos.length + valid.length > MAX_ALBUM_PHOTOS) throw new Error(`This demo holds up to ${MAX_ALBUM_PHOTOS} photos. Remove some in management before adding more.`);
        const bytes = [...current.photos, ...valid].reduce((sum, photo) => sum + photo.size, 0);
        if (bytes > MAX_ALBUM_BYTES) throw new Error("This demo has a 200 MB browser-storage limit. Remove some photos in management and try again.");
        requiresReview = current.settings.moderationRequired;
        return { ...current, photos: [...valid.map(photo => ({ ...photo, status: requiresReview ? "pending" as const : "approved" as const })), ...current.photos] };
      });
      const ids = new Set(valid.map(photo => photo.id));
      setQueue(current => current.map(photo => ids.has(photo.id) ? { ...photo, status: saved ? "done" : "failed", progress: saved ? 100 : 0, error: saved ? undefined : "Not saved. Retry after resolving the storage message above." } : photo));
      if (saved) setMessage(`${valid.length} photo${valid.length === 1 ? "" : "s"} added to this browser’s demo album.${requiresReview ? " Waiting for approval in demo management." : " You can now see them in the gallery."}${failed.length ? " Some files need attention below." : ""}`);
    } finally { lock.current = false; setWorking(false); }
  }

  return <section aria-labelledby="upload-heading" className={`${styles.uploadPaper} grid overflow-hidden rounded-xl bg-white md:grid-cols-[.75fr_1.25fr]`}>
    <div className={`${styles.uploadNote} flex flex-col justify-between gap-6 p-6 sm:p-8 md:p-10`}>
      <div><h2 id="upload-heading" className="max-w-xs font-instrumentSerif text-4xl leading-tight sm:text-5xl">Share your moments</h2>
      <p className="mt-4 max-w-xs text-sm leading-7 text-[var(--album-muted)]">The little moments mean everything. Add your favorites to our wedding album.</p></div>
      <div className="hidden md:block"><span aria-hidden="true" className="font-imperial text-8xl leading-none text-[var(--album-accent)]">&</span><p className="mt-4 max-w-48 font-instrumentSerif text-2xl italic leading-8">A day full of love.<br />A thousand little memories.</p></div>
      <p className="border-t border-[var(--album-line)] pt-5 text-xs leading-6 text-[var(--album-muted)]">Your perspective is part of our story.</p>
    </div>
    <div className="p-6 sm:p-8 md:p-9">
    {!uploadsOpen && <p role="status" className="mb-6 rounded-lg bg-[var(--album-paper)] p-4 text-sm">Uploads are closed. You can still enjoy the gallery if the couple has enabled it.</p>}
    <form onSubmit={event => { void submit(event); }} className="space-y-6">
      <fieldset disabled={!uploadsOpen || working || busy} className="space-y-5 disabled:opacity-60">
        <label className="block text-sm font-medium">Your name <span className="font-normal">(required)</span><input name="guestName" value={guestName} onChange={event => setGuestName(event.target.value)} required maxLength={80} autoComplete="name" placeholder="How should we remember you?" className="mt-2 min-h-12 w-full rounded-lg border border-[var(--album-line)] bg-[var(--album-paper)] px-4 text-base placeholder:text-[var(--album-muted)]" /></label>
        <div onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop} className={`${styles.dropTarget} rounded-xl border border-dashed p-5 text-center sm:p-7 ${dragging ? "border-[var(--album-accent)] bg-[var(--album-wash)]" : "border-[var(--album-line)] bg-[var(--album-paper)]"}`}>
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--album-wash)] text-[var(--album-accent)]"><ImagePlus aria-hidden="true" className="size-6" strokeWidth={1.5} /></span>
          <p className="mt-4 font-instrumentSerif text-2xl">A memory worth keeping</p><p className="mt-2 text-sm leading-6 text-[var(--album-muted)]">Drop photos here, or choose from your phone.</p>
          <button type="button" onClick={() => input.current?.click()} className="mt-5 min-h-11 rounded-full bg-[var(--album-accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#7c2f49]">Choose photos</button>
          <input ref={input} type="file" multiple accept={PHOTO_MIME_TYPES.join(",")} onChange={event => { selectFiles(Array.from(event.target.files ?? [])); event.target.value = ""; }} aria-label="Choose photos to share" className="sr-only" tabIndex={-1} />
          <p className="mt-3 text-xs leading-5 text-[var(--album-muted)]">JPG, PNG, or WebP · Up to 10 photos at a time · 20 MB each<br />Photos only for now. Convert HEIC photos to JPG first.</p>
        </div>
        <label className="block text-sm font-medium">A little note <span className="font-normal">(optional)</span><textarea name="caption" value={caption} onChange={event => setCaption(event.target.value)} maxLength={300} rows={2} placeholder="Tell us about this moment…" className="mt-2 w-full resize-y rounded-lg border border-[var(--album-line)] bg-[var(--album-paper)] p-3 text-base placeholder:text-[var(--album-muted)]" /></label>
      </fieldset>
      {errors.length > 0 && <ul role="alert" className="list-inside list-disc space-y-1 break-words text-sm text-red-800">{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>}
      {queue.length > 0 && <ul aria-label="Selected photos" className="space-y-3">{queue.map(item => <li key={item.id} className="flex items-start gap-3 border-b border-[var(--album-line)] pb-3">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[var(--album-paper)]"><PhotoImage photo={{ id: item.id, source: item.file, guestName: guestName || "you", caption: "", fileName: item.file.name, size: item.file.size, createdAt: "", status: "pending" }} sizes="64px" /></div>
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.file.name}</p><p className="text-xs text-[var(--album-muted)]">{formatPhotoBytes(item.file.size)} · {item.status === "done" ? "Added to demo" : item.status === "checking" ? "Checking and saving locally…" : item.status === "failed" ? "Needs attention" : "Ready to add"}</p>{item.status === "checking" && <progress aria-label={`Local progress for ${item.file.name}`} max={100} value={item.progress} className="mt-2 h-2 w-full accent-[var(--album-accent)]" />}{item.error && <p className="mt-1 text-xs leading-5 text-red-800">{item.error}</p>}</div>
        {item.status === "done" ? <Check aria-label="Added" className="size-5 shrink-0" /> : <button type="button" disabled={working || busy} onClick={() => setQueue(current => current.filter(photo => photo.id !== item.id))} aria-label={`Remove ${item.file.name}`} className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-[#f6e3ea]"><X aria-hidden="true" className="size-4" /></button>}
      </li>)}</ul>}
      {message && <p role="status" className="rounded-lg bg-[var(--album-paper)] p-4 text-sm leading-6">{message}</p>}
      <button type="submit" disabled={!uploadsOpen || working || busy || !remaining.length} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--album-accent)] px-5 font-semibold text-white transition-colors hover:bg-[#7c2f49] disabled:cursor-not-allowed disabled:opacity-50">{remaining.some(item => item.status === "failed") && <RotateCcw aria-hidden="true" className="size-4" />}{working ? "Adding to demo album…" : remaining.some(item => item.status === "failed") ? "Retry remaining photos" : "Add to demo album"}</button>
      <p className="text-center text-xs leading-5 text-[var(--album-muted)]">{album?.settings.moderationRequired ? "Photos need the couple’s approval before appearing in the gallery." : "Photos appear in the gallery after they’re added."} Only share photos you have permission to share.</p>
    </form>
    </div>
  </section>;
}
