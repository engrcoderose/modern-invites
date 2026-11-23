import { MODULAR_FEATURES, PRICING_PACKAGES, type PackageId } from "./pricing.ts";
import { PRICING_BUNDLES } from "./pricing-bundles.ts";
import { createPackageInquiry } from "./package-inquiry.ts";

// Direct equivalents of the catalog's named inclusions. Broad promises such as
// custom design or RSVP restrictions do not waive separately priced extras.
const signatureInclusions = [
  "Photo Gallery Section", "Story / About Us", "Event Timeline", "Google Maps",
  "Premium Animations", "Animated Envelope",
];
const includedAddOns: Record<PackageId, readonly string[]> = {
  classic: [],
  signature: signatureInclusions,
  luxury: [...signatureInclusions, "Monogram (Logo Only)", "Gift Registry", "FAQ Section",
    "Where to Stay / Guest Guide Section", "Prenup Video Integration",
    "Custom RSVP Questions", "Seat Finder with Admin Dashboard"],
};

const currency = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });
const priceNumber = (price: string) => Number(price.replaceAll(",", ""));
export const formatEstimatePrice = (price: number) => currency.format(price);

export function isAddOnIncluded(packageId: PackageId, name: string) {
  return includedAddOns[packageId].includes(name);
}

export function calculatePackageEstimate(packageId: string, selectedNames: readonly string[]) {
  const packageDetails = PRICING_PACKAGES.find(item => item.id === packageId) ?? PRICING_PACKAGES[0];
  const selected = new Set(selectedNames);
  const addOns = MODULAR_FEATURES.filter(item => selected.has(item.name) && !isAddOnIncluded(packageDetails.id, item.name));
  const basePrice = priceNumber(packageDetails.price);
  const separatePrice = addOns.reduce((total, item) => total + priceNumber(item.price), basePrice);
  const payableNames = new Set(addOns.map(item => item.name));
  // Listed bundles are alternatives, never cumulative discounts on one setup.
  const bundle = PRICING_BUNDLES
    .filter(item => item.packageName === packageDetails.name && item.addOns.every(extra => payableNames.has(extra.name)))
    .sort((a, b) => b.savings - a.savings || b.addOns.length - a.addOns.length)[0];
  const savings = bundle?.savings ?? 0;
  return { packageDetails, addOns, basePrice, separatePrice, savings, total: separatePrice - savings, bundle };
}

export type PackageEstimate = ReturnType<typeof calculatePackageEstimate>;

export function createEstimateInquiryHref(estimate: PackageEstimate) {
  const params = new URLSearchParams({ package: estimate.packageDetails.id });
  estimate.addOns.forEach(item => params.append("addon", item.name));
  return `/?${params.toString()}#inquire`;
}

export function createEstimateInquiryMessage(estimate: PackageEstimate) {
  if (!estimate.addOns.length) return createPackageInquiry(estimate.packageDetails);
  const lines = estimate.addOns.map(item => `• ${item.name} — ${formatEstimatePrice(priceNumber(item.price))}`);
  const savings = estimate.savings ? ` This includes ${formatEstimatePrice(estimate.savings)} in listed bundle savings.` : "";
  return `Hi Modern Invites! I’m interested in the ${estimate.packageDetails.name} package (${formatEstimatePrice(estimate.basePrice)}) with these add-ons:\n${lines.join("\n")}\nEstimated total: ${formatEstimatePrice(estimate.total)}, one-time payment.${savings}\nCould you confirm this setup and the final quote?`;
}
