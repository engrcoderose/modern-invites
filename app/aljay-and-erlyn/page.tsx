import type { Metadata } from "next";
import Invitation from "./components/Invitation";
import { wedding } from "./data/wedding";

export const metadata: Metadata = {
  title: `${wedding.title} | ${wedding.date}`,
  description: `From one jeepney ride to a lifetime of love. Join Aljay and Erlyn as they begin their forever on ${wedding.date} in Marikina.`,
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Invitation />;
}
