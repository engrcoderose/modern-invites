import Image from "next/image";
import roses from "../assets/designs/flower-design-3.png";
import ScheduleTimeline from "../components/ScheduleTimeline";

export default function TimelineSection() {
  return (
    <section id="timeline" aria-labelledby="mj-timeline-title" className="mj-wedding-timeline overflow-hidden px-4 py-12 text-center sm:px-6 sm:py-16">
      <h2 data-mj-reveal id="mj-timeline-title" className="mj-script mx-auto mb-6 max-w-3xl text-[clamp(2.4rem,5vw,4rem)] leading-[1.4] sm:mb-8">Our Wedding Timeline</h2>
      <div className="relative mx-auto w-full max-w-xl px-[13%] pb-28 pt-14 sm:px-20 sm:pb-36 sm:pt-20">
        <svg aria-hidden="true" viewBox="0 0 605 1028" preserveAspectRatio="none" className="mj-timeline-panel pointer-events-none absolute inset-0 h-full w-full">
          <path d="M70 45 C110 20 140 75 180 48 S240 75 280 48 S340 75 380 48 S440 75 485 48 Q570 15 555 100 C530 155 580 180 555 240 S580 315 555 375 S580 450 555 510 S580 585 555 645 S580 720 555 780 S580 855 555 915 Q590 1005 505 985 C465 960 440 1010 400 985 S335 1010 295 985 S230 1010 190 985 S125 1010 85 985 Q25 1010 50 925 C75 870 25 845 50 785 S25 710 50 650 S25 575 50 515 S25 440 50 380 S25 305 50 245 S25 170 50 110 Q25 65 70 45Z" />
        </svg>
        <Image src={roses} alt="" sizes="(max-width: 607px) 28vw, 162px" className="pointer-events-none absolute right-0 top-0 h-auto w-[28%]" />
        <Image src={roses} alt="" sizes="(max-width: 607px) 28vw, 162px" className="pointer-events-none absolute bottom-0 left-0 h-auto w-[28%] rotate-180" />
        <div className="relative">
          <ScheduleTimeline />
        </div>
      </div>
    </section>
  );
}
