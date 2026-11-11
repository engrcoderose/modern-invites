"use client";
import type { InvitationPage } from "./types";
import { entourage } from "../data";
import { Ornament } from "../components/artwork";
import { PartyGroup } from "../components/party";
export function entouragePages(): InvitationPage[] {
  return [{ id: "entourage", label: "Parents", tone: "olive", content: (
    <div className="op-parents-page flex flex-col items-center gap-8">
      <Ornament className="op-ornament" />
      <h2 className="op-gratitude-heading">With Love and Gratitude</h2>
      <PartyGroup title="Parents of the Bride" names={entourage.brideParents} />
    </div>
  ) }];
}
