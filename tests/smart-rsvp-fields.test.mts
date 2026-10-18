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
let controller: Record<string, unknown> = { stage: "party", event, party, selectedMatch, rsvpCode: "" };

// Compile only the frontend dependency tree; never initialize API calls or private configuration.
function loadModule(filename: string): Record<string, unknown> {
  const cached = cache.get(filename);
  if (cached) return cached;
  const exports: Record<string, unknown> = {};
  cache.set(filename, exports);
  const compiled = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  runInNewContext(compiled, {
    exports,
    require: (specifier: string) => {
      if (specifier === "./api") return {};
      if (specifier === "./artwork") return { Ornament: () => null };
      if (specifier === "./useSmartRsvp") return { useSmartRsvp: () => controller };
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
const { SmartRsvpFlow } = loadModule(path.join(root, "components/smart-rsvp/SmartRsvpFlow.tsx")) as { SmartRsvpFlow: ComponentType<Record<string, unknown>> };
const { InitializationStep } = loadModule(path.join(root, "components/smart-rsvp/InitializationStep.tsx")) as { InitializationStep: ComponentType<Record<string, unknown>> };
const { RsvpApiError, isRsvpClosedError } = loadModule(path.join(root, "components/smart-rsvp/api.ts")) as {
  RsvpApiError: new (message: string, status: number, code?: string) => Error;
  isRsvpClosedError: (error: unknown) => boolean;
};
const { RsvpClosedNotice } = loadModule(path.join(root, "components/smart-rsvp/RsvpClosedNotice.tsx")) as { RsvpClosedNotice: ComponentType<Record<string, unknown>> };
const { NylgenRsvpFlow } = loadModule(path.join(root, "app/nylgen-and-kersee/components/RSVP/NylgenRsvpFlow.tsx")) as { NylgenRsvpFlow: ComponentType<Record<string, unknown>> };
const { default: LeslieRsvpFlow } = loadModule(path.join(root, "app/leslie-and-serj/rsvp-flow.tsx")) as { default: ComponentType };
const { default: VincentRsvpFlow } = loadModule(path.join(root, "app/vincent-and-gabrielle/components/rsvp-flow.tsx")) as { default: ComponentType };

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

test("only an explicit RSVP closure is treated as closed, not other forbidden or server errors", () => {
  assert.equal(isRsvpClosedError(new RsvpApiError("Closed", 403, "RSVP_CLOSED")), true);
  assert.equal(isRsvpClosedError(new RsvpApiError("This request is not allowed.", 403)), false);
  assert.equal(isRsvpClosedError(new RsvpApiError("Server error", 500)), false);
  assert.equal(isRsvpClosedError(new Error("Connection failed")), false);
});

test("closed RSVPs replace both initialization and code entry with a clear contact message", () => {
  const original = controller;
  try {
    for (const stage of ["initializing", "access"]) {
      controller = { stage, rsvpClosed: true, accessError: "RSVPs for this event are currently closed." };
      const markup = renderToStaticMarkup(createElement(SmartRsvpFlow, {
        eventSlug: event.slug,
        closedMessage: "Sorry, this RSVP is already closed. Kindly contact the couple directly.",
      }));
      assert.match(markup, /RSVP Closed/);
      assert.match(markup, /Kindly contact the couple directly/);
      assert.match(markup, /role="status"/);
      assert.doesNotMatch(markup, /Try Again|Unable to Open RSVP|Enter Your RSVP Code/);
    }
  } finally {
    controller = original;
  }
});

test("other events get a host-neutral closed message and temporary errors retain retry", () => {
  const closed = renderToStaticMarkup(createElement(InitializationStep, { closed: true, errorMessage: "", onRetry: async () => {} }));
  assert.match(closed, /RSVP Closed/);
  assert.match(closed, /contact the event host directly/);
  const error = renderToStaticMarkup(createElement(InitializationStep, { errorMessage: "Connection failed", onRetry: async () => {} }));
  assert.match(error, /Unable to Open RSVP/);
  assert.match(error, /Connection failed/);
  assert.match(error, /Try Again/);
  const loading = renderToStaticMarkup(createElement(InitializationStep, { errorMessage: "", onRetry: async () => {} }));
  assert.match(loading, /Preparing Your RSVP/);
  assert.doesNotMatch(loading, /RSVP Closed|Try Again/);
});

test("minimal closed notices use the invitation typography without introducing a white card", () => {
  const markup = renderToStaticMarkup(createElement(RsvpClosedNotice, {
    appearance: "minimal", titleClassName: "client-calligraphy", message: "Please contact the couple directly.",
  }));
  assert.match(markup, /client-calligraphy/);
  assert.match(markup, /<h3><span class="[^"]*font-libreBaskerville[^"]*not-italic[^"]*">RSVP<\/span> Closed<\/h3>/);
  assert.match(markup, /role="status"/);
  assert.doesNotMatch(markup, /bg-white|shadow-xl|Try Again|<input/);
});

test("custom wedding flows replace the search form with their own themed closed notice", () => {
  const original = controller;
  const { wedding: vgWedding } = loadModule(path.join(root, "app/vincent-and-gabrielle/data/wedding.ts")) as { wedding: { rsvpEnabled: boolean } };
  const wasEnabled = vgWedding.rsvpEnabled;
  try {
    // Enable only this in-memory fixture; do not change the draft's saved config.
    vgWedding.rsvpEnabled = true;
    controller = { stage: "initializing", rsvpClosed: true, accessError: "Closed", searchMatches: [] };
    for (const [Component, props, heading] of [
      [LeslieRsvpFlow, {}, /lj-heading/],
      [VincentRsvpFlow, {}, /vg-heading/],
      [NylgenRsvpFlow, { eventSlug: "preview", confirmationMessage: "Thank you" }, /font-wedding-display/],
    ] as const) {
      const markup = renderToStaticMarkup(createElement(Component, props));
      assert.match(markup, /RSVP Closed/);
      assert.match(markup, /contact the couple directly/);
      assert.match(markup, heading);
      assert.doesNotMatch(markup, /Try [Aa]gain|<form|<input/);
    }
  } finally {
    vgWedding.rsvpEnabled = wasEnabled;
    controller = original;
  }
});
