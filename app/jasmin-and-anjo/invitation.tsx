"use client";
import { useState, type ReactNode } from "react";
import OpeningScreen from "./components/OpeningScreen";
export default function Invitation({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  return <main className="floral-invitation relative font-sans text-[#33473d] overflow-x-clip bg-[#fbf8f1]">
    <OpeningScreen bride="Jasmin" groom="Anjo" dateDisplay="11.21.26" onOpen={() => setOpened(true)} />
    <div inert={!opened} className="invitation-content relative">{children}</div>
  </main>;
}
