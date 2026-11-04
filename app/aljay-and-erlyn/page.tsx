import type { Metadata } from "next";
import localFont from "next/font/local";
import { getInvitationUrl } from "@/lib/invitation-url";
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

const title = `${wedding.title} | ${wedding.date}`;
const description = `From one jeepney ride to a lifetime of love. Join Aljay and Erlyn as they begin their forever on ${wedding.date} in Marikina.`;
const invitationUrl = getInvitationUrl("aljay-and-erlyn");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: invitationUrl },
  openGraph: { title, description, url: invitationUrl, type: "website", locale: "en_PH" },
  twitter: { card: "summary", title, description },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <div className={`${display.variable} ${body.variable}`}><Invitation /></div>;
}
