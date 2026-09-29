import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { wedding } from "./data";
import { openingPhoto, openingLogo } from "./media";

export const alt = "Leslie and Serj's wedding invitation — 28 January 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function fetchArtwork(url: string) {
  const response = await fetch(url, {
    // The original background exceeds Next.js's 2 MiB fetch-cache limit.
    // Cache the smaller rendered response at the CDN instead of its inputs.
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Sharing artwork unavailable: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

export default async function OpenGraphImage() {
  // Fetch and embed the same R2 artwork as the opening screen. Sharing crawlers
  // still receive one complete image; only the renderer needs access to R2.
  const [background, logo, font] = await Promise.all([
    fetchArtwork(openingPhoto.src),
    fetchArtwork(openingLogo.src),
    readFile(join(process.cwd(), "public/leslie-and-serj/fonts/instrument-serif.ttf")),
  ]);

  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#182519", color: "#f2ede0", fontFamily: "Instrument Serif", alignItems: "center", flexDirection: "column" }}>
      {/* ImageResponse renders plain image elements, not next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${background.toString("base64")}`} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
      <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at 50% 40%, #07100a14, #07100a80)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="Leslie and Serj dancing in a teacup" width={306} height={420} style={{ marginTop: 44, objectFit: "contain" }} />
      <div style={{ display: "flex", marginTop: 20, padding: "12px 16px", borderBottom: "1px solid #f2ede04d", fontSize: 18, letterSpacing: "0.2em" }}>
        CLICK TO OPEN
      </div>
      <div style={{ display: "flex", position: "absolute", bottom: 28, fontSize: 16, letterSpacing: "0.2em", opacity: 0.7 }}>
        {wedding.openingCaption}
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Instrument Serif", data: font, weight: 400, style: "normal" }],
      headers: { "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400" },
    },
  );
}
