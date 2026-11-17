"use client";

import { useEffect, useId, useRef, useState, type ComponentProps } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloorPlanView } from "./floor-plan-view";

type GuestFloorPlanProps = Pick<ComponentProps<typeof FloorPlanView>, "plan" | "highlightedId" | "highlightedSeatNumber">;

export function GuestFloorPlan(props: GuestFloorPlanProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const table = props.plan.tables.find(item => item.id === props.highlightedId);

  useEffect(() => {
    if (!expanded || !dialog.current) return;
    const element = dialog.current;
    const previewElement = preview.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previewElement?.querySelector<HTMLButtonElement>('button[aria-label="Enlarge floor plan"]')?.focus({ preventScroll: true });
    };
  }, [expanded]);

  return <div ref={preview}>
    <FloorPlanView {...props} showOccupancy={false} onEnlarge={() => setExpanded(true)} />
    {expanded && <dialog ref={dialog} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); setExpanded(false); }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-ivory p-0 text-forest backdrop:bg-forest/50">
      <div className="flex h-full min-h-0 flex-col">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b bg-white px-4 py-3">
          <div className="min-w-0"><h2 id={titleId} className="font-elegant text-2xl">Floor plan</h2>
            <p className="mt-1 break-words text-sm leading-5 text-ink-muted">{table ? `Your table: ${table.name}${props.highlightedSeatNumber === undefined ? "" : ` · Seat ${props.highlightedSeatNumber}`}` : "Pinch to zoom. Drag with one finger to explore."}</p></div>
          <Button type="button" variant="outline" className="h-11 shrink-0 px-3" onClick={() => setExpanded(false)}><X aria-hidden="true" className="size-4" /> Close</Button>
        </header>
        <div className="flex min-h-0 flex-1 flex-col p-3 pb-[max(.75rem,env(safe-area-inset-bottom))]">
          <FloorPlanView {...props} showOccupancy={false} expanded initialZoom={2} />
        </div>
      </div>
    </dialog>}
  </div>;
}
