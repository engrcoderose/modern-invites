import { CalendarX2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const coupleRsvpClosedMessage = "Sorry, this RSVP is already closed. Kindly contact the couple directly.";
export const hostRsvpClosedMessage = "Sorry, RSVPs for this event are already closed. Please contact the event host directly.";

export interface RsvpClosedNoticeProps {
  message?: string;
  appearance?: "card" | "minimal";
  titleClassName?: string;
  className?: string;
}

export function RsvpClosedNotice({ message = hostRsvpClosedMessage, appearance = "card", titleClassName, className }: RsvpClosedNoticeProps) {
  const minimal = appearance === "minimal";
  return (
    <section aria-label="RSVP Closed" className={cn("text-center text-[color:var(--smart-rsvp-heading,currentColor)]", minimal ? "py-6" : "overflow-hidden rounded-xl border-2 border-[var(--smart-rsvp-border)] bg-white shadow-xl", className)}>
      <div className={minimal ? "" : "border-b border-[var(--smart-rsvp-border-soft)] bg-[var(--smart-rsvp-soft)] p-6"}>
        <CalendarX2 aria-hidden="true" className="mx-auto mb-4 size-8" />
        <div className={titleClassName ?? "font-libreBaskerville text-2xl"}>
          <h3><span className="font-libreBaskerville text-[clamp(1.25rem,0.65em,2.5rem)] font-normal not-italic tracking-normal">RSVP</span>{" "}Closed</h3>
        </div>
      </div>
      <p role="status" className={cn("mx-auto text-sm leading-7", minimal ? "mt-5 max-w-md" : "p-6 md:p-8")}>{message}</p>
    </section>
  );
}
