import type { Metadata } from "next";
import localFont from "next/font/local";
import Invitation from "./components/invitation";
import { wedding } from "./data";
import "./styles/wedding.css";

const anastasia = localFont({
  src: "./assets/fonts/anastasia-script.woff2",
  variable: "--font-vg-anastasia",
  weight: "400",
  style: "normal",
  display: "swap",
});

const invitationTitle = `${wedding.title} | ${wedding.date}`;
const invitationDescription = wedding.dateISO
  ? `Celebrate the wedding of ${wedding.title} on ${wedding.date}. View the invitation and RSVP.`
  : `The wedding invitation of ${wedding.title}. Wedding details will be shared soon.`;
const invitationUrl = "https://www.moderninvites.com/vincent-and-gabrielle";
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
