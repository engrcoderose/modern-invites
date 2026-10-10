import { PRICING_PACKAGES, type PricingPackage } from "./pricing.ts";

export function getInquiryPackage(id: string | string[] | undefined) {
  return typeof id === "string"
    ? PRICING_PACKAGES.find((packageDetails) => packageDetails.id === id)
    : undefined;
}

export function createPackageInquiry(packageDetails: PricingPackage) {
  return `Hi Modern Invites! I’m interested in the ${packageDetails.name} package (₱${packageDetails.price}, one-time payment). Could you help me get started?`;
}
