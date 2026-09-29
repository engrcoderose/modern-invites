import type { StaticImageData } from "next/image";

const assetBaseUrl = "https://assets.moderninvites.com/leslie-and-serj";

// Preserve the source dimensions used by Next.js and the invitation artwork.
// These public R2 URLs contain no credentials; keep originals out of the build.
function remoteImage(path: string, width: number, height: number, version?: string): StaticImageData {
  return {
    src: `${assetBaseUrl}/${path.split("/").map(encodeURIComponent).join("/")}${version ? `?v=${encodeURIComponent(version)}` : ""}`,
    width,
    height,
  };
}

export const openingPhoto = remoteImage("prenups/Photo background website.png", 1606, 1110);
export const monogram = remoteImage("designs/Monogram.png", 1640, 2360);
export const openingLogo = remoteImage("designs/Opening Logo.png", 342, 470);
export const weddingIllustration = remoteImage("designs/Wedding Logo.png", 7016, 4961);
export const attireReference = remoteImage("designs/Wedding guest peg - rows.png", 1536, 1024);
export const churchLogo = remoteImage("designs/church_logo.png", 1536, 1024);
export const receptionLogo = remoteImage("designs/reception_logo.png", 1536, 1024);

// Bypass cached originals after replacing objects at the same R2 keys.
const slideshowVersion = "20260929";
export const main1 = remoteImage("prenups/Main-1.jpg", 3840, 2560, slideshowVersion);
export const main2 = remoteImage("prenups/Main-2.jpg", 3840, 2560, slideshowVersion);
export const main3 = remoteImage("prenups/Main-3.jpg", 3840, 2560, slideshowVersion);
export const main4 = remoteImage("prenups/Main-4.jpg", 3840, 2560, slideshowVersion);
export const main5 = remoteImage("prenups/Main-5.jpg", 3840, 5760, slideshowVersion);
export const group1 = remoteImage("prenups/Group1 -1.jpg", 3840, 5760, slideshowVersion);
export const group2 = remoteImage("prenups/Group1-2.jpg", 3840, 2560, slideshowVersion);
export const group3 = remoteImage("prenups/Group1-3.jpg", 3840, 2560, slideshowVersion);
export const group4 = remoteImage("prenups/Group1-4.jpg", 3840, 5760, slideshowVersion);
export const group5 = remoteImage("prenups/Group1-5.jpg", 3840, 2560, slideshowVersion);
