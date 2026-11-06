import { ArrowUp } from "lucide-react";
import wedding from "../data/wedding-details.json";

export default function Footer() {
  return (
    <footer id="invitation-footer" className="px-6 pb-8 pt-16 text-center sm:px-10">
      <p className="mb-4 text-sm">With love, always</p>
      <p className="mj-script text-[clamp(1.75rem,7vw,3rem)]">{wedding.couple.display}</p>
      <p className="mt-6 text-xs">{wedding.date.display} · Baguio City</p>
      <div className="mj-footer-bottom mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row">
        <p>Made by <a href="https://www.moderninvites.com" className="mj-text-link inline-flex min-h-11 items-center">Modern Invites</a></p>
        <a href="#home" className="mj-back-top inline-flex min-h-11 items-center justify-center gap-3 rounded-full border px-5 py-3">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
