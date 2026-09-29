import type { Metadata } from "next";
import RsvpSample from "./components/RsvpSample";
import { sampleEvent } from "./data/sample-event";

export const metadata: Metadata = {
  title: `RSVP | ${sampleEvent.names}`,
  description: `Join us to celebrate the wedding of ${sampleEvent.names} on ${sampleEvent.date}. Kindly reply to your invitation.`,
  robots: { index: false, follow: false },
};

export default function RsvpSamplePage() {
  return <RsvpSample />;
}
