export type PhotoStatus = "pending" | "approved" | "hidden";

export interface AlbumPhoto {
  id: string;
  guestName: string;
  caption: string;
  fileName: string;
  size: number;
  createdAt: string;
  status: PhotoStatus;
  /** Browser-local Blobs in the demo; a storage URL after backend integration. */
  source: string | Blob;
}

export interface AlbumSettings {
  uploadsOpen: boolean;
  galleryVisible: boolean;
  moderationRequired: boolean;
}

export interface PhotoAlbum {
  version: 1;
  photos: AlbumPhoto[];
  settings: AlbumSettings;
}

export interface PhotoAlbumRepository {
  load(): Promise<PhotoAlbum>;
  save(album: PhotoAlbum): Promise<void>;
}

export const MAX_PHOTO_BYTES = 20 * 1024 * 1024;
export const MAX_BATCH_PHOTOS = 10;
export const MAX_ALBUM_PHOTOS = 100;
export const MAX_ALBUM_BYTES = 200 * 1024 * 1024;
export const PHOTO_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function validatePhoto(file: Pick<File, "size" | "type" | "name">): string | undefined {
  if (!PHOTO_MIME_TYPES.includes(file.type)) return `${file.name}: choose a JPG, PNG, or WebP photo. Convert HEIC photos to JPG first.`;
  if (file.size === 0) return `${file.name}: this file is empty. Choose another photo.`;
  if (file.size > MAX_PHOTO_BYTES) return `${file.name}: photos must be 20 MB or smaller.`;
}

export function formatPhotoBytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
