import type { Metadata } from "next";
import localFont from "next/font/local";
import Invitation from "./invitation";
import { wedding } from "./data";
import "./wedding.css";

const anastasia = localFont({
  src: "./fonts/anastasia-script.woff2",
  variable: "--font-lj-anastasia",
  weight: "400",
  style: "normal",
  display: "swap",
});

const invitationTitle = `${wedding.title} | ${wedding.date}`;
const invitationDescription = `Join Leslie and Serj as they celebrate their wedding on ${wedding.date} at ${wedding.ceremony.name}, with a reception at ${wedding.reception.name}. View the invitation and RSVP.`;
const invitationUrl = "/leslie-and-serj";
const previewImage = {
  url: `${invitationUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${wedding.title}'s wedding invitation — ${wedding.date}`,
};

export const metadata: Metadata = {
  title: invitationTitle,
  description: invitationDescription,
  alternates: { canonical: invitationUrl },
  openGraph: {
    type: "website",
    url: invitationUrl,
    title: invitationTitle,
    description: invitationDescription,
    siteName: "Modern Invites",
    locale: "en_PH",
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: invitationTitle,
    description: invitationDescription,
    images: [previewImage],
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={anastasia.variable}>
      <Invitation />
    </div>
  );
}
