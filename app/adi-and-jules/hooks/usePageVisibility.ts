"use client";

import { useEffect, useState } from "react";

/** Share tab visibility handling across the invitation's animated media. */
export function usePageVisibility() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return visible;
}
