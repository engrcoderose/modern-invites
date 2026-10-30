import bpi from "../assets/designs/BPI.png";
import gotyme from "../assets/designs/Gotime.png";
import mobileBackground from "../assets/backgrounds/gifts-burgundy-watercolor-mobile.webp";
import desktopBackground from "../assets/backgrounds/gifts-burgundy-watercolor-desktop.webp";

export const giftBackground = { mobile: mobileBackground, desktop: desktopBackground };

export const giftMessage = "With all that we have, we’ve been truly blessed. Your presence on our wedding day is the greatest gift we could ask for. However, if you’d like to shower us with an extra token of love, a monetary gift for our future is a delightful blessing.";

export const giftOptions = [
  { bank: "BPI", qr: bpi, filename: "edcel-apreal-bpi-gift-qr.png" },
  { bank: "GoTyme Bank", qr: gotyme, filename: "edcel-apreal-gotyme-gift-qr.png" },
];
