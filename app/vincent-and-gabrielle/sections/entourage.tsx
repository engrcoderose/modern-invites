"use client";

import type { InvitationPage } from "./types";
import { entourage } from "../data";
import { Ornament } from "../components/artwork";
import { Names, PartyGroup, PartyPage } from "../components/party";

export function entouragePages(): InvitationPage[] {
  return [
    {
      id: "entourage",
      label: "Parents",
      tone: "olive",
      content: (
        <div className="vg-parents-page flex flex-col items-center gap-8 [@media(max-width:700px)]:gap-6 [&_.vg-names>p:nth-child(odd)]:text-right [&_.vg-names>p:nth-child(even)]:text-left">
          <Ornament className="vg-ornament !m-0" />
          <h2 className="vg-gratitude-heading">With Love and Gratitude</h2>
          <div className="grid w-full max-w-[560px] gap-10 [@media(max-width:700px)]:gap-8">
            <PartyGroup
              title="Parents of the Bride"
              names={entourage.brideParents}
              paired
            />
            <PartyGroup
              title="Parents of the Groom"
              names={entourage.groomParents}
              paired
            />
          </div>
        </div>
      ),
    },
    {
      id: "principal-sponsors",
      label: "Principal Sponsors",
      tone: "olive",
      content: (
        <PartyPage
          title="Principal Sponsors"
          serifTitle
          review={entourage.principal
            .flat()
            .some((person) => person.needsReview)}
        >
          <div className="vg-sponsor-pairs grid gap-2.5 [@media(max-width:700px)]:gap-2">
            {entourage.principal.map((pair, index) => (
              <div
                key={`sponsor-pair-${index}`}
                className="grid grid-cols-2 gap-6 [@media(max-width:700px)]:gap-4 [&>.vg-names:first-child]:text-right [&>.vg-names:last-child]:text-left"
              >
                <Names names={[pair[0]]} />
                <Names names={[pair[1]]} />
              </div>
            ))}
          </div>
        </PartyPage>
      ),
    },
    {
      id: "wedding-party",
      label: "Wedding Party",
      tone: "olive",
      content: (
        <PartyPage
          heading="Our Wedding Party"
          honorAttendants={
            <div className="vg-honor-attendants grid w-full max-w-[560px] grid-cols-2 gap-6 [@media(max-width:700px)]:gap-4 [&>.vg-party-group:first-child]:text-right [&>.vg-party-group:last-child]:text-left">
              <PartyGroup title="Maid of Honor" names={entourage.maidOfHonor} />
              <PartyGroup title="Best Man" names={entourage.bestMan} />
            </div>
          }
          review={[
            ...entourage.secondary.flatMap((group) => group.names),
            ...entourage.groomsmen,
            ...entourage.bridesmaids,
          ].some((person) => person.needsReview)}
        >
          <div className="vg-combined-party">
            <div className="grid gap-6 [@media(max-width:700px)]:gap-5">
              {entourage.secondary.map((group) => (
                <section
                  key={group.role}
                  aria-label={`${group.role} sponsors`}
                  className="grid gap-3 [@media(max-width:700px)]:gap-2.5 [&_.vg-names>p:nth-child(odd)]:text-right [&_.vg-names>p:nth-child(even)]:text-left"
                >
                  <h4 className="vg-party-role">{group.role}</h4>
                  <Names names={group.names} paired />
                </section>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 [@media(max-width:700px)]:gap-4 [@media(max-height:740px)]:mt-6 [&>.vg-party-group:first-child]:text-right [&>.vg-party-group:last-child]:text-left">
              <PartyGroup title="Bridesmaids" names={entourage.bridesmaids} />
              <PartyGroup title="Groomsmen" names={entourage.groomsmen} />
            </div>
          </div>
        </PartyPage>
      ),
    },
    {
      id: "bearers",
      label: "Wedding Party",
      tone: "olive",
      content: (
        <PartyPage heading="Our Wedding Party">
          <div className="vg-bearers grid grid-cols-3 gap-6 [@media(max-width:700px)]:gap-3">
            {entourage.bearers.map((group) => (
              <PartyGroup
                key={group.role}
                title={group.role}
                names={group.names}
              />
            ))}
          </div>
          <div className="mt-10 [@media(max-width:700px)]:mt-8">
            <PartyGroup title="Flowers" names={entourage.flowers} />
          </div>
        </PartyPage>
      ),
    },
  ];
}
