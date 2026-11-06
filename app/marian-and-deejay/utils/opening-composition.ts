/** Fit this invitation's existing hero layers inside the portrait envelope. */
export function openingComposition(hero: HTMLElement, width: number, height: number, scale: number) {
  const bounds = hero.getBoundingClientRect();
  const offsetX = (bounds.width - width / scale) / 2;
  const offsetY = (bounds.height - height / scale) / 2;
  const transforms: Record<string, string> = {};
  const copyPositions: Record<string, number> = { intro: .20, names: .40, tagline: .59, date: .73, location: .87, action: .96 };

  for (const part of hero.querySelectorAll<HTMLElement>("[data-opening-part]")) {
    const name = part.dataset.openingPart!;
    const rect = part.getBoundingClientRect();
    if (!rect.width || !rect.height) continue;
    let visualScale: number;
    let left: number;
    let top: number;
    if (name.includes("flower")) {
      visualScale = width * (name.startsWith("top") ? .43 : .58) / rect.width;
      left = name.endsWith("right") ? width - rect.width * visualScale : 0;
      top = name.startsWith("bottom") ? height - rect.height * visualScale : 0;
    } else {
      const range = document.createRange();
      range.selectNodeContents(part);
      const inkWidth = name === "date" ? rect.width : range.getBoundingClientRect().width || rect.width;
      visualScale = Math.min(1, width * .88 / inkWidth);
      left = (width - rect.width * visualScale) / 2;
      top = height * (copyPositions[name] ?? .5) - rect.height * visualScale / 2;
    }
    transforms[name] = `translate(${offsetX + left / scale - (rect.left - bounds.left)}px, ${offsetY + top / scale - (rect.top - bounds.top)}px) scale(${visualScale / scale})`;
  }
  return transforms;
}
