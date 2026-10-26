"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { useDemoAlbum } from "../application/use-demo-album";
import type { AlbumSettings as Settings } from "../domain/photo-sharing";

const settings: { key: keyof Settings; title: string; description: string }[] = [
  { key: "uploadsOpen", title: "Accept photos", description: "Let guests add photos to the album." },
  { key: "galleryVisible", title: "Show guest gallery", description: "Let guests view approved photos." },
  { key: "moderationRequired", title: "Review new photos", description: "Approve new contributions before guests see them. Existing photos keep their status." },
];

export function AlbumSettings({ controller }: { controller: ReturnType<typeof useDemoAlbum> }) {
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [pendingSetting, setPendingSetting] = useState<{ key: keyof Settings; checked: boolean }>();
  const { album, busy, update } = controller;
  if (!album) return null;
  async function toggle(key: keyof Settings, checked: boolean) {
    setPendingSetting({ key, checked });
    const saved = await update(current => ({ ...current, settings: { ...current.settings, [key]: checked } }));
    setPendingSetting(undefined);
    setMessage(saved ? "Demo settings saved in this browser." : "Settings weren’t saved. See the message above.");
  }
  return <section aria-labelledby="settings-heading">
    <h2 id="settings-heading" className="font-elegant text-xl">Album settings</h2>
    <div className="mt-4 divide-y divide-black/10">{settings.map(setting => <label key={setting.key} className="flex cursor-pointer items-start justify-between gap-4 py-4"><span><span className="block text-sm font-medium">{setting.title}</span><span className="mt-1 block text-xs leading-5 text-ink-muted">{setting.description}</span></span><input type="checkbox" checked={pendingSetting?.key === setting.key ? pendingSetting.checked : album.settings[setting.key]} disabled={busy || pendingSetting !== undefined} onChange={event => { void toggle(setting.key, event.target.checked); }} className="mt-1 size-5 shrink-0 accent-forest" /></label>)}</div>
    <p role="status" className="text-xs leading-5 text-ink-muted">{message}</p>
    <div className="mt-5 border-t border-black/10 pt-5">{confirmReset ? <div><p className="text-sm leading-6">Reset this demo? This removes all locally added photos and restores the sample album.</p><div className="mt-3 flex flex-wrap gap-2"><Button type="button" variant="destructive" disabled={busy} className="min-h-11" onClick={() => { void controller.reset().then(saved => { if (saved) { setConfirmReset(false); setMessage("Demo restored to its original sample data."); } }); }}>Reset demo</Button><Button type="button" variant="outline" disabled={busy} className="min-h-11" onClick={() => setConfirmReset(false)}>Cancel</Button></div></div> : <button type="button" onClick={() => setConfirmReset(true)} className="min-h-11 text-sm text-ink-muted underline underline-offset-4">Reset demo data</button>}</div>
  </section>;
}
