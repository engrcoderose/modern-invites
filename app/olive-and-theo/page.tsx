import type { Metadata } from "next";
import Invitation from "./components/Invitation";

export const metadata: Metadata = {
  title: "Olive & Theo — A day to remember",
  description: "Celebrate with Olive and Theo at The Willow House on March 20, 2027. View the date, venue, countdown, and RSVP.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Invitation />;
}
