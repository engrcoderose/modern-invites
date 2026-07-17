import assert from "node:assert/strict";
import test from "node:test";

import {
  isCrossSiteRequest,
  isRsvpDeadlinePassed,
  isValidOptionalEmail,
  MemoryRateLimiter,
} from "../lib/rsvp/security.ts";

test("the RSVP deadline remains open through the deadline time", () => {
  const deadline = "2026-08-01T10:00:00.000Z";

  assert.equal(
    isRsvpDeadlinePassed(deadline, Date.parse("2026-08-01T09:59:59.000Z")),
    false,
  );
  assert.equal(
    isRsvpDeadlinePassed(deadline, Date.parse("2026-08-01T10:00:01.000Z")),
    true,
  );
  assert.equal(isRsvpDeadlinePassed(null), false);
});

test("same-site and server requests are allowed while cross-site requests are blocked", () => {
  assert.equal(
    isCrossSiteRequest({
      origin: "https://invite.example.com",
      host: "invite.example.com",
      forwardedHost: null,
      fetchSite: "same-origin",
    }),
    false,
  );
  assert.equal(
    isCrossSiteRequest({
      origin: "https://attacker.example",
      host: "invite.example.com",
      forwardedHost: null,
      fetchSite: "cross-site",
    }),
    true,
  );
  assert.equal(
    isCrossSiteRequest({
      origin: null,
      host: "invite.example.com",
      forwardedHost: null,
      fetchSite: null,
    }),
    false,
  );
});

test("the rate limiter rejects excess attempts and resets after its window", () => {
  const limiter = new MemoryRateLimiter();
  const rule = { limit: 2, windowMs: 60_000 };

  assert.equal(limiter.check("access:guest", rule, 1_000).allowed, true);
  assert.equal(limiter.check("access:guest", rule, 2_000).allowed, true);

  const blocked = limiter.check("access:guest", rule, 3_000);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 58);

  assert.equal(limiter.check("access:guest", rule, 61_000).allowed, true);
});

test("optional email validation accepts normal addresses and rejects malformed ones", () => {
  assert.equal(isValidOptionalEmail(""), true);
  assert.equal(isValidOptionalEmail("guest@example.com"), true);
  assert.equal(isValidOptionalEmail("guest@"), false);
  assert.equal(isValidOptionalEmail("guest example.com"), false);
});
