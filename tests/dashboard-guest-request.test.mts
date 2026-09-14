import assert from "node:assert/strict";
import test from "node:test";
import { createFetchWithTimeout } from "../lib/supabase/fetch-with-timeout.ts";
import { submitDashboardGuest } from "../features/dashboard/presentation/submit-dashboard-guest.ts";

function guestForm() {
  const form = new FormData();
  form.set("fullName", "Sample Guest");
  form.set("householdName", "Sample Guest");
  form.set("maximumGuests", "1");
  form.set("guestType", "adult");
  return form;
}

test("a guest save returns success independently of dashboard rendering", async () => {
  let requests = 0;
  const fetcher: typeof fetch = async (url, init) => {
    requests++;
    assert.equal(url, "/api/dashboard/events/4/guests");
    assert.equal(init?.method, "POST");
    assert.equal(init?.credentials, "same-origin");
    assert.equal(JSON.parse(String(init?.body)).fullName, "Sample Guest");
    return Response.json({ status: "success" }, { status: 201 });
  };
  assert.equal((await submitDashboardGuest(4, guestForm(), fetcher)).status, "success");
  assert.equal(requests, 1);
});

test("a stalled save is aborted once and requires checking the list before retry", async () => {
  let requests = 0;
  let aborted = false;
  const fetcher: typeof fetch = async (_url, init) => {
    requests++;
    return new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => { aborted = true; reject(init.signal?.reason); }, { once: true });
    });
  };
  const form = guestForm();
  const result = await submitDashboardGuest(4, form, fetcher, 20);
  assert.equal(aborted, true);
  assert.equal(requests, 1);
  assert.equal(result.status, "error");
  assert.equal(result.needsRefresh, true);
  assert.equal(form.get("fullName"), "Sample Guest");
});

test("the deadline also covers a stalled response body", async () => {
  const fetcher: typeof fetch = async (_url, init) => new Response(new ReadableStream({
    start(controller) {
      init?.signal?.addEventListener("abort", () => controller.error(init.signal?.reason), { once: true });
    },
  }), { headers: { "Content-Type": "application/json" } });
  const result = await submitDashboardGuest(4, guestForm(), fetcher, 20);
  assert.equal(result.needsRefresh, true);
});

test("validation failures remain actionable, uncertain writes require refresh", async () => {
  const invalid: typeof fetch = async () => Response.json({ status: "error", message: "Enter the guest's name." }, { status: 400 });
  const result = await submitDashboardGuest(4, guestForm(), invalid);
  assert.equal(result.message, "Enter the guest's name.");
  assert.equal(result.needsRefresh, false);
  const uncertain: typeof fetch = async () => Response.json({ status: "error", message: "Check the list.", needsRefresh: true }, { status: 400 });
  assert.equal((await submitDashboardGuest(4, guestForm(), uncertain)).needsRefresh, true);
});

test("HTML or malformed responses cannot leave the form pending or claim success", async () => {
  for (const response of [new Response("Sign in"), new Response("broken", { headers: { "Content-Type": "application/json" } }), Response.json({ status: "error" }, { status: 500 })]) {
    const result = await submitDashboardGuest(4, guestForm(), async () => response);
    assert.equal(result.status, "error");
    assert.equal(result.needsRefresh, true);
  }
});

test("caller cancellation propagates through the database fetch wrapper", async () => {
  const caller = new AbortController();
  caller.abort();
  const fetcher: typeof fetch = async (_url, init) => {
    assert.equal(init?.signal?.aborted, true);
    throw init?.signal?.reason;
  };
  await assert.rejects(createFetchWithTimeout(100, fetcher)("https://example.test", { signal: caller.signal }), { name: "AbortError" });
});
