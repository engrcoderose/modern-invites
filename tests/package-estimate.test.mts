import assert from "node:assert/strict";
import test from "node:test";
import { PRICING_PACKAGES } from "../lib/pricing.ts";
import { calculatePackageEstimate, createEstimateInquiryHref, createEstimateInquiryMessage } from "../lib/package-estimate.ts";
import { createPackageInquiry } from "../lib/package-inquiry.ts";

test("base-only estimates retain every published package price and inquiry", () => {
  for (const item of PRICING_PACKAGES) {
    const estimate = calculatePackageEstimate(item.id, []);
    assert.equal(estimate.total, Number(item.price.replaceAll(",", "")));
    assert.equal(estimate.savings, 0);
    assert.equal(createEstimateInquiryMessage(estimate), createPackageInquiry(item));
  }
});

test("Classic gallery and limited RSVP automatically receive the listed bundle", () => {
  const estimate = calculatePackageEstimate("classic", ["Photo Gallery Section", "RSVP with Person Limit"]);
  assert.equal(estimate.separatePrice, 1348);
  assert.equal(estimate.savings, 100);
  assert.equal(estimate.total, 1248);
  assert.equal(estimate.bundle?.id, "gallery-rsvp");
});

test("overlapping bundles do not stack; uncovered extras retain their rates", () => {
  const estimate = calculatePackageEstimate("classic", ["Photo Gallery Section", "RSVP with Person Limit", "Seat Finder with Admin Dashboard", "Monogram (Logo Only)"]);
  assert.equal(estimate.bundle?.id, "gallery-rsvp-seating");
  assert.equal(estimate.savings, 100);
  assert.equal(estimate.total, 1897);
});

test("Signature video and seating get their matching bundle", () => {
  const estimate = calculatePackageEstimate("signature", ["Prenup Video Integration", "Seat Finder with Admin Dashboard"]);
  assert.equal(estimate.total, 2147);
  assert.equal(estimate.bundle?.id, "signature-video-seating");
});

test("changing packages avoids charging for explicit included features", () => {
  const selected = ["Photo Gallery Section", "Google Maps", "Additional Background Music"];
  assert.equal(calculatePackageEstimate("classic", selected).total, 1249);
  const signature = calculatePackageEstimate("signature", selected);
  assert.deepEqual(signature.addOns.map(item => item.name), ["Additional Background Music"]);
  assert.equal(signature.total, 1649);
  assert.equal(calculatePackageEstimate("luxury", ["Prenup Video Integration", "Seat Finder with Admin Dashboard", "Custom RSVP Questions"]).total, 3199);
});

test("query round trips carry canonical options and recompute prices", () => {
  const estimate = calculatePackageEstimate("classic", ["Photo Gallery Section", "Photo Gallery Section", "RSVP with Person Limit", "unknown"]);
  assert.equal(estimate.addOns.length, 2);
  const url = new URL(createEstimateInquiryHref(estimate), "https://example.test");
  assert.equal(url.hash, "#inquire");
  assert.equal(url.searchParams.has("price"), false);
  const restored = calculatePackageEstimate(url.searchParams.get("package")!, url.searchParams.getAll("addon"));
  assert.equal(restored.total, 1248);
  const message = createEstimateInquiryMessage(restored);
  assert.match(message, /Photo Gallery Section/);
  assert.match(message, /RSVP with Person Limit/);
  assert.match(message, /₱1,248/);
  assert.match(message, /₱100/);
});
