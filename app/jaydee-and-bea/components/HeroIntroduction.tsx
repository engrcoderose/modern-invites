import { wedding } from "../data/wedding-data";
import CoupleNames from "./CoupleNames";

export default function HeroIntroduction() {
  return (
    <div>
      <p data-hero-kicker className="jb-hero-kicker">The wedding of</p>
      <CoupleNames />
      <time data-hero-detail dateTime={wedding.date.iso} aria-label={wedding.date.display} className="jb-serif block text-xs tracking-[0.26em] text-[#514d45] sm:text-sm">{wedding.date.short}</time>
      <p className="sr-only">{wedding.date.weekday} · Malolos, Bulacan</p>
    </div>
  );
}
