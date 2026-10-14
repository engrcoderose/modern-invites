import type { Metadata } from "next";
import OpenRsvpSample from "../components/OpenRsvpSample";

export const metadata: Metadata = {
  title: "Open RSVP sample | Modern Invites",
  description: "Preview the RSVP form that lets anyone reply without a code or guest list.",
  robots: { index: false, follow: false },
};

export default function OpenRsvpSamplePage() { return <OpenRsvpSample />; }
