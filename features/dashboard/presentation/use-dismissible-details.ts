"use client";

import { useEffect, useRef } from "react";

export function useDismissibleDetails() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeWhenClickingOutside(event: PointerEvent) {
      const details = detailsRef.current;

      if (
        details?.open &&
        event.target instanceof Node &&
        !details.contains(event.target)
      ) {
        details.open = false;
      }
    }

    function closeWhenPressingEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && detailsRef.current?.open) {
        detailsRef.current.open = false;
        detailsRef.current.querySelector("summary")?.focus();
      }
    }

    document.addEventListener("pointerdown", closeWhenClickingOutside);
    document.addEventListener("keydown", closeWhenPressingEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        closeWhenClickingOutside,
      );
      document.removeEventListener(
        "keydown",
        closeWhenPressingEscape,
      );
    };
  }, []);

  return detailsRef;
}
