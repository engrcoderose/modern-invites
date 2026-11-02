import type { Metadata } from "next";
import localFont from "next/font/local";
import Invitation from "./components/Invitation";
import { wedding } from "./data/wedding";

const display = localFont({
  src: "../leslie-and-serj/fonts/anastasia-script.woff2",
  variable: "--font-ae-display",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "../../public/leslie-and-serj/fonts/noto-serif.ttf", style: "normal", weight: "100 900" },
    { path: "../../public/leslie-and-serj/fonts/noto-serif-italic.ttf", style: "italic", weight: "100 900" },
  ],
  variable: "--font-ae-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${wedding.title} | ${wedding.date}`,
  description: `From one jeepney ride to a lifetime of love. Join Aljay and Erlyn as they begin their forever on ${wedding.date} in Marikina.`,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <div className={`${display.variable} ${body.variable}`}><Invitation /></div>;
}
