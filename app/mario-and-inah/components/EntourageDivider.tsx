import styles from "../styles/invitation.module.css";

export default function EntourageDivider() {
  return (
    <div data-reveal="ornament" aria-hidden="true" className="mx-auto my-10 flex w-full max-w-sm items-center gap-4 sm:my-12 sm:gap-5">
      <span className={`${styles.entourageRule} h-px flex-1`} />
      <svg viewBox="0 0 40 20" fill="none" className="h-5 w-10 shrink-0" stroke="currentColor" strokeWidth="0.75">
        <path d="M20 3 25 10 20 17 15 10Z" />
        <path d="M15 10H4m21 0h11M10 6l4 4-4 4m20-8-4 4 4 4" />
      </svg>
      <span className={`${styles.entourageRule} h-px flex-1 rotate-180`} />
    </div>
  );
}
