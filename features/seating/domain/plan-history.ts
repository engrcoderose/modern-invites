import type { SeatingPlan } from "./seating-plan.ts";

export const HISTORY_LIMIT = 100;
export interface PlanHistory {
  past: SeatingPlan[];
  present: SeatingPlan;
  future: SeatingPlan[];
  group: number | null;
}
export type HistoryAction =
  | { type: "edit"; plan: SeatingPlan; group: number | null }
  | { type: "replace"; plan: SeatingPlan }
  | { type: "undo" }
  | { type: "redo" };

export function createPlanHistory(plan: SeatingPlan): PlanHistory {
  return { past: [], present: plan, future: [], group: null };
}

export function planHistoryReducer(
  state: PlanHistory,
  action: HistoryAction,
): PlanHistory {
  if (action.type === "undo") {
    const previous = state.past.at(-1);
    return previous
      ? {
          past: state.past.slice(0, -1),
          present: previous,
          future: [state.present, ...state.future],
          group: null,
        }
      : state;
  }
  if (action.type === "redo") {
    const next = state.future[0];
    return next
      ? {
          past: [...state.past, state.present].slice(-HISTORY_LIMIT),
          present: next,
          future: state.future.slice(1),
          group: null,
        }
      : state;
  }
  // All editor changes are immutable; snapshots retain their shared data safely.
  // Ignore clamped movements and unchanged fields without destroying redo.
  if (JSON.stringify(action.plan) === JSON.stringify(state.present))
    return state;
  if (action.type === "replace")
    return { ...state, present: action.plan, future: [], group: null };
  const continuing = action.group !== null && action.group === state.group;
  // Returning a drag or native text edit to its starting value leaves no step.
  if (
    continuing &&
    JSON.stringify(action.plan) === JSON.stringify(state.past.at(-1))
  ) {
    return {
      past: state.past.slice(0, -1),
      present: action.plan,
      future: [],
      group: null,
    };
  }
  return {
    past: continuing
      ? state.past
      : [...state.past, state.present].slice(-HISTORY_LIMIT),
    present: action.plan,
    future: [],
    group: action.group,
  };
}

type Shortcut = Pick<
  KeyboardEvent,
  | "key"
  | "ctrlKey"
  | "metaKey"
  | "shiftKey"
  | "altKey"
  | "isComposing"
  | "defaultPrevented"
>;
export function historyShortcut(
  event: Shortcut,
  editingField: boolean,
): "undo" | "redo" | null {
  if (
    editingField ||
    event.defaultPrevented ||
    event.isComposing ||
    event.altKey ||
    !(event.ctrlKey || event.metaKey)
  )
    return null;
  const key = event.key.toLowerCase();
  if (key === "z") return event.shiftKey ? "redo" : "undo";
  if (key === "y" && event.ctrlKey && !event.metaKey && !event.shiftKey)
    return "redo";
  return null;
}
