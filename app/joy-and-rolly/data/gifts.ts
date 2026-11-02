import type { StaticImageData } from "next/image";

type GiftDetails = {
  message: string;
  qrCode?: { image: StaticImageData; alt: string };
};

export const gifts: GiftDetails = {
  message: "Your presence at our wedding is the greatest gift we could ask for. Should you wish to bless us with a gift, we would gratefully appreciate a monetary contribution in place of a physical present as we begin our life together. Thank you for your love, kindness, and generosity.",
  // Add the client's QR code as a local static import when it is supplied.
};
