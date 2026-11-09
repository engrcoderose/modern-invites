import { ChevronDown } from "lucide-react";
import { Ornament, SlideHeading } from "../components/Stationery";
import { faqs } from "../data/wedding";
import styles from "../styles/invitation.module.css";

export default function FaqSlide() {
  return <div data-invitation-scroll tabIndex={0} role="region" aria-label="Frequently asked questions" className={`${styles.sponsorScroller} absolute inset-0 overflow-y-auto overscroll-contain outline-none`}>
    <div className="relative mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center gap-5 px-5 py-6 text-center sm:px-12">
      <div className="flex shrink-0 flex-col items-center gap-3"><Ornament /><SlideHeading>A Few Little Details</SlideHeading></div>
      <div className="w-full max-w-[660px] shrink-0 text-left">
        {faqs.map(({ question, answer }) => <details data-cr-reveal key={question} name="cr-wedding-faq" className={`${styles.faqItem} group border-t`}>
          <summary className={`${styles.faqQuestion} flex min-h-11 cursor-pointer items-center justify-between gap-4 py-3`}>
            <span>{question}</span>
            <ChevronDown size={16} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
          </summary>
          <p className={`${styles.faqAnswer} pb-4 pr-7 text-xs leading-5 sm:text-sm sm:leading-6`}>{answer}</p>
        </details>)}
      </div>
    </div>
  </div>;
}
