// Regenerate with: node --experimental-strip-types app/portfolio/sharing/generate-preview.mts
// The static import in the layout gives the PNG a new content hash when it changes.
import { createElement as h } from "react";
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import config from "../../../tailwind.config.ts";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og") as typeof import("next/og");
const colors = config.theme.extend.colors;
const font = await readFile(new URL("../../../public/leslie-and-serj/fonts/instrument-serif.ttf", import.meta.url));

// Crisp stationery geometry keeps the envelope recognizable in small chat previews.
const envelope = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="330" viewBox="0 0 600 330">
  <rect x="1" y="1" width="598" height="328" rx="8" fill="${colors.forest.DEFAULT}"/>
  <path d="M2 5 300 195 598 5" fill="${colors.forest.light}"/>
  <path d="m3 326 218-165M597 326 379 161" fill="none" stroke="${colors.eucalyptus.DEFAULT}" stroke-opacity=".6" stroke-width="1.5"/>
  <path d="M2 5 288 199Q300 207 312 199L598 5" fill="none" stroke="${colors.eucalyptus.DEFAULT}" stroke-width="1.5"/>
  <circle cx="300" cy="199" r="39" fill="${colors.champagne.DEFAULT}"/>
  <circle cx="300" cy="199" r="31" fill="none" stroke="${colors.champagne.light}" stroke-width="1"/>
  <path d="M284 212v-26l16 18 16-18v26M281 212h7m24 0h7" fill="none" stroke="${colors.forest.DEFAULT}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const preview = new ImageResponse(
  h("div", {
    style: {
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", background: colors.ivory,
      color: colors.forest.DEFAULT, fontFamily: "Instrument Serif",
    },
  },
  h("img", { src: `data:image/svg+xml;base64,${Buffer.from(envelope).toString("base64")}`, width: 600, height: 330, alt: "" }),
  h("div", { style: { display: "flex", fontSize: 70, marginTop: 26, lineHeight: 1 } }, "Modern Invites"),
  h("div", { style: { display: "flex", fontSize: 25, marginTop: 15, color: colors.eucalyptus.dark } }, "The invitation portfolio")),
  { width: 1200, height: 630, fonts: [{ name: "Instrument Serif", data: font, weight: 400, style: "normal" }] },
);

await writeFile(new URL("./green-envelope.png", import.meta.url), Buffer.from(await preview.arrayBuffer()));
