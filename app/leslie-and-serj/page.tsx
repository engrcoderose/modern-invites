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

export const metadata: Metadata = {
  title: `${wedding.title} | ${wedding.date}`,
  description:
    "Together with their families, Leslie Marie S. Zaldua and John Rey F. Sergio invite you to celebrate their wedding on January 28, 2027, at Chapel on the Hill. Reception at Azienda Verde Alfonso.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={anastasia.variable}>
      <Invitation />
    </div>
  );
}
