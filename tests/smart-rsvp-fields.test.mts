import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const cache = new Map<string, Record<string, unknown>>();
const event = { name: "Sample Wedding", slug: "sample-wedding", accessMode: "name_search", responseMode: "household", rsvpDeadline: null };
const party = {
  householdName: "Sample household", maxAttendees: 1, responseMode: "household", responseLocked: false, respondedAt: null,
  guests: [{ id: 1, fullName: "Sample Guest", guestType: "adult", attendanceStatus: "attending", dietaryRestrictions: null, hasResponded: false, respondedAt: null }],
};
const selectedMatch = { invitationId: 1, householdName: party.householdName, matchedGuestName: "Sample Guest" };
const fields = { email: false, dietaryRestrictions: false, message: false };

// Compile only the frontend dependency tree; never initialize API calls or private configuration.
function loadModule(filename: string): Record<string, unknown> {
  const cached = cache.get(filename);
  if (cached) return cached;
  const exports: Record<string, unknown> = {};
  cache.set(filename, exports);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  runInNewContext(compiled, {
    exports,
    require: (specifier: string) => {
      if (specifier === "./api") return {};
      if (specifier === "./useSmartRsvp") return { useSmartRsvp: () => ({ stage: "party", event, party, selectedMatch, rsvpCode: "" }) };
      if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return require(specifier);
      const resolved = specifier.startsWith("@/") ? path.join(root, specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
      const target = [resolved + ".ts", resolved + ".tsx", path.join(resolved, "index.ts")].find(candidate => ts.sys.fileExists(candidate));
      assert.ok(target, `Missing frontend module: ${specifier}`);
      return loadModule(target);
    },
  });
  return exports;
}

const { PartyStep } = loadModule(path.join(root, "components/smart-rsvp/PartyStep.tsx")) as { PartyStep: ComponentType<Record<string, unknown>> };
const { OpenRsvpForm } = loadModule(path.join(root, "components/smart-rsvp/OpenRsvpForm.tsx")) as { OpenRsvpForm: ComponentType<Record<string, unknown>> };
const { default: AnjoRsvpFlow } = loadModule(path.join(root, "app/anjo-and-jasmin/components/RsvpFlow.tsx")) as { default: ComponentType };

test("Anjo and Jasmin show attendance and phone without email, dietary or message inputs", () => {
  const markup = renderToStaticMarkup(createElement(AnjoRsvpFlow));
  assert.match(markup, /Sample Guest is attending/);
  assert.match(markup, /Sample Guest is declining/);
  assert.match(markup, /id="rsvp-phone"/);
  assert.match(markup, /Confirm Responses/);
  assert.doesNotMatch(markup, /id="rsvp-email"|id="rsvp-message"|Dietary restrictions/);
});

test("other household forms retain all optional fields by default", () => {
  const markup = renderToStaticMarkup(createElement(PartyStep, { event, eventSlug: event.slug, party, selectedMatch, rsvpCode: "", onBack() {}, onReset() {} }));
  assert.match(markup, /id="rsvp-phone"/);
  assert.match(markup, /id="rsvp-email"/);
  assert.match(markup, /id="rsvp-message"/);
  assert.match(markup, /Dietary restrictions or allergies/);
});

test("open RSVP respects field options and retains name, attendance and phone", () => {
  const markup = renderToStaticMarkup(createElement(OpenRsvpForm, { event, fields }));
  assert.match(markup, /name="fullName"/);
  assert.match(markup, /name="attendance"/);
  assert.match(markup, /name="phone"/);
  assert.doesNotMatch(markup, /name="email"|name="message"|name="dietaryRestrictions"/);
  const defaultMarkup = renderToStaticMarkup(createElement(OpenRsvpForm, { event }));
  assert.match(defaultMarkup, /name="email"/);
  assert.match(defaultMarkup, /name="message"/);
});
