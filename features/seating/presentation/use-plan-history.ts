"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import type { SeatingPlan } from "../domain/seating-plan";
import { createPlanHistory, planHistoryReducer } from "../domain/plan-history";

type GroupKind = "pointer" | "field" | "keyboard";
const textEditors = "input:not([type='range']):not([type='color']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable]:not([contenteditable='false'])";
export function isHistoryField(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(`${textEditors}, select`));
}
export function isHistoryTextField(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(textEditors));
}

export function usePlanHistory(initial: SeatingPlan) {
  const [history, dispatch] = useReducer(planHistoryReducer, initial, createPlanHistory);
  const sequence = useRef(0);
  const group = useRef<{ kind: GroupKind; id: number } | null>(null);
  const beginGroup = useCallback((kind: GroupKind) => { group.current = { kind, id: ++sequence.current }; }, []);
  const endGroup = useCallback((kind?: GroupKind) => {
    if (!kind || group.current?.kind === kind) group.current = null;
  }, []);
  useEffect(() => {
    const stop = () => endGroup();
    window.addEventListener("blur", stop);
    return () => window.removeEventListener("blur", stop);
  }, [endGroup]);
  const update = useCallback((plan: SeatingPlan) => dispatch({ type: "edit", plan, group: group.current?.id ?? null }), []);
  const replace = useCallback((plan: SeatingPlan) => { endGroup(); dispatch({ type: "replace", plan }); }, [endGroup]);
  const undo = useCallback(() => {
    if (group.current?.kind === "pointer") return false;
    endGroup(); dispatch({ type: "undo" }); return true;
  }, [endGroup]);
  const redo = useCallback(() => {
    if (group.current?.kind === "pointer") return false;
    endGroup(); dispatch({ type: "redo" }); return true;
  }, [endGroup]);
  return { plan: history.present, canUndo: history.past.length > 0, canRedo: history.future.length > 0, update, replace, undo, redo, beginGroup, endGroup };
}
