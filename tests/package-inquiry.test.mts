import assert from "node:assert/strict";
import test from "node:test";
import { PRICING_PACKAGES } from "../lib/pricing.ts";
import { createPackageInquiry, getInquiryPackage } from "../lib/package-inquiry.ts";

test("package inquiries preserve the selected package and current published price", () => {
  for (const packageDetails of PRICING_PACKAGES) {
    const selected = getInquiryPackage(packageDetails.id);
    assert.equal(selected, packageDetails);
    const message = createPackageInquiry(selected);
    assert.ok(message.includes(`${packageDetails.name} package`));
    assert.ok(message.includes(`₱${packageDetails.price}, one-time payment`));
    assert.equal(PRICING_PACKAGES.filter(other => message.includes(`${other.name} package`)).length, 1);
  }
});

test("missing, unknown and duplicate package parameters never select a package", () => {
  for (const input of [undefined, "", "unknown", "Classic", "<script>", ["classic", "luxury"]]) {
    assert.equal(getInquiryPackage(input), undefined);
  }
});
