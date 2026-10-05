import { FlowerPattern2 } from "@/app/anjo-and-jasmin/design-media";
import type { SeatingPlan } from "@/features/seating/domain/seating-plan";
import { GuestSeatFinder, type GuestSeatFinderPresentation } from "@/features/seating/presentation/guest-seat-finder";
import { CelebrationFooter, CelebrationHeader } from "./components/celebration-header";
import styles from "./seat-finder.module.css";

export const ANJO_JASMIN_SEATING_SLUG = "jasmin-and-anjo-wedding";

const paperClasses = `relative border border-[#cfa999]/70 bg-[#faf7f3] ${styles.paper}`;
const presentation: GuestSeatFinderPresentation = {
  header: <CelebrationHeader published />,
  footer: <CelebrationFooter />,
  mapHeading: <div className="mb-4 text-center"><h2 className="font-instrumentSerif text-2xl sm:text-3xl">The reception floor</h2><p className="mt-2 text-xs leading-6 text-[#6a5344]">Find your table above, then explore the layout below.</p></div>,
  classNames: {
    page: "relative min-h-svh bg-transparent px-3 py-5 text-[#443329] sm:px-8 sm:py-12",
    container: `${paperClasses} max-w-5xl space-y-7`,
    form: "px-5 sm:px-0",
    input: "h-14 rounded-full border-[#cfa999] bg-[#fffdf9] px-5 text-base text-[#443329] placeholder:text-[#6a5344] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#854228]",
    button: "h-14 rounded-full bg-[#9f5434] px-7 text-[#fff6ea] hover:bg-[#854228] focus-visible:ring-[#854228]",
    result: "mx-5 rounded-none border-[#cfa999] bg-[#f1e0cb]/50 text-[#854228] sm:mx-10",
    tableName: "font-instrumentSerif text-4xl",
    resultHint: "text-[#6a5344]",
    map: `mx-5 border-t border-[#cfa999]/50 pt-7 sm:mx-10 ${styles.map}`,
  },
};

export function AnjoJasminSeatFinder({ plan }: { plan?: SeatingPlan }) {
  return <div className={`${styles.theme} relative isolate min-h-svh font-sans text-[#443329]`}>
    <div aria-hidden="true" className={`${styles.pattern} pointer-events-none absolute inset-0 -z-10 opacity-20`} style={{ backgroundImage: `url(${FlowerPattern2.src})` }} />
    {plan ? <GuestSeatFinder name="Anjo & Jasmin" slug={ANJO_JASMIN_SEATING_SLUG} plan={plan} presentation={presentation} />
      : <main className="relative flex min-h-svh items-center justify-center px-3 py-5 sm:px-8 sm:py-12"><div className={`${paperClasses} w-full max-w-2xl space-y-7`}><CelebrationHeader published={false} /><CelebrationFooter /></div></main>}
  </div>;
}
