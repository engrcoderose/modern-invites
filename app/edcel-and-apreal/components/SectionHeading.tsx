import styles from "../styles/invitation.module.css";

export default function SectionHeading({ id, children, description }: { id: string; children: React.ReactNode; description?: string }) {
  return <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16" data-reveal>
    <h2 id={id} className={styles.sectionTitle}>{children}</h2>
    {description && <p className={`${styles.body} mx-auto mt-5 max-w-xl`}>{description}</p>}
  </div>;
}
