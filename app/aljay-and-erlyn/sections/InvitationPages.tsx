import { ArrowUpRight, Church, MapPin } from "lucide-react";
import { wedding } from "../data/wedding";
import { Names, Ornament, PageHeading } from "../components/Stationery";
import Garden from "../components/Garden";
import styles from "../styles/wedding.module.css";

export function FormalInvitation() {
  return <div className={`${styles.formalInvitation} relative w-full max-w-[760px] text-center`}>
    <Ornament />
    <h1 className="mb-6 mt-5 [@media(max-height:800px)]:mb-4 [@media(max-height:800px)]:mt-3"><Names /></h1>
    <p className={`${styles.italic} mb-7 [@media(max-height:800px)]:mb-4`} data-reveal>Together with our families,</p>
    <div className={`${styles.formalNames} space-y-2`} data-reveal><p>{wedding.bride}</p><span className={styles.italic}>and</span><p>{wedding.groom}</p></div>
    <p className={`${styles.body} mx-auto mb-7 mt-6 max-w-[360px] [@media(max-height:800px)]:my-4`} data-reveal>joyfully invite you to celebrate<br />the beginning of our forever.</p>
    <div className="space-y-2" data-reveal><p className={styles.date}>{wedding.date}</p><p className={styles.small}>Three o’clock in the afternoon</p><p className={styles.small}>Holy Family Parish Church · Marikina</p></div>
    <p className={`${styles.tiny} mt-7 [@media(max-height:800px)]:mt-4`} data-reveal>Reception to follow at Teodore Events Place</p>
  </div>;
}

export function StoryPage() {
  return <div className="grid w-full max-w-[1000px] items-center gap-8 md:grid-cols-[0.85fr_1fr] md:gap-16">
    <figure className={`${styles.storyArt} relative mx-auto h-[190px] w-full max-w-[310px] overflow-hidden md:h-[420px]`}><Garden sizes="(max-width: 767px) 310px, 400px" /><figcaption className="sr-only">A decorative painted garden with a pair of swans.</figcaption></figure>
    <div className="text-center md:text-left"><PageHeading>A little like fate</PageHeading><div className={`${styles.storyCopy} space-y-5`} data-reveal>{wedding.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><p className={`${styles.storySignature} mt-6`} data-reveal>One ride. One look. Our forever.</p></div>
  </div>;
}

export function VenuesPage() {
  return <div className="w-full max-w-[960px] text-center"><PageHeading>Where love gathers</PageHeading>
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">{wedding.venues.map((venue, index) => <section key={venue.name} className="flex flex-col items-center" data-reveal>
      {index === 0 ? <Church size={42} strokeWidth={0.8} aria-hidden="true" /> : <MapPin size={42} strokeWidth={0.8} aria-hidden="true" />}
      <p className={`${styles.label} mb-3 mt-5`}>{venue.type}</p><h3 className={`${styles.venueName} max-w-[330px]`}>{venue.name}</h3>
      <p className={`${styles.small} mt-3`}>{venue.detail}</p><p className={`${styles.body} my-4 max-w-[290px]`}>{venue.address}</p><p className={`${styles.italic} mb-4`}>{venue.time}</p>
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`} target="_blank" rel="noopener noreferrer" className={`${styles.textLink} mt-auto inline-flex min-h-11 items-center gap-2 py-2`}>View map<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> for {venue.name} (opens a new tab)</span></a>
    </section>)}</div>
    <p className={`${styles.tiny} mt-8`}>Guest arrival: 2:30 PM · All times are Philippine time</p>
  </div>;
}

export function TimelinePage() {
  return <div className="w-full max-w-[650px] text-center"><PageHeading>A day to remember</PageHeading>
    <ol className="mx-auto w-full max-w-[470px] text-left">{wedding.timeline.map((item) => <li key={item.title} className={`${styles.timelineRow} grid grid-cols-[85px_1fr] gap-5 py-4 sm:grid-cols-[100px_1fr] sm:gap-9 [@media(max-height:800px)]:py-3`} data-reveal>
      <span className={`${styles.timelineTime} pt-1`}>{item.time}</span><div><h3 className={styles.timelineTitle}>{item.title}</h3><p className={`${styles.small} mt-1`}>{item.detail}</p></div>
    </li>)}</ol><p className={`${styles.small} mt-6`}>The schedule may change accordingly.<br />Reception timings will be shared once confirmed.</p>
  </div>;
}

export function QuestionsPage() {
  return <div className="w-full max-w-[650px]"><PageHeading>A few little details</PageHeading>
    <div>{wedding.faqs.map((faq) => <details name="ae-questions" key={faq.question} className={`${styles.faq} py-1`}><summary className="flex min-h-14 cursor-pointer items-center justify-between gap-5 py-3 [@media(max-height:800px)]:min-h-12">{faq.question}<span className={styles.faqPlus} aria-hidden="true">+</span></summary><p className={`${styles.body} pb-5 pr-4`}>{faq.answer}</p></details>)}</div>
    <p className={`${styles.small} mt-7 text-center`}>Something else on your mind?<br /><a className={styles.textLink} href={`mailto:${wedding.email}`}>Write to Aljay & Erlyn</a></p>
  </div>;
}

export function ClosingPage({ onReply }: { onReply: () => void }) {
  return <div className="relative w-full max-w-[620px] text-center"><Ornament /><h2 className={`${styles.heading} mb-6 mt-5`} data-reveal>Our next chapter,<br />with you in it.</h2><p className={`${styles.body} mx-auto max-w-[350px]`} data-reveal>From a chance glance on a jeepney to the promise of a lifetime. We can’t wait to celebrate with the people we love.</p><p className={`${styles.closingNames} my-8`}>Aljay & Erlyn</p><button type="button" className={`${styles.button} min-h-12 px-8 py-3`} onClick={onReply}>Kindly reply</button><p className={`${styles.small} mt-5`}>By {wedding.rsvpDeadline}</p></div>;
}
