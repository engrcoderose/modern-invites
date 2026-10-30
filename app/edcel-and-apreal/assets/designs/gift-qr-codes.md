# Supplied gift QR codes

The user supplied `BPI.png` and `Gotime.png` in this design folder on October 29, 2026. These files are the authoritative gift QR images and are imported directly by `data/gifts.ts`. They replace the temporary regions extracted from the physical invitation.

- `BPI.png`: 254 × 254 pixels.
- `Gotime.png`: 243 × 254 pixels.

Both supplied files decode locally. QR codes decoded from the rendered desktop preview and 320px mobile screenshots also match the supplied files. Their pixels and aspect ratios are preserved. `GiftsSection` uses lossless PNGs with `unoptimized`, a white quiet zone, still artwork and native download links. The codes are not regenerated, recolored, filtered or animated. No account-owner identity is inferred and no payment service is contacted.
