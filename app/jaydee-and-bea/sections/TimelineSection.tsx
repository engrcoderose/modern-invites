import Image from "next/image";
import { Heart } from "lucide-react";
import ScrollScene from "../components/ScrollScene";
import ScrollLayer from "../components/ScrollLayer";
import { wedding } from "../data/wedding-data";
import timelineBorder from "../assets/designs/timeline-border.webp";

export default function TimelineSection() {
  return (
    <ScrollScene id="timeline" aria-labelledby="jb-timeline-title" className="jb-timeline relative isolate overflow-hidden px-4 py-10 sm:px-8 sm:py-16">
      <div className="relative mx-auto max-w-[560px] px-[clamp(2.25rem,12vw,5rem)] pb-16 pt-20 sm:pb-24 sm:pt-28">
        <Image src={timelineBorder} alt="" aria-hidden="true" fill sizes="(min-width: 592px) 560px, calc(100vw - 32px)" draggable={false} className="pointer-events-none select-none object-fill" />
        <div className="relative z-10">
          <ScrollLayer as="h2" profile="heading" id="jb-timeline-title" className="jb-timeline-title mb-8 whitespace-nowrap text-center sm:mb-12">Wedding Timeline</ScrollLayer>
          <ol className="mx-auto max-w-[330px]">
            {wedding.timeline.map((event, index) => (
              <li key={event.time} className="grid grid-cols-[3.5rem_0.75rem_minmax(0,1fr)] gap-x-2.5 pb-6 last:pb-0 sm:grid-cols-[4.5rem_1rem_minmax(0,1fr)] sm:gap-x-4 sm:pb-8">
                <p className="jb-serif whitespace-nowrap text-right text-xs leading-[22px] text-[#65536b] sm:text-base">{event.time}</p>
                <div aria-hidden="true" className="relative">
                  {index < wedding.timeline.length - 1 && <span className="jb-timeline-stem absolute -bottom-6 left-1/2 top-5 w-[2px] -translate-x-1/2 sm:-bottom-8" />}
                  <Heart className="relative mx-auto mt-1 h-3.5 w-3.5" fill={wedding.palette[index % wedding.palette.length].hex} stroke="#93869a" strokeWidth={0.8} />
                </div>
                <ScrollScene as="div" reveal className="min-w-0 text-left">
                  <ScrollLayer profile="text" phase={index * 0.02}>
                    <h3 className="jb-serif text-[13px] leading-[22px] text-[#65536b] sm:text-[15px]">{event.title}</h3>
                  </ScrollLayer>
                </ScrollScene>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </ScrollScene>
  );
}
