import Image from "next/image";
import { ArrowUpRight, Flower2, Heart, Martini, MicVocal, Utensils, Users } from "lucide-react";
import FloralArtwork from "../components/FloralArtwork";
import ParallaxLayer from "../components/ParallaxLayer";
import { venuePhoto } from "../data/artwork";
import { timeline, wedding } from "../data/wedding";
import styles from "../styles/invitation.module.css";

const icons = { arrival: Flower2, entourage: Users, ceremony: Heart, cocktails: Martini, dinner: Utensils, music: MicVocal };

export default function CelebrationSection() {
  return (
    <>
      <section id="celebration" aria-labelledby="mi-celebration-title" className={`${styles.lilac} relative isolate overflow-hidden px-6 pb-44 pt-16 text-center sm:px-10 sm:pb-64 sm:pt-20 lg:px-16`}>
        <ParallaxLayer reverse className="-z-10">
          <FloralArtwork reveal name="venueUpper" className="absolute inset-x-0 top-0 h-auto w-full opacity-60" sizes="100vw" />
        </ParallaxLayer>
        <ParallaxLayer className="-z-10">
          <FloralArtwork reveal name="venueLower" className="absolute inset-x-0 -bottom-3 h-auto w-full" sizes="100vw" />
        </ParallaxLayer>
        <div className="mx-auto max-w-xl">
          <h2 data-reveal="heading" id="mi-celebration-title" className={styles.heading}>The Wedding Venue</h2>
          <ParallaxLayer inline reverse className="mx-auto mb-9 mt-5 w-[80%] max-w-sm">
            <FloralArtwork reveal name="venueLine" className="h-auto w-full" sizes="(min-width: 540px) 384px, 72vw" />
          </ParallaxLayer>
          <div className={`${styles.venuePanel} mx-auto max-w-md p-4 sm:p-6`}>
            <p data-reveal="text" className={`${styles.serifDetail} mb-4 text-xs uppercase tracking-wider`}>Ceremony & Reception</p>
            <Image data-reveal="photo-rise" src={venuePhoto} alt="The poolside garden and pavilion at Panaad Garden Tagaytay" sizes="(min-width: 640px) 400px, calc(100vw - 82px)" className="h-auto w-full" />
            <h3 data-reveal="heading" className={`${styles.venueName} mt-6`}>{wedding.venue.name}</h3>
            <p data-reveal="text" className={`${styles.serifDetail} mx-auto mt-4 max-w-xs text-xs leading-6 sm:text-sm`}>{wedding.venue.address}</p>
            <p data-reveal="text" className={`${styles.serifDetail} mt-3 text-sm`}>Ceremony at 4:00 PM</p>
            <a data-reveal="text" href={wedding.venue.directions} target="_blank" rel="noopener noreferrer" className={`${styles.textLink} mt-4 inline-flex min-h-11 items-center justify-center gap-2 text-xs uppercase tracking-wider`}>View map <ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </div>
      </section>
      <section aria-labelledby="mi-schedule-title" className="relative isolate overflow-hidden px-6 py-16 sm:px-10 md:py-24 lg:px-16">
        <ParallaxLayer reverse className="-z-10">
          <FloralArtwork reveal name="timelineUpper" className="absolute left-0 top-0 h-auto w-40 sm:w-52 lg:w-[280px]" sizes="(min-width: 1024px) 280px, (min-width: 640px) 208px, 160px" />
        </ParallaxLayer>
        <ParallaxLayer className="-z-10">
          <FloralArtwork reveal name="timelineLower" className="absolute bottom-0 right-0 h-auto w-40 -scale-y-100 sm:w-52 lg:w-[280px] [@media(max-width:359px)]:-right-8" sizes="(min-width: 1024px) 280px, (min-width: 640px) 208px, 160px" />
        </ParallaxLayer>
        <div className="mx-auto max-w-6xl">
          <h2 data-reveal="heading" id="mi-schedule-title" className={`${styles.heading} text-center`}>The day unfolds</h2>
          <p data-reveal="text" className={`${styles.serifDetail} mt-5 text-center text-xs leading-6 sm:text-sm`}>{wedding.date.day}, {wedding.date.display}</p>
          <ol aria-label="Wedding timeline" className="mx-auto mt-12 max-w-[15rem] lg:mt-16">
            {timeline.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.time} className={`${styles.timelineItem} relative pb-10 last:pb-0`}>
                  <span className={`${styles.timelineDot} absolute left-1/2 top-3 size-2 -translate-x-1/2 rounded-full`} aria-hidden="true" />
                  <div data-reveal="timeline" data-reveal-delay={index * 0.06} className="grid grid-cols-2 items-start gap-4 text-center">
                    <Icon size={29} strokeWidth={1.15} aria-hidden="true" className="mt-0.5 justify-self-center" />
                    <div className="min-w-0">
                      <p className={`${styles.fullName} whitespace-nowrap text-lg`}>{item.time}</p>
                      <p className="mt-2 text-sm leading-6">{item.label}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
