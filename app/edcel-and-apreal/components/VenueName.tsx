import { Fragment } from "react";
import styles from "../styles/invitation.module.css";

export default function VenueName({ name }: { name: string }) {
  return <>{name.split(" ").map((word, index) => <Fragment key={`${word}-${index}`}>
    {index > 0 && " "}
    <span className="inline-block whitespace-nowrap"><span className={styles.venueInitial}>{word.slice(0, 1)}</span>{word.slice(1)}</span>
  </Fragment>)}</>;
}
