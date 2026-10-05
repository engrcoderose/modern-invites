"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, PointerEvent } from "react";

export function useTableHover(enabled: boolean) {
  const tooltipId = useId();
  const [active, setActive] = useState<{ tableId: string; anchor: SVGGElement } | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cancelClose = useCallback(() => { clearTimeout(closeTimer.current); }, []);
  const dismiss = useCallback(() => { cancelClose(); setActive(null); }, [cancelClose]);
  const scheduleClose = useCallback(() => {
    cancelClose();
    // Allow the pointer to cross the small gap into the card and scroll its list.
    closeTimer.current = setTimeout(() => setActive(current =>
      current?.anchor === document.activeElement && current.anchor.matches(":focus-visible") ? current : null), 150);
  }, [cancelClose]);
  useEffect(() => () => cancelClose(), [cancelClose]);
  useEffect(() => {
    if (!active) return;
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") dismiss(); };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [active, dismiss]);

  function show(tableId: string, anchor: SVGGElement) {
    if (!enabled) return;
    cancelClose(); setActive({ tableId, anchor });
  }
  function interaction(tableId: string) {
    if (!enabled) return {};
    return {
      "aria-describedby": active?.tableId === tableId ? tooltipId : undefined,
      onPointerEnter: (event: PointerEvent<SVGGElement>) => { if (event.pointerType !== "touch" && event.buttons === 0) show(tableId, event.currentTarget); },
      onPointerLeave: scheduleClose,
      onFocus: (event: FocusEvent<SVGGElement>) => { if (event.currentTarget.matches(":focus-visible")) show(tableId, event.currentTarget); },
      onBlur: scheduleClose,
    };
  }
  return { active: enabled ? active : null, tooltipId, interaction, dismiss, cancelClose, scheduleClose };
}
