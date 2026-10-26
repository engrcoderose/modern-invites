import type { PhotoAlbum, PhotoAlbumRepository } from "../domain/photo-sharing";
import { createDemoAlbum } from "./demo-album";

const DATABASE_NAME = "modern-invites-photo-sharing-demo";
const STORE_NAME = "albums";
const ALBUM_KEY = "demo-v1";

async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Browser storage is unavailable. Allow site storage and reload to try again."));
    request.onblocked = () => reject(new Error("Close other demo tabs and reload to update browser storage."));
  });
}

export const browserAlbumRepository: PhotoAlbumRepository = {
  async load() {
    const database = await openDatabase();
    try {
      return await new Promise<PhotoAlbum>((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readonly");
        const request = transaction.objectStore(STORE_NAME).get(ALBUM_KEY);
        transaction.oncomplete = () => {
          const album = request.result as PhotoAlbum | undefined;
          if (album && (album.version !== 1 || !Array.isArray(album.photos) || !album.settings)) {
            reject(new Error("The demo data is incompatible. Clear this site’s demo storage and reload."));
          } else resolve(album ?? createDemoAlbum());
        };
        transaction.onerror = () => reject(new Error("Couldn’t read the demo album. Reload to try again."));
      });
    } finally { database.close(); }
  },
  async save(album) {
    const database = await openDatabase();
    try {
      await new Promise<void>((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readwrite");
        transaction.objectStore(STORE_NAME).put(album, ALBUM_KEY);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(new Error("Couldn’t save the demo. Browser storage may be full. Remove some photos and try again."));
        transaction.onabort = () => reject(new Error("The change wasn’t saved. Try again or free some browser storage."));
      });
    } finally { database.close(); }
  },
};
