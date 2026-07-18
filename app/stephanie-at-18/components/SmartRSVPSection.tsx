"use client";

import {
  debutSmartRsvpTheme,
  SmartRsvpFlow,
} from "@/components/smart-rsvp";

import type { RSVPInfo } from "../types";

interface SmartRSVPSectionProps {
  rsvp: RSVPInfo;
  eventSlug: string;
}

export default function SmartRSVPSection({
  rsvp,
  eventSlug,
}: SmartRSVPSectionProps) {
  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-gradient-to-b from-yellow-50 to-pink-50 px-4 py-20"
    >
      <div className="container mx-auto">
        <div className="mx-auto mb-12 text-center">
          <p className="mb-5 font-libreBaskerville text-base uppercase text-[#ac243d] md:text-xl">
            {rsvp.subtitle}
          </p>

          <div className="mx-auto mb-4 h-1 w-16 bg-yellow-400" />

          <h2 className="font-meaCulpa text-5xl text-[#ac243d] md:text-8xl">
            RSVP
          </h2>
        </div>

        <div className="mx-auto max-w-xl">
          <SmartRsvpFlow
            eventSlug={eventSlug}
            theme={debutSmartRsvpTheme}
          />
        </div>
      </div>
    </section>
  );
}
