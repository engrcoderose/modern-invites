import { event, rsvpConfig } from "../data/event";
import styles from "../styles/invitation.module.css";

export default function RsvpDetails({ reserved }: { reserved: number }) {
  const details = [
    ["Capacity", `${rsvpConfig.capacity} guests`],
    ["Maximum per RSVP", `${rsvpConfig.maxGuests} person`],
    ["Reply by", event.deadline],
  ];

  return (
    <div className="mt-8 max-w-sm">
      <dl className="divide-y divide-[var(--ot-line)] border-y border-[var(--ot-line)]">
        {details.map(([label, value]) => (
          <div key={label} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <dt className="text-xs text-[var(--ot-muted)]">{label}</dt>
            <dd className={`${styles.display} text-xl`}>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 rounded-xl border border-[var(--ot-line)] p-5">
        <div className="flex items-center justify-between gap-3">
          <span id="ot-reserved-label" className="text-xs text-[var(--ot-muted)]">Seats reserved</span>
          <span className={`${styles.display} text-xl tabular-nums`}>{reserved} / {rsvpConfig.capacity}</span>
        </div>
        <progress aria-labelledby="ot-reserved-label" value={reserved} max={rsvpConfig.capacity} className={`${styles.seatProgress} mt-4 block h-1 w-full overflow-hidden rounded-full`} />
      </div>
    </div>
  );
}
