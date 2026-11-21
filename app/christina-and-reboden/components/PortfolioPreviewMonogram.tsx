import localFont from "next/font/local";
import styles from "../styles/portfolio-preview.module.css";

const script = localFont({ src: "../assets/fonts/fleur-de-leah-latin.woff2", display: "swap", preload: false });

export default function PortfolioPreviewMonogram() {
  return (
    <span aria-hidden="true" className={`${script.className} ${styles.monogram} absolute inset-x-0 top-[64%] flex -translate-y-1/2 items-baseline justify-center gap-[.12em] whitespace-nowrap`}>
      C<span className="text-[.4em]">&amp;</span>R
    </span>
  );
}
