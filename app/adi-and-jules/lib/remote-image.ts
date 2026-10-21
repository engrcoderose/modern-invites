import type { StaticImageData } from "next/image";

const imageBaseUrl = "https://assets.moderninvites.com/anjo-and-jasmin/images";

/** Keep verified source dimensions for Next.js optimization and responsive crops. */
export function r2Image(path: string, width: number, height: number): StaticImageData {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return { src: `${imageBaseUrl}/${encodedPath}`, width, height };
}
