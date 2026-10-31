import InvitationReveal from "../components/InvitationReveal";
import SectionFlorals from "../components/SectionFlorals";
import { Church, Flower2, Martini, Music2, Utensils } from "lucide-react";
import { wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const timelineIcons = { arrival: Flower2, ceremony: Church, cocktails: Martini, dinner: Utensils, party: Music2 };

export default function TimelineSection() {
  return <section id="timeline" className={`${styles.lavenderSection} relative isolate scroll-mt-16 px-6 py-20 md:py-24`} aria-labelledby="jr-timeline">
    <SectionFlorals />
    <div className="mx-auto max-w-4xl">
      <InvitationReveal as="h2" id="jr-timeline" className={`${styles.heading} text-center`}>The celebration unfolds</InvitationReveal>
      <InvitationReveal as="p" delay={0.06} className={`${styles.serif} mt-5 text-center text-lg`}>{wedding.date.day}, {wedding.date.display}</InvitationReveal>
      <ol className={`${styles.timeline} mx-auto mt-12 max-w-[20rem] space-y-10`}>
        {wedding.timeline.map((item, index) => {
          const Icon = timelineIcons[item.icon];
          return <InvitationReveal as="li" key={item.time} delay={index * 0.04} className="relative grid grid-cols-[minmax(0,1fr)_1rem_minmax(0,1fr)] gap-x-3">
            <div className="flex min-w-0 flex-col items-center gap-2 pt-1 text-center">
              <Icon aria-hidden="true" strokeWidth={1.25} className={`${styles.role} size-7`} />
              <time className={`${styles.serif} block text-2xl leading-9 sm:text-3xl`}>{item.time}</time>
            </div>
            <h3 className="col-start-3 flex min-w-0 items-center justify-center text-center text-base leading-6">{item.title}</h3>
          </InvitationReveal>;
        })}
      </ol>
    </div>
  </section>;
}
