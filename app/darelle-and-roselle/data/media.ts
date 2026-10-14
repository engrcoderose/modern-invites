import type { StaticImageData } from "next/image";

// R2 object prefix intentionally differs from the existing website route.
const baseUrl = "https://assets.moderninvites.com/darell-and-roselle/images/designs";

function designImage(filename: string, width: number, height: number): StaticImageData {
  return { src: `${baseUrl}/${encodeURIComponent(filename)}`, width, height };
}

const monogram = designImage("new-no-frame-monogram.png", 2000, 2000);
const framedMonogram = designImage("new-green-monogram.png", 2000, 2000);
const openingMonogram = designImage("new-black-monogram.png", 2000, 2000);
const cover = designImage("opening-swan-lake-hd.webp", 1563, 1006);
const woodland = designImage("woodland-lake.webp", 1536, 1024);
const venueBackground = designImage("venue-meadow-lake-hd.webp", 1448, 1086);
const attireGuide = designImage("semi-formal-attire-outline-v3.png", 1448, 1086);

export const media = { monogram, framedMonogram, openingMonogram, cover, woodland, venueBackground, attireGuide };
