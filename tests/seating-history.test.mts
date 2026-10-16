import assert from "node:assert/strict";
import test from "node:test";
import { createPlanHistory, planHistoryReducer, historyShortcut, HISTORY_LIMIT } from "../features/seating/domain/plan-history.ts";
import { emptySeatingPlan, type SeatingPlan } from "../features/seating/domain/seating-plan.ts";

const tableId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const original: SeatingPlan = { ...emptySeatingPlan(), tables: [{ id: tableId, name: "Family", shape: "round", capacity: 8, x: 30, y: 40, rotation: 0, color: "#88a999" }], assignments: [{ guestId: 1, tableId, seatNumber: 3 }] };
const edit = (plan: SeatingPlan, group: number | null = null) => ({ type: "edit" as const, plan, group });

test("undo and redo restore complete table, seat and canvas snapshots", () => {
  const initial = createPlanHistory(original);
  const resized = { ...original, canvas: { width: 2000, height: 1400 }, tables: original.tables.map(table => ({ ...table, x: 15, y: 20, width: 120, height: 120, rotation: 45 })) };
  const first = planHistoryReducer(initial, edit(resized));
  const deleted = { ...resized, tables: [], assignments: [] };
  const second = planHistoryReducer(first, edit(deleted));
  const undoDelete = planHistoryReducer(second, { type: "undo" });
  assert.deepEqual(undoDelete.present, resized);
  assert.deepEqual(undoDelete.present.assignments, original.assignments);
  const undoResize = planHistoryReducer(undoDelete, { type: "undo" });
  assert.deepEqual(undoResize.present, original);
  assert.deepEqual(planHistoryReducer(planHistoryReducer(undoResize, { type: "redo" }), { type: "redo" }).present, deleted);
  assert.equal(initial.present, original);
});

test("many updates in one gesture undo together; separate gestures stay separate", () => {
  let history = createPlanHistory(original);
  for (let x = 31; x <= 80; x++) history = planHistoryReducer(history, edit({ ...original, tables: [{ ...original.tables[0], x }] }, 1));
  assert.equal(history.past.length, 1);
  const second = planHistoryReducer(history, edit({ ...history.present, tables: [{ ...history.present.tables[0], rotation: 90 }] }, 2));
  const undo = planHistoryReducer(second, { type: "undo" });
  assert.equal(undo.present.tables[0].x, 80);
  assert.equal(undo.present.tables[0].rotation, 0);
  assert.deepEqual(planHistoryReducer(undo, { type: "undo" }).present, original);
});

test("redo branches clear on an actual new edit, but survive no-op edits and saves", () => {
  const changed = { ...original, assignments: [] };
  const history = planHistoryReducer(planHistoryReducer(createPlanHistory(original), edit(changed)), { type: "undo" });
  assert.equal(history.future.length, 1);
  assert.equal(planHistoryReducer(history, edit(structuredClone(original))), history);
  assert.equal(planHistoryReducer(history, { type: "replace", plan: structuredClone(original) }), history);
  const branched = planHistoryReducer(history, edit({ ...original, tables: [{ ...original.tables[0], name: "Friends" }] }));
  assert.equal(branched.future.length, 0);
  assert.equal(planHistoryReducer(branched, { type: "redo" }), branched);
});

test("a gesture or native text edit returned to its start does not leave an empty undo step", () => {
  const initial = createPlanHistory(original);
  const edited = planHistoryReducer(initial, edit({ ...original, tables: [{ ...original.tables[0], name: "Changed" }] }, 1));
  const reverted = planHistoryReducer(edited, edit(structuredClone(original), 1));
  assert.equal(reverted.past.length, 0);
  assert.deepEqual(reverted.present, original);
  const resumed = planHistoryReducer(reverted, edit({ ...original, assignments: [] }, 1));
  assert.deepEqual(planHistoryReducer(resumed, { type: "undo" }).present, original);
});

test("server normalization does not add an undo step; history stays bounded", () => {
  let history = createPlanHistory(original);
  for (let index = 0; index < HISTORY_LIMIT + 20; index++) history = planHistoryReducer(history, edit({ ...original, tables: [{ ...original.tables[0], name: `Table ${index}` }] }));
  assert.equal(history.past.length, HISTORY_LIMIT);
  const normalized = planHistoryReducer(history, { type: "replace", plan: { ...history.present, tables: [{ ...history.present.tables[0], name: "Normalized" }] } });
  assert.equal(normalized.past.length, HISTORY_LIMIT);
  assert.equal(normalized.present.tables[0].name, "Normalized");
  for (let index = 0; index < HISTORY_LIMIT; index++) history = planHistoryReducer(history, { type: "undo" });
  assert.equal(history.past.length, 0);
  assert.equal(history.future.length, HISTORY_LIMIT);
  assert.equal(planHistoryReducer(history, { type: "undo" }), history);
});

test("Windows and Mac shortcuts leave text editing, composition and other modifiers alone", () => {
  const key = { key: "z", ctrlKey: true, metaKey: false, shiftKey: false, altKey: false, isComposing: false, defaultPrevented: false };
  assert.equal(historyShortcut(key, false), "undo");
  assert.equal(historyShortcut({ ...key, key: "Z", ctrlKey: false, metaKey: true }, false), "undo");
  assert.equal(historyShortcut({ ...key, shiftKey: true }, false), "redo");
  assert.equal(historyShortcut({ ...key, ctrlKey: false, metaKey: true, shiftKey: true }, false), "redo");
  assert.equal(historyShortcut({ ...key, key: "y" }, false), "redo");
  for (const change of [{ ctrlKey: false }, { altKey: true }, { isComposing: true }, { defaultPrevented: true }, { key: "x" }]) assert.equal(historyShortcut({ ...key, ...change }, false), null);
  assert.equal(historyShortcut(key, true), null);
  assert.equal(historyShortcut({ ...key, key: "y", ctrlKey: false, metaKey: true }, false), null);
});
