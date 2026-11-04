/** Recompose the existing hero layers for the portrait envelope without cropping its lettering. */
export function portraitComposition(hero: HTMLElement, width: number, height: number, scale: number) {
  const bounds = hero.getBoundingClientRect();
  const offsetX = (bounds.width - width / scale) / 2;
  const offsetY = (bounds.height - height / scale) / 2;
  const transforms: Record<string, string> = {};
  let arch: { left: number; top: number; scale: number; bounds: DOMRect } | undefined;

  for (const part of hero.querySelectorAll<HTMLElement>("[data-opening-part]")) {
    const name = part.dataset.openingPart!;
    const rect = part.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    let targetWidth = width;
    let left = 0;
    let top = 0;

    switch (name) {
      case "introduction":
        targetWidth = Math.min(width * .96, height * .28 * rect.width / rect.height);
        left = (width - targetWidth) / 2;
        // The wrapper already includes the hero's original top padding.
        top = height * .035;
        break;
      case "left-flower": case "right-flower":
        targetWidth = width * .43;
        left = name === "right-flower" ? width - targetWidth : 0;
        break;
      case "arch":
        targetWidth = width * 1.28;
        left = (width - targetWidth) / 2;
        top = height * .80 - rect.height * targetWidth / rect.width;
        break;
      case "couple":
        targetWidth = width * .42;
        left = width * .5 - targetWidth * .5;
        top = height - 8 - rect.height * targetWidth / rect.width;
        break;
      case "left-birds": case "right-birds":
        targetWidth = width * .18;
        left = name === "left-birds" ? width * .035 : width * .785;
        top = height * .365;
        break;
      case "grass":
        targetWidth = Math.max(width * 3.4, height * 2);
        left = (width - targetWidth) / 2;
        top = height * 1.04 - rect.height * targetWidth / rect.width;
        break;
      default: continue;
    }

    const nestedBird = name.endsWith("-birds") ? arch : undefined;
    const parentScale = nestedBird?.scale ?? 1;
    const targetX = offsetX + left / scale;
    const targetY = offsetY + top / scale;
    // Birds inherit the arch's portrait transform; express their adjustment in its local space.
    const x = nestedBird ? (targetX - nestedBird.left) / parentScale - (rect.left - nestedBird.bounds.left) : targetX - (rect.left - bounds.left);
    const y = nestedBird ? (targetY - nestedBird.top) / parentScale - (rect.top - nestedBird.bounds.top) : targetY - (rect.top - bounds.top);
    const partScale = targetWidth / scale / parentScale / rect.width;
    transforms[name] = `translate(${x}px, ${y}px) scale(${partScale})`;
    if (name === "arch") arch = { left: offsetX + left / scale, top: offsetY + top / scale, scale: partScale, bounds: rect };
  }

  return transforms;
}
