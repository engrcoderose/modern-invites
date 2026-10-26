import test from "node:test";
import assert from "node:assert/strict";
import { MAX_PHOTO_BYTES, validatePhoto } from "../features/photo-sharing/domain/photo-sharing.ts";
import { createDemoAlbum } from "../features/photo-sharing/infrastructure/demo-album.ts";

test("photo selection accepts supported images at the size boundary", () => {
  for (const type of ["image/jpeg", "image/png", "image/webp"]) {
    assert.equal(validatePhoto({ name: "photo", type, size: MAX_PHOTO_BYTES }), undefined);
  }
});

test("photo selection rejects empty, oversized and unsupported files with recovery guidance", () => {
  assert.match(validatePhoto({ name: "empty.jpg", type: "image/jpeg", size: 0 })!, /empty/);
  assert.match(validatePhoto({ name: "large.jpg", type: "image/jpeg", size: MAX_PHOTO_BYTES + 1 })!, /20 MB/);
  assert.match(validatePhoto({ name: "phone.heic", type: "image/heic", size: 100 })!, /Convert HEIC/);
  assert.match(validatePhoto({ name: "video.mp4", type: "video/mp4", size: 100 })!, /JPG, PNG, or WebP/);
  assert.match(validatePhoto({ name: "image.svg", type: "image/svg+xml", size: 100 })!, /JPG, PNG, or WebP/);
});

test("reset creates independent data with guest-visible and moderated sample states", () => {
  const album = createDemoAlbum();
  assert.equal(album.photos.filter(photo => photo.status === "approved").length, 2);
  assert.ok(album.photos.some(photo => photo.status === "pending"));
  assert.ok(album.photos.some(photo => photo.status === "hidden"));
  album.photos.splice(0);
  album.settings.uploadsOpen = false;
  const fresh = createDemoAlbum();
  assert.equal(fresh.photos.length, 4);
  assert.equal(fresh.settings.uploadsOpen, true);
});
