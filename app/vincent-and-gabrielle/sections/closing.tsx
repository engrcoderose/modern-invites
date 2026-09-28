"use client";

import { ChevronDown } from "lucide-react";
import type { InvitationActions, InvitationPage } from "./types";
import { faqs } from "../data";
import { Ornament } from "../components/artwork";
import { Countdown, SaveTheDateFilm } from "../components/countdown-film";
import RsvpFlow from "../components/rsvp-flow";

export function closingPages({ mediaReady, onVideoPlay }: InvitationActions): InvitationPage[] {
  return [
    {
      id: "questions",
      label: "FAQs",
      content: (
        <div className="vg-faq-page">
          <h2 className="vg-heading !my-3 [@media(max-width:700px)]:!my-2 [@media(max-width:700px)]:!text-[clamp(28px,8.8vw,36px)]">
            A Few Helpful Details
          </h2>
          <div className="mt-4 text-left [@media(max-width:700px)]:mt-3">
            {faqs.map((faq) => (
              <details key={faq.question} name="vg-wedding-faq" data-vg-reveal className="vg-faq-item group">
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-3 [@media(max-width:700px)]:py-2">
                  <span>{faq.question}</span>
                  <ChevronDown aria-hidden="true" size={16} className="shrink-0 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="vg-body vg-faq-answer pb-4 pr-7">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "rsvp",
      label: "RSVP",
      tone: "woodland",
      content: (
        <div className="vg-rsvp-page relative">
          <div className="vg-rsvp-plaque relative mx-auto mb-7 w-[245px] max-w-[85%] px-7 py-5">
            <div
              className="pointer-events-none absolute -top-3 inset-x-0 flex justify-center"
              aria-hidden="true"
            >
              <Ornament className="h-6 w-[76px] rounded-full bg-[var(--vg-paper)] px-2 text-[#9d916a]" />
            </div>
            <h2 className="whitespace-nowrap text-center">Kindly Reply</h2>
          </div>
          <div className="vg-rsvp-card py-[30px] px-[35px] [@media(max-width:700px)]:px-[22px]">
            <p className="vg-body">
              Find your invitation to let us know if you can join us.
            </p>
            <RsvpFlow />
          </div>
        </div>
      ),
    },
    {
      id: "save-the-date",
      label: "Wedding Countdown",
      content: (
        <div className="vg-save-page flex flex-col items-center gap-8 [@media(max-width:700px)]:gap-6">
          <h2 className="max-w-[640px] text-center text-[clamp(30px,5vw,44px)]">
            We can&apos;t wait to celebrate with you!
          </h2>
          <SaveTheDateFilm ready={mediaReady} onPlay={onVideoPlay} />
          <Countdown />
        </div>
      ),
    },
  ];
}
