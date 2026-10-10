import { MODULAR_FEATURES, PRICING_PACKAGES, type ModularFeature, type PackageId } from "./pricing";

type PricingBundle = {
  id: string;
  packageName: string;
  addOns: ModularFeature[];
  separatePrice: number;
  price: number;
  savings: number;
};

const DEFAULT_BUNDLE_SAVINGS = 100;

function createBundle(id: string, packageId: PackageId, addOnNames: string[], savings = DEFAULT_BUNDLE_SAVINGS): PricingBundle {
  const packageDetails = PRICING_PACKAGES.find((item) => item.id === packageId);
  if (!packageDetails) throw new Error(`Bundle ${id} references a missing package.`);

  const addOns = addOnNames.map((name) => {
    const feature = MODULAR_FEATURES.find((item) => item.name === name);
    if (!feature) throw new Error(`Bundle ${id} references a missing add-on: ${name}.`);
    return feature;
  });
  const separatePrice = [packageDetails.price, ...addOns.map((item) => item.price)]
    .reduce((total, price) => total + Number(price.replaceAll(",", "")), 0);

  return {
    id,
    packageName: packageDetails.name,
    addOns,
    separatePrice,
    price: separatePrice - savings,
    savings,
  };
}

export const PRICING_BUNDLES = [
  createBundle("gallery-rsvp", "classic", ["Photo Gallery Section", "RSVP with Person Limit"], 147),
  createBundle("gallery-story-music", "classic", ["Photo Gallery Section", "Story / About Us", "Background Music"]),
  createBundle("gallery-rsvp-seating", "classic", ["Photo Gallery Section", "RSVP with Person Limit", "Seat Finder with Admin Dashboard"], 146),
  createBundle("signature-video-seating", "signature", ["Prenup Video Integration", "Seat Finder with Admin Dashboard"], 147),
  createBundle("signature-guest-guide", "signature", ["FAQ Section", "Gift Registry", "Prenup Video Integration", "Where to Stay / Guest Guide Section"], 145),
];
