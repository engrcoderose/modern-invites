import Monogram from "@/app/anjo-and-jasmin/components/Monogram";
import FloralAccent from "@/app/anjo-and-jasmin/components/FloralAccent";
import { wedding } from "@/app/anjo-and-jasmin/wedding-details";

export function CelebrationHeader({ published }: { published: boolean }) {
  return <header className="relative px-5 pb-2 pt-10 text-center sm:px-12 sm:pt-12">
    <FloralAccent kind="corner" className="left-0 top-0 w-20 opacity-75 sm:w-36" sizes="(max-width: 640px) 80px, 144px" />
    <FloralAccent kind="corner" className="right-0 top-0 w-20 -scale-x-100 opacity-75 sm:w-36" sizes="(max-width: 640px) 80px, 144px" />
    <Monogram className="mx-auto h-auto w-16 sm:w-20" sizes="80px" />
    <p className="mt-5 text-[10px] uppercase tracking-[.22em] text-[#854228] sm:text-xs">The wedding celebration of</p>
    <h1 className="mt-2 font-imperial text-[clamp(3.6rem,10vw,6.5rem)] font-normal leading-[1.15] text-[#854228]">Anjo &amp; Jasmin</h1>
    <p className="mt-4 font-instrumentSerif text-lg text-[#6a5344] sm:text-xl">{wedding.dateDisplay} <span aria-hidden="true" className="mx-2">·</span> Malabon</p>
    <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#cfa999]" />
    <h2 className="font-instrumentSerif text-3xl leading-tight sm:text-4xl">Your place at <span className="font-meaCulpa text-[1.2em] text-[#854228]">our celebration</span></h2>
    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#6a5344]">{published ? "Enter your full invited name to find your table and seat. We’re so happy to celebrate with you." : "Seating details will be available here once arrangements are finalized. Please check back closer to our wedding day."}</p>
  </header>;
}

export function CelebrationFooter() {
  return <footer className="mx-5 border-t border-[#cfa999]/50 py-8 text-center sm:mx-10 sm:py-10">
    <p className="text-[10px] uppercase tracking-[.22em] text-[#854228]">The reception</p>
    <p className="mt-3 font-instrumentSerif text-2xl">{wedding.receptionFloor}, {wedding.reception}</p>
    <p className="mt-2 text-xs leading-6 text-[#6a5344]">{wedding.location}</p>
    <p className="mt-5 text-xs leading-6 text-[#6a5344]">Need a hand? Our welcome team will help you find your place.</p>
    <a href="https://www.moderninvites.com/anjo-and-jasmin" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#9f5434]/40 px-6 py-2 text-xs text-[#854228] transition-colors hover:bg-[#f1e0cb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#854228]">View our invitation</a>
  </footer>;
}
