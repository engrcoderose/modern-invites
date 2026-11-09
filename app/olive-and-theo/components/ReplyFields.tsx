import { Check, Minus } from "lucide-react";
import type { Reply } from "../utilities/reply";
import styles from "../styles/invitation.module.css";

const labelClass = "block text-xs font-medium leading-relaxed";
const fieldClass = `${styles.input} mt-2 block w-full rounded-lg border border-[var(--ot-line)] px-3.5 py-3 text-base font-normal leading-6`;

interface Props {
  reply: Reply;
  onChange: (changes: Partial<Reply>) => void;
}

export default function ReplyFields({ reply, onChange }: Props) {
  return <>
    <div className="space-y-6">
      <label className={labelClass}>Full name<input name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder="Your full name" value={reply.name} onChange={e => onChange({ name: e.target.value })} className={fieldClass} /></label>
      <label className={labelClass}>Contact number <span className="font-normal">(optional)</span><input name="contact" type="tel" inputMode="tel" maxLength={30} autoComplete="tel" placeholder="09XX XXX XXXX" value={reply.contact} onChange={e => onChange({ contact: e.target.value })} className={fieldClass} /></label>
    </div>
    <fieldset className="mt-7"><legend className={`${labelClass} mb-3`}>Will you attend?</legend><div className="grid gap-3 sm:grid-cols-2">
      {([{ value: "yes", label: "Joyfully accept", icon: Check }, { value: "no", label: "Regretfully decline", icon: Minus }] as const).map(({ value, label, icon: Icon }) => <label key={value} className={`${styles.attendance} flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-4 text-sm`}><input type="radio" name="attendance" required value={value} checked={reply.attendance === value} onChange={() => onChange({ attendance: value })} className="sr-only" /><span>{label}</span><Icon size={17} aria-hidden="true" /></label>)}
    </div></fieldset>
  </>;
}
