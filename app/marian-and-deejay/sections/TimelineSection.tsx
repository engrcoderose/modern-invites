import Image from "next/image";
import { Heart } from "lucide-react";
import panel from "../assets/designs/timeline_brown.png";
import { timelineItems } from "../data/timeline";

export default function TimelineSection() {
  const lineInset = `${50 / timelineItems.length}%`;
  return (
    <section id="timeline" aria-labelledby="mj-timeline-title" className="mj-wedding-timeline overflow-hidden px-4 py-12 text-center sm:px-6 sm:py-16">
      <h2 id="mj-timeline-title" className="mj-script mx-auto mb-6 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] leading-[1.4] sm:mb-8">Our Wedding Timeline</h2>
      <div className="relative mx-auto aspect-[605/1028] min-h-[720px] w-full max-w-xl">
        <Image src={panel} alt="" fill sizes="(max-width: 607px) calc(100vw - 32px), 576px" className="pointer-events-none object-fill" />
        <div className="mj-wedding-timeline-list absolute inset-x-[12%] bottom-[9%] top-[9%]">
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 w-0.5 -translate-x-1/2 bg-current" style={{ top: lineInset, bottom: lineInset }} />
          <ol className="relative grid h-full" style={{ gridTemplateRows: `repeat(${timelineItems.length}, minmax(0, 1fr))` }}>
            {timelineItems.map((item, index) => (
              <li key={`${item.time}-${item.label}`} className="relative grid min-h-0 grid-cols-2 items-center">
                <Heart aria-hidden="true" fill="currentColor" strokeWidth={1} className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 sm:h-4 sm:w-4" />
                <div className={`flex min-w-0 flex-col items-center gap-0.5 ${index % 2 === 0 ? "pr-4" : "col-start-2 pl-4"}`}>
                  <div className="relative h-8 w-8 shrink-0 min-[390px]:h-10 min-[390px]:w-10 sm:h-16 sm:w-16">
                    {item.artwork && <Image src={item.artwork} alt="" fill sizes="(max-width: 389px) 32px, (max-width: 639px) 40px, 64px" className="object-contain" />}
                  </div>
                  <time className="text-xs font-medium leading-tight sm:text-sm">{item.time}</time>
                  <p className="text-balance text-xs leading-tight sm:text-sm">{item.label}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
