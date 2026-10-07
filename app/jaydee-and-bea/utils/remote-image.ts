import type { StaticImageData } from "next/image";

const assetBaseUrl = "https://assets.moderninvites.com";

/** Preserve verified dimensions for Next Image and the invitation's artwork layout. */
export function remoteImage(objectKey: string, width: number, height: number): StaticImageData {
  const encodedPath = objectKey.split("/").map(encodeURIComponent).join("/");
  return { src: `${assetBaseUrl}/${encodedPath}`, width, height };
}
