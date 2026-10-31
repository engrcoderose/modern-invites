"use client";

import Image from "next/image";
import { useState } from "react";
import securityBank from "../assets/security-bank-qr.jpg";
import gcash from "../assets/gcash-qr.jpg";
import { wedding } from "../data/wedding";
import { PageHeading } from "../components/Stationery";
import styles from "../styles/wedding.module.css";

export default function GiftsPage() {
  const [copied, setCopied] = useState("");
  const [copyError, setCopyError] = useState(false);
  async function copy(name: string, account: string) {
    try { await navigator.clipboard.writeText(account); setCopied(name); setCopyError(false); }
    catch { setCopyError(true); }
  }
  return <div className="w-full max-w-[760px] text-center"><PageHeading>A note on gifts</PageHeading><p className={`${styles.body} mx-auto mb-7 max-w-[450px]`} data-reveal>Your presence is a gift in itself. If you wish to send a little something, our gift details are below.</p><div className="grid gap-8 sm:grid-cols-2 sm:gap-12">{wedding.gifts.map((gift, index) => <section key={gift.name} data-reveal><h3 className={`${styles.venueName} mb-4`}>{gift.name}</h3><a href={(index === 0 ? securityBank : gcash).src} target="_blank" rel="noopener noreferrer" className="inline-block p-1"><Image src={index === 0 ? securityBank : gcash} alt={`${gift.name} payment QR code supplied by the couple. Open the original image in a new tab.`} sizes="220px" className="mx-auto h-[190px] w-[190px] object-contain sm:h-[220px] sm:w-[220px]" /></a><p className={`${styles.account} mt-2 select-all`}>{gift.account}</p><button type="button" onClick={() => copy(gift.name, gift.account)} className={`${styles.textLink} mt-2 min-h-11 px-3 py-2`}>{copied === gift.name ? "Account number copied" : "Copy account number"}</button></section>)}</div><p role="status" className={`${styles.small} mt-5`}>{copyError ? "Couldn’t copy. Please select and copy the account number above." : copied ? `${copied} account number copied.` : "Tap a QR image to view its original."}</p></div>;
}
