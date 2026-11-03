import Image from "next/image";
import { wedding } from "../data/wedding";
import { Ornament, PageHeading, WeddingLogo } from "../components/Stationery";
import ivoryFlower from "../assets/design/ivory-flower.png";
import RestrictionText from "../components/RestrictionText";
import greenRibbonFlower from "../assets/design/flower-with-green-ribbon.png";
import styles from "../styles/wedding.module.css";

export function FormalInvitation() {
  return <div className={`${styles.formalInvitation} relative flex min-h-full w-full flex-col items-center justify-center gap-4 px-7 py-5 text-center [@media(max-height:740px)]:gap-3`}>
    <div id="ae-invitation-art"><WeddingLogo variant="green" priority className="h-[clamp(190px,37svh,320px)]" /></div>
    <h1 className={`${styles.formalNames} flex flex-col items-center`} data-reveal><span>{wedding.bride}</span><span className="text-[0.65em]">and</span><span>{wedding.groom}</span></h1>
    <p className={styles.body} data-reveal>invite you to celebrate our love</p>
    <p className={styles.date} data-reveal>{wedding.date}</p>
  </div>;
}

export function TimelinePage() {
  return <div className="w-full max-w-[650px] text-center">
    <header className="mb-7 md:mb-10 [@media(max-height:800px)]:mb-4" data-reveal>
      <Image src={ivoryFlower} alt="" sizes="(max-height: 800px) 48px, 64px" className="mx-auto mb-2 h-16 w-16 object-contain [@media(max-height:800px)]:h-12 [@media(max-height:800px)]:w-12" />
      <h2 className={`${styles.heading} ${styles.timelineHeading}`}>The Wedding Timeline</h2>
    </header>
    <ol className="mx-auto w-full max-w-[470px] text-left">{wedding.timeline.map((item) => <li key={item.title} className={`${styles.timelineRow} grid grid-cols-[85px_1fr] gap-x-5 gap-y-1 py-2.5 sm:grid-cols-[100px_1fr] sm:gap-x-9 [@media(max-height:800px)]:py-2`} data-reveal>
      <span className={`${styles.timelineTime} self-center`}>{item.time}</span><h3 className={`${styles.timelineTitle} -ml-[0.16em] self-center`}>{item.title}</h3>{item.detail && <p className={`${styles.small} col-start-2`}>{item.detail}</p>}
    </li>)}</ol><p className={`${styles.small} mt-6`}>The schedule may change accordingly.</p>
  </div>;
}

export function QuestionsPage() {
  return <div className="w-full max-w-[650px]"><PageHeading>A Few Helpful Details</PageHeading>
    <div>{wedding.faqs.map((faq) => <details data-reveal name="ae-questions" key={faq.question} className={`${styles.faq} py-1`}><summary className="flex min-h-14 cursor-pointer items-center justify-between gap-5 py-3 [@media(max-height:800px)]:min-h-12">{faq.question}<span className={styles.faqPlus} aria-hidden="true">+</span></summary><p className={`${styles.body} pb-5 pr-4`}><RestrictionText>{faq.answer}</RestrictionText></p></details>)}</div>
    <Image src={greenRibbonFlower} alt="" sizes="(max-height: 800px) 35px, clamp(52px, 8.66svh, 80px)" className="mx-auto mt-4 h-[clamp(72px,12svh,110px)] w-auto [@media(max-height:800px)]:mt-2 [@media(max-height:800px)]:h-12" data-reveal />
  </div>;
}

export function ClosingPage() {
  return <div className="relative w-full max-w-[620px] text-center"><Ornament /><h2 className={`${styles.heading} mb-6 mt-5`} data-reveal>We can’t wait to<br />celebrate with you!</h2><p className={`${styles.closingNames} my-8`}>Aljay & Erlyn</p><p className={styles.date}>{wedding.date}</p></div>;
}
