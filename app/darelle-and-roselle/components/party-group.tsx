import styles from "../styles/invitation.module.css";

export default function PartyGroup({ title, names }: { title: string; names: readonly string[] }) {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <h3 className={styles.role}>{title}</h3>
      <ul className={`${styles.names} grid gap-2`}>
        {names.map((name) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}
