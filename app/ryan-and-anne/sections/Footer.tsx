import { ArrowUp } from "lucide-react";
import { wedding } from "../data/wedding";
import styles from "../styles/wedding.module.css";

export default function Footer() {
  return (
    <footer className="bg-[#171714] px-6 pb-7 pt-20 text-[#f5f0e6] sm:px-10 lg:px-16">
      <div data-reveal-group className="mx-auto max-w-6xl text-center"><p data-reveal className={`${styles.eyebrow} text-[#d1b788]`}>The next chapter begins with you</p><p data-reveal className={`${styles.footerNames} mt-7`}>{wedding.title}</p><p data-reveal className="mt-5 text-sm text-[#d1b788]">{wedding.hashtag}</p><p data-reveal className={`${styles.eyebrow} mt-6 text-[#f5f0e6]/60`}>{wedding.date}</p>
        <a href="#top" aria-label="Back to top" className="mx-auto mt-9 flex h-12 w-12 items-center justify-center rounded-full border border-[#d1b788]/40"><ArrowUp size={18} aria-hidden="true" /></a>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[#d1b788]/20 pt-6 text-[10px] tracking-[0.12em] text-[#f5f0e6]/50"><p>WITH LOVE, RYAN & ANNE</p><a href="https://www.moderninvites.com" target="_blank" rel="noopener noreferrer" className="min-h-11 content-center">INVITATION BY MODERN INVITES</a></div>
      </div>
    </footer>
  );
}
