import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { eventSlug, seatFinderPath } from "../app/adi-and-jules/data/event.ts";

const root = fileURLToPath(new URL("../app/adi-and-jules/", import.meta.url));

test("RSVP and seating are wired to a distinct Adi and Jules admin event", () => {
  assert.equal(eventSlug, "adi-and-jules-wedding");
  assert.equal(seatFinderPath, "/seat-finder/adi-and-jules");
  const rsvp = readFileSync(path.join(root, "components/RsvpFlow.tsx"), "utf8");
  assert.match(rsvp, /SmartRsvpFlow/);
  assert.match(rsvp, /eventSlug=\{rsvpEventSlug\}/);
  assert.match(rsvp, /accessMode="name_search"/);
  const page = readFileSync(path.join(root, "../seat-finder/adi-and-jules/page.tsx"), "utf8");
  assert.match(page, /getPublishedSeating\(eventSlug\)/);
  const finder = readFileSync(path.join(root, "components/seating/SeatFinder.tsx"), "utf8");
  assert.match(finder, /slug=\{eventSlug\}/);
});

test("portfolio has no obsolete mock flow or original event identifier", () => {
  const forbidden = /Portfolio preview|Alex Morgan|Taylor Morgan|findPreviewInvitation|SeatFinderPreview|jasmin-and-anjo-wedding|\/seat-finder\/anjo-and-jasmin/;
  for (const file of readdirSync(root, {recursive:true})) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const content = readFileSync(path.join(root,file), "utf8");
    assert.doesNotMatch(content, forbidden, file);
  }
  assert.equal(existsSync(path.join(root, "data/portfolio-preview.ts")), false);
  assert.equal(existsSync(path.join(root, "components/SeatFinderPreview.tsx")), false);
});

test("portfolio metadata and accessible photo descriptions do not expose original event details", () => {
  for (const file of ["page.tsx", "photo-catalog.ts", "components/EnvelopeIntro.tsx", "components/HeroSection.tsx", "components/Footer.tsx", "components/Location.tsx"]) {
    const content = readFileSync(path.join(root,file), "utf8");
    const labels = [...content.matchAll(/(?:alt|aria-label|title|description):?\s*[=:]\s*["']([^"']+)/g)].map(match => match[1]);
    for (const label of labels) assert.doesNotMatch(label, /Anjo|Jasmin|Malabon|San Bartolome|St\. John XXIII/);
  }
});

test("portfolio contact is name-only and the deadline precedes the new wedding", () => {
  const content = readFileSync(path.join(root, "data.ts"), "utf8");
  assert.match(content, /January 23, 2027/);
  assert.match(content, /name: "Jamie Rivera"/);
  assert.doesNotMatch(content, /sample coordinator|09XX|coordinator\.phone|Margarette|0945|639458|October 30, 2026|tel:/);
  assert.doesNotMatch(readFileSync(path.join(root, "components/RSVPSection.tsx"), "utf8"), /coordinator\.phone|phoneHref|tel:/);
});
