import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { wedding } from "./data";
import { sharingMedia } from "./data/media";

export const alt = `${wedding.title}'s wedding invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function embeddedImage(src: string) {
  const file = await readFile(join(process.cwd(), src));
  const mime = src.endsWith(".svg") ? "image/svg+xml" : src.endsWith(".webp") ? "image/webp" : /\.jpe?g$/.test(src) ? "image/jpeg" : "image/png";
  return `data:${mime};base64,${file.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const base = join(process.cwd(), "public/vincent-and-gabrielle");
  const [background, logo, font] = await Promise.all([
    embeddedImage(sharingMedia.background),
    embeddedImage(sharingMedia.logo),
    readFile(join(base, "fonts/instrument-serif.ttf")),
  ]);
  return new ImageResponse(
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#182519", color: "#f2ede0", fontFamily: "Instrument Serif", alignItems: "center", flexDirection: "column" }}>
      {/* ImageResponse requires plain embedded images. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={background} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
      <div style={{ display: "flex", position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #07100a14, #07100a80)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt={wedding.title} width={260} height={357} style={{ marginTop: 30, objectFit: "contain" }} />
      <div style={{ display: "flex", marginTop: 18, fontSize: 34 }}>{wedding.title}</div>
      <div style={{ display: "flex", marginTop: 14, padding: "12px 16px", borderBottom: "1px solid #f2ede04d", fontSize: 18, letterSpacing: "0.2em" }}>CLICK TO OPEN</div>
      <div style={{ display: "flex", position: "absolute", bottom: 28, fontSize: 16, letterSpacing: "0.2em", opacity: 0.7 }}>{wedding.openingCaption}</div>
    </div>,
    { ...size, fonts: [{ name: "Instrument Serif", data: font, weight: 400, style: "normal" }] },
  );
}
