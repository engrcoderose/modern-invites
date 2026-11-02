import InvitationReveal from "../components/InvitationReveal";
import { families, principalSponsors, weddingParty, secondarySponsors, flowerGirls, bearers, type EntourageGroup } from "../data/entourage";
import styles from "../styles/invitation.module.css";

function Group({ role, names }: EntourageGroup) {
  return <div className="text-center">
    <InvitationReveal as="h3" className={`${styles.role} mb-4 text-xs uppercase tracking-[0.13em]`}>{role}</InvitationReveal>
    <ul className="space-y-2">{names.map((name, index) => <InvitationReveal as="li" key={name} delay={Math.min(index * 0.025, 0.15)} className={`${styles.entourageName} text-lg leading-relaxed`}>{name}</InvitationReveal>)}</ul>
  </div>;
}

export default function EntourageSection() {
  return <section id="entourage" className={`${styles.entourageSection} relative isolate scroll-mt-20`}>
    <div className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
      <InvitationReveal as="h2" className={`${styles.heading} text-center`}>The Wedding Entourage</InvitationReveal>
      <InvitationReveal as="p" delay={0.06} className="mx-auto mt-5 max-w-lg text-center text-base sm:text-sm leading-7">The people who have filled our lives with love,<br className="hidden sm:block" /> and stand with us as we begin this chapter.</InvitationReveal>
      <div className="mt-12 grid gap-9 sm:grid-cols-2">{families.map(group => <Group key={group.role} {...group} />)}</div>
      <div className={`${styles.entourageDivider} my-11 border-t`} />
      <div className="text-center">
        <InvitationReveal as="h3" className={styles.subheading}>Principal sponsors</InvitationReveal>
        <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">{principalSponsors.map((name, index) => <InvitationReveal as="li" key={name} delay={Math.min(index * 0.025, 0.15)} className={`${styles.entourageName} text-lg leading-relaxed`}>{name}</InvitationReveal>)}</ul>
      </div>
      <div className={`${styles.entourageDivider} my-11 border-t`} />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-12">{weddingParty.map(group => <Group key={group.role} {...group} />)}</div>
      <InvitationReveal as="h3" className={`${styles.subheading} mb-8 mt-14 text-center`}>Secondary sponsors</InvitationReveal>
      <div className="grid gap-8 md:grid-cols-3">{secondarySponsors.map(group => <Group key={group.role} {...group} />)}</div>
      <div className={`${styles.entourageDivider} my-11 border-t`} />
      <div className="grid items-start gap-x-12 gap-y-9 sm:grid-cols-2">
        <Group {...flowerGirls} />
        <div className="space-y-9">{bearers.map(group => <Group key={group.role} {...group} />)}</div>
      </div>
    </div>
  </section>;
}
