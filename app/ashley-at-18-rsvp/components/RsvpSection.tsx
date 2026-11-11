"use client";

import { OpenRsvpForm } from "@/components/smart-rsvp/OpenRsvpForm";
import type { OpenRsvpInput } from "@/features/rsvp/domain/open-rsvp";
import { previewEvent } from "../data/event";
import styles from "../styles/invitation.module.css";
import DecorativeArtwork from "./DecorativeArtwork";

// Deliberately local: this draft never calls an API or persists a response.
async function previewReply(_reply: OpenRsvpInput): Promise<void> {
  await Promise.resolve();
}

export default function RsvpSection() {
  return (
    <section id="rsvp" aria-labelledby="reply-heading" className="relative isolate scroll-mt-[72px] overflow-hidden bg-white px-6 py-20 sm:px-12 sm:py-28">
      <DecorativeArtwork name="quillStationery" sizes="(min-width: 640px) 144px, 112px" className="mx-auto mb-7 w-28 sm:w-36" />
      <div className="mx-auto max-w-xl">
      <h2 id="reply-heading" data-reveal="heading" className={`${styles.sectionTitle} mb-4 text-center text-5xl text-[#9b3561] sm:text-7xl`}>Kindly RSVP</h2>
      <p data-reveal="message" data-reveal-delay="120" className="mb-10 text-center text-sm leading-7 text-[#705c79]">Let Ashley know if you can join her celebration. Please reply for yourself using your full name.</p>
      <OpenRsvpForm
        event={previewEvent}
        fields={{ email: false }}
        appearance="minimal"
        description="Enter your name and choose whether you’ll be joining us."
        preview
        onSubmit={previewReply}
      />
      </div>
      <div className="mt-12 flex items-end justify-between gap-6 lg:mt-0">
        <DecorativeArtwork name="butterflyFlorals" sizes="(min-width: 1024px) 224px, (min-width: 640px) 128px, 112px" className="w-28 -scale-x-100 sm:w-32 lg:absolute lg:bottom-8 lg:left-0 lg:w-56" />
        <DecorativeArtwork name="butterflyFlorals" sizes="(min-width: 1024px) 224px, (min-width: 640px) 128px, 112px" className="w-28 sm:w-32 lg:absolute lg:bottom-8 lg:right-0 lg:w-56" />
      </div>
    </section>
  );
}
