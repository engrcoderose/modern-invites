import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { wedding } from "./data";

export const alt = "Leslie and Serj's wedding invitation — 28 January 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Embed the same local artwork as the opening screen so sharing crawlers
  // receive a complete image without fetching assets from another host.
  const [background, logo, font] = await Promise.all([
    readFile(join(process.cwd(), "app/leslie-and-serj/assets/prenups/Photo background website.png")),
    readFile(join(process.cwd(), "app/leslie-and-serj/assets/designs/Opening Logo.png")),
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
    { ...size, fonts: [{ name: "Instrument Serif", data: font, weight: 400, style: "normal" }] },
  );
}
