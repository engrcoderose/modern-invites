import EmbossedBackdrop from "../components/EmbossedBackdrop";
import SectionHeading from "../components/SectionHeading";
import FloralAccent from "../components/FloralAccent";
import { family, littleOnes, principalSponsors, secondarySponsors, weddingParty } from "../data/entourage";
import styles from "../styles/invitation.module.css";

function NameGroup({ role, names, className = "", featured = false }: { role: string; names: string[]; className?: string; featured?: boolean }) {
  const titleClassName = featured
    ? `${styles.featuredRoleTitle} text-[clamp(1.65rem,7.2vw,3rem)]`
    : `${styles.roleTitle} text-[clamp(1.125rem,6vw,1.5rem)] sm:text-2xl md:text-3xl`;
  return <div className={`${className} ${featured ? "mx-auto w-full max-w-xl border-y border-[var(--ea-line)] py-7" : ""}`} data-reveal>
    <h3 className={`${titleClassName} mb-4`}>{role}</h3>
    <ul className={`${styles.formal} space-y-2 text-[13px] leading-7 sm:text-sm`}>{names.map((name) => <li key={name}>{name}</li>)}</ul>
  </div>;
}

export default function EntourageSection() {
  return <section id="entourage" aria-labelledby="ea-entourage-title" className={`${styles.entourage} relative overflow-hidden px-6 py-20 sm:px-10 md:py-28`}>
    <EmbossedBackdrop />
    <div className="relative mx-auto max-w-5xl text-center">
      <FloralAccent variant="entourage" className="mx-auto mb-7 w-28 sm:w-32" sizes="(min-width: 640px) 128px, 112px" />
      <SectionHeading id="ea-entourage-title" description="The cherished people who stand beside us as we begin this new chapter.">The Entourage</SectionHeading>
      <div className="grid gap-10 sm:grid-cols-2">{family.map((group) => <NameGroup key={group.role} {...group} />)}</div>
      <div className={`${styles.entourageDivider} my-12`} aria-hidden="true" />
      <h3 className={`${styles.roleTitle} mb-7 text-[clamp(1.5rem,7vw,1.875rem)] sm:text-4xl`} data-reveal>Principal sponsors</h3>
      <ul className={`${styles.sponsorList} -mx-5 space-y-4 text-[clamp(0.75rem,2.7vw,0.875rem)] leading-6 sm:mx-auto sm:max-w-3xl sm:text-sm`}>
        {principalSponsors.map(([first, second]) => <li key={first} className="grid grid-cols-2 items-start gap-x-[clamp(1rem,5vw,1.5rem)] sm:gap-x-12" data-reveal><span className="text-right">{first}</span><span className="text-left">{second}</span></li>)}
      </ul>
      <div className={`${styles.entourageDivider} my-12`} aria-hidden="true" />
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">{weddingParty.map((group) => <NameGroup key={group.role} {...group} />)}</div>
      <div className={`${styles.entourageDivider} my-12`} aria-hidden="true" />
      <h3 className={`${styles.roleTitle} mb-8 text-[clamp(1.5rem,7vw,1.875rem)] sm:text-4xl`} data-reveal>Secondary sponsors</h3>
      <div className="grid gap-9 md:grid-cols-3">{secondarySponsors.map((group) => <NameGroup key={group.role} {...group} />)}</div>
      <div className={`${styles.entourageDivider} my-12`} aria-hidden="true" />
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">{littleOnes.map((group) => <NameGroup key={group.role} {...group} className="last:sm:col-span-2" />)}</div>
    </div>
  </section>;
}
