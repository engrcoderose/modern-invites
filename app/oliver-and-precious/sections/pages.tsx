"use client";

import type { InvitationActions, InvitationPage } from "./types";
import { introductionPages } from "./introduction";
import { entouragePages } from "./entourage";
import { timelinePages } from "./timeline";
import { detailPages } from "./details";
import { closingPages } from "./closing";

export function createInvitationPages(actions: InvitationActions): InvitationPage[] {
  return [...introductionPages(), ...timelinePages(), ...entouragePages(), ...detailPages(actions), ...closingPages()];
}
