import { Plus } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import FloralAccent from "../components/FloralAccent";
import { guestQuestions } from "../data/guest-notes";
import styles from "../styles/invitation.module.css";

export default function FaqSection() {
  return <section id="faq" aria-labelledby="ea-faq-title" className={`${styles.faq} px-6 py-20 sm:px-10 md:py-24`}>
    <div className="mx-auto max-w-2xl">
      <SectionHeading id="ea-faq-title">FAQ</SectionHeading>
      <div className="px-5 text-[var(--ea-text)] sm:px-7">
        {guestQuestions.map(({ question, paragraphs, contacts }) => <details key={question} className={`${styles.disclosure} group py-2`}>
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-3 text-base"><span>{question}</span><Plus className={`${styles.disclosureIcon} h-4 w-4 shrink-0`} strokeWidth={1.5} aria-hidden="true" /></summary>
          <div className="space-y-3 pb-5 pr-2 pt-1 sm:pr-6">
            {paragraphs.map(paragraph => <p key={paragraph} className={styles.body}>{paragraph}</p>)}
            {contacts && <div className="flex flex-col items-start gap-2 pt-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {contacts.map(({ name, display, href }) => <a key={name} href={href} className={`${styles.textLink} inline-flex min-h-11 items-center gap-2 py-2 text-sm`}>
                <span>{name}</span><span className="whitespace-nowrap">{display}</span>
              </a>)}
            </div>}
          </div>
        </details>)}
      </div>
      <FloralAccent variant="cosmos" className="mx-auto mt-10 w-14" sizes="56px" />
    </div>
  </section>;
}
