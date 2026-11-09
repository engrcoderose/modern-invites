import type { Metadata } from "next";
import localFont from "next/font/local";
import Invitation from "./components/Invitation";
import styles from "./styles/invitation.module.css";

const script = localFont({ src: "./assets/fonts/fleur-de-leah-latin.woff2", variable: "--cr-script", display: "swap" });
const serif = localFont({ src: "./assets/fonts/noto-serif-latin.woff2", variable: "--cr-serif", display: "swap", weight: "400" });

export const metadata: Metadata = {
  title: "Christina & Reboden | January 23, 2027",
  description: "Together with their families, Christina and Reboden invite you to celebrate their wedding in Malolos, Bulacan, on January 23, 2027.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <div className={`${script.variable} ${serif.variable} ${styles.invitation}`}><Invitation /></div>;
}
