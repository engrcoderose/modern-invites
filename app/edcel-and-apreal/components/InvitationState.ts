"use client";

import { createContext, useContext } from "react";

export const InvitationOpenContext = createContext(false);
export const useInvitationOpen = () => useContext(InvitationOpenContext);
