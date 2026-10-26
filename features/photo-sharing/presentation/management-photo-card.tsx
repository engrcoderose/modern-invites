"use client";

import { Check, EyeOff, Trash2 } from "lucide-react";
import type { AlbumPhoto, PhotoStatus } from "../domain/photo-sharing";
import { PhotoImage } from "./photo-image";

const statusNames = { pending: "Needs review", approved: "Approved", hidden: "Hidden" };
const statusClasses = {
  pending: "bg-amber-50 text-amber-900",
  approved: "bg-sage-50 text-forest",
  hidden: "bg-ivory text-ink-muted",
};
// Two columns until xl; desktop reserves 304px for controls and a 40px gap.
const photoSizes = "(max-width: 639px) calc((100vw - 48px) / 2), (max-width: 1023px) calc((100vw - 64px) / 2), (max-width: 1279px) calc((100vw - 424px) / 2), 280px";

interface ManagementPhotoCardProps {
  photo: AlbumPhoto;
  selected: boolean;
  busy: boolean;
  onSelect: (checked: boolean) => void;
  onView: () => void;
  onModerate: (status: PhotoStatus) => void;
  onDelete: () => void;
}

export function ManagementPhotoCard({ photo, selected, busy, onSelect, onView, onModerate, onDelete }: ManagementPhotoCardProps) {
  return (
    <article className={`min-w-0 overflow-hidden rounded-xl border bg-white transition-colors ${selected ? "border-forest" : "border-black/10 hover:border-eucalyptus/60"}`}>
      <div className="relative">
        <button type="button" onClick={onView} aria-label={`View ${photo.fileName} by ${photo.guestName}`} className="relative block aspect-[4/3] w-full bg-sage-50">
          <PhotoImage photo={photo} sizes={photoSizes} />
        </button>
        <label className="absolute left-2 top-2 flex size-11 cursor-pointer items-center justify-center rounded-lg bg-white">
          <input type="checkbox" aria-label={`Select ${photo.fileName}`} checked={selected} disabled={busy} onChange={event => onSelect(event.target.checked)} className="size-5 accent-forest" />
        </label>
      </div>
      <div className="p-3 sm:p-4">
        <p className="truncate text-sm font-semibold text-forest">{photo.guestName}</p>
        <p className="mt-1 truncate text-xs text-ink-muted">{photo.fileName}</p>
        <p className={`mt-3 inline-flex min-h-6 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${statusClasses[photo.status]}`}>
          {photo.status === "approved" && <Check aria-hidden="true" className="size-3" />}
          {photo.status === "hidden" && <EyeOff aria-hidden="true" className="size-3" />}
          {statusNames[photo.status]}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1 border-t border-black/5 pt-2">
          {photo.status !== "approved" && <button type="button" disabled={busy} onClick={() => onModerate("approved")} className="min-h-11 rounded-md px-2 text-xs font-medium text-forest hover:bg-sage-50 disabled:opacity-50">Approve</button>}
          {photo.status !== "hidden" && <button type="button" disabled={busy} onClick={() => onModerate("hidden")} className="min-h-11 rounded-md px-2 text-xs text-ink-muted hover:bg-sage-50 disabled:opacity-50">Hide</button>}
          <button type="button" disabled={busy} onClick={onDelete} aria-label={`Delete ${photo.fileName}`} className="ml-auto flex size-11 items-center justify-center rounded-md text-ink-muted hover:bg-red-50 hover:text-red-800 disabled:opacity-50"><Trash2 aria-hidden="true" className="size-4" /></button>
        </div>
      </div>
    </article>
  );
}
