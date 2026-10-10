import type { StaticImageData } from "next/image";

export interface PrenupPhoto {
  id: string;
  src: string | StaticImageData;
  filename: string;
  width: number;
  height: number;
  alt: string;
  position?: string;
  sizes?: string;
}
