import styles from "../styles/invitation.module.css";

export default function VenueLettering({ text }: { text: string }) {
  return <><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(/(\s+)/u).map((word, index) => {
    const letters = word.match(/^([^\p{L}]*)(\p{L})(.*)$/u);
    if (!letters) return word;
    const [, prefix, initial, rest] = letters;
    return <span key={index} className="whitespace-nowrap">{prefix}<span className={styles.venueInitial}>{initial}</span>{rest}</span>;
  })}</span></>;
}
