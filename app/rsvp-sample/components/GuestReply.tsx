import { Check, Minus } from "lucide-react";
import type { AttendanceChoice, GuestResponseDraft, PartyGuest } from "@/components/smart-rsvp/types";

interface GuestReplyProps {
  guest: PartyGuest;
  response: GuestResponseDraft;
  onChange: (changes: Partial<GuestResponseDraft>) => void;
}

export default function GuestReply({ guest, response, onChange }: GuestReplyProps) {
  const choices: { value: AttendanceChoice; label: string }[] = [
    { value: "attending", label: "Joyfully accept" },
    { value: "declined", label: "Regretfully decline" },
  ];

  return (
    <fieldset className="min-w-0 border-t border-[#dfe4dc] pt-4">
      <legend className="pr-3 text-sm font-medium">{guest.fullName}<span className="ml-2 text-xs font-normal text-[#657368]">{guest.guestType === "child" ? "Child" : "Adult"}</span></legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {choices.map(({ value, label }) => (
          <label key={value} className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#dfe4dc] px-3 py-3 text-xs transition-colors has-[:checked]:border-[#365c47] has-[:checked]:bg-[#edf2e9] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#517662]">
            <input type="radio" required name={`guest-${guest.id}`} value={value} checked={response.status === value} onChange={() => onChange({ status: value, ...(value === "declined" ? { dietaryRestrictions: "" } : {}) })} className="sr-only" />
            {value === "attending" ? <Check size={15} aria-hidden="true" /> : <Minus size={15} aria-hidden="true" />}{label}
          </label>
        ))}
      </div>
      {response.status === "attending" && (
        <label className="mt-4 block text-xs text-[#657368]">Dietary requirements <span>(optional)</span>
          <input value={response.dietaryRestrictions} onChange={event => onChange({ dietaryRestrictions: event.target.value })} maxLength={300} placeholder="e.g. vegetarian, nut allergy" className="mt-2 w-full rounded-lg border border-[#dfe4dc] bg-white px-3 py-3 text-base text-[#263e35] placeholder:text-[#747e74]" />
        </label>
      )}
    </fieldset>
  );
}
