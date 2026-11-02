import InvitationReveal from "../components/InvitationReveal";
import SectionFlorals from "../components/SectionFlorals";
import { Church, Flower2, Martini, Music2, Utensils } from "lucide-react";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const timelineIcons = { arrival: Flower2, ceremony: Church, cocktails: Martini, dinner: Utensils, party: Music2 };

export default function TimelineSection() {
  return <section id="timeline" className={`${styles.lavenderSection} relative isolate flex min-h-svh scroll-mt-16 items-center px-6 py-20 md:py-24`} aria-labelledby="jr-timeline">
    <SectionFlorals />
    <div className="mx-auto w-full max-w-4xl">
      <InvitationReveal as="h2" id="jr-timeline" distance={16} className={`${styles.heading} text-center`}>The celebration unfolds</InvitationReveal>
      <InvitationReveal as="p" direction="fade" delay={0.08} className={`${styles.serif} mt-5 text-center text-lg`}>{wedding.date.day}, {wedding.date.display}</InvitationReveal>
      <ol className={`${styles.timeline} mx-auto mt-12 max-w-[20rem] space-y-10`}>
        {wedding.timeline.map((item, index) => {
          const Icon = timelineIcons[item.icon];
          return <li key={item.time} className="relative grid grid-cols-[minmax(0,1fr)_1rem_minmax(0,1fr)] gap-x-3">
            <div className="flex min-w-0 justify-center pt-1">
              <Icon aria-hidden="true" strokeWidth={1.25} className={`${styles.role} size-7`} />
            </div>
            <div className="col-start-3 min-w-0 text-center">
              <InvitationReveal as="span" distance={12} delay={index * 0.025} className="block">
                <time className={`${styles.serif} block text-2xl leading-9 sm:text-3xl`}>{item.time}</time>
              </InvitationReveal>
              <InvitationReveal as="h3" direction="right" distance={12} delay={0.08 + index * 0.025} className="mt-1 text-base leading-6">{item.title}</InvitationReveal>
            </div>
          </li>;
        })}
      </ol>
    </div>
  </section>;
}
