"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { Copy, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { demoAlbumDetails } from "../infrastructure/demo-album";

export function AlbumSharing() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const qr = useRef<HTMLDivElement>(null);
  useEffect(() => { setUrl(new URL(demoAlbumDetails.guestPath, window.location.origin).href); }, []);

  async function copyLink() {
    try { await navigator.clipboard.writeText(url); setMessage("Demo album link copied."); }
    catch { setMessage("Copy is unavailable. Select and copy the link above."); }
  }
  function downloadQr() {
    const svg = qr.current?.querySelector("svg");
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const blobUrl = URL.createObjectURL(new Blob([source], { type: "image/svg+xml" }));
    const anchor = document.createElement("a"); anchor.href = blobUrl; anchor.download = "demo-album-qr.svg";
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    setMessage("Demo QR downloaded. It opens this preview’s guest album.");
  }
  return <section aria-labelledby="sharing-heading" className="border-t border-black/10 pt-6">
    <h2 id="sharing-heading" className="font-elegant text-xl">Share the album</h2><p className="mt-2 text-sm leading-6 text-ink-muted">Try the guest experience with a link or QR code.</p>
    <div ref={qr} className="my-5 flex justify-center bg-white p-4">{url ? <QRCode value={url} size={144} bgColor="#ffffff" fgColor="#173d32" title="Demo guest album link" /> : <p role="status" className="py-12 text-sm">Preparing QR code…</p>}</div>
    <label className="block text-xs font-medium">Demo album link<input readOnly value={url} onFocus={event => event.target.select()} className="mt-2 h-11 w-full rounded-lg border bg-white px-3 text-sm" /></label>
    <div className="mt-3 flex flex-wrap gap-2"><Button type="button" variant="outline" disabled={!url} onClick={() => { void copyLink(); }} className="min-h-11 bg-white"><Copy aria-hidden="true" />Copy link</Button><Button type="button" variant="outline" disabled={!url} onClick={downloadQr} className="min-h-11 bg-white"><Download aria-hidden="true" />Save QR</Button></div>
    <Button asChild variant="link" className="mt-3 h-auto min-h-11 px-0 text-forest"><Link href={demoAlbumDetails.guestPath}><ExternalLink aria-hidden="true" />Open guest album</Link></Button>
    <p role="status" className="mt-2 text-xs leading-5">{message}</p><p className="mt-2 text-xs leading-5 text-ink-muted">Opening the link on another device shows a separate demo. Browser-local photos do not travel with the link.</p>
  </section>;
}
