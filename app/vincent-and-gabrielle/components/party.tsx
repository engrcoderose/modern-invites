"use client";

import type { ReactNode } from "react";
import type { EntourageName } from "../data";
import { Ornament } from "./artwork";

export function Names({
  names,
  paired = false,
}: {
  names: EntourageName[];
  paired?: boolean;
}) {
  return (
    <div
      className={`vg-names grid gap-y-2.5 [@media(max-width:700px)]:gap-y-2 ${paired ? "grid-cols-2 gap-x-6 [@media(max-width:700px)]:gap-x-4" : ""}`}
    >
      {names.map((person, index) => (
        <p key={`${person.name}-${index}`}>
          {person.name}
          {person.needsReview && (
            <sup aria-label="spelling awaiting confirmation">*</sup>
          )}
        </p>
      ))}
    </div>
  );
}

export function PartyGroup({
  title,
  names,
  paired = false,
}: {
  title: string;
  names: EntourageName[];
  paired?: boolean;
}) {
  return (
    <div className="vg-party-group flex flex-col gap-3 [@media(max-width:700px)]:gap-2.5">
      <h3 className="vg-label">{title}</h3>
      <Names names={names} paired={paired} />
    </div>
  );
}

export function PartyPage({
  title,
  children,
  review = false,
  honorAttendants,
  heading = "With Love and Gratitude",
  serifTitle = false,
}: {
  title?: string;
  children: ReactNode;
  review?: boolean;
  honorAttendants?: ReactNode;
  heading?: string;
  serifTitle?: boolean;
}) {
  return (
    <div
      className={`vg-party-page flex flex-col items-center gap-7 [@media(max-width:700px)]:gap-6 ${honorAttendants ? "[@media(max-height:740px)]:gap-5 [@media(max-height:740px)]:pb-8" : ""}`}
    >
      <div className="flex flex-col items-center gap-4 [@media(max-width:700px)]:gap-3">
        <Ornament className={`vg-ornament !m-0 !h-5 ${honorAttendants ? "[@media(max-height:740px)]:hidden" : ""}`} />
        <h2 className="vg-gratitude-heading">{heading}</h2>
      </div>
      {title && (
        <h3
          className={
            serifTitle
              ? "vg-party-serif-title"
              : "text-[32px] [@media(max-width:700px)]:text-[26px]"
          }
        >
          {title}
        </h3>
      )}
      {honorAttendants}
      <div className="vg-party-content mx-auto w-full max-w-[560px]">
        {children}
      </div>
      {review && (
        <p className="vg-review-note">* Name spelling to be confirmed.</p>
      )}
    </div>
  );
}

