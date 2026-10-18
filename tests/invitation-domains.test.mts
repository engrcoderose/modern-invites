import assert from "node:assert/strict";
import test from "node:test";
import {
  getRedirectUrl,
  getRewrittenUrl,
  unstable_getResponseFromNextConfig,
} from "next/experimental/testing/server.js";
import nextConfig from "../next.config.ts";

test("the old main-site invitation URLs permanently redirect to the final subdomain", async () => {
  for (const host of ["moderninvites.com", "www.moderninvites.com"]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://${host}/anjo-and-jasmin?ref=invitation`,
      nextConfig,
    });
    assert.equal(response.status, 308);
    assert.equal(getRedirectUrl(response), "https://anjoandjasminwedding.moderninvites.com/?ref=invitation");
    assert.equal(getRewrittenUrl(response), null);
  }
});

test("old URLs with a trailing slash reach the final domain after Next.js normalizes the path", async () => {
  for (const host of ["moderninvites.com", "www.moderninvites.com"]) {
    const normalized = await unstable_getResponseFromNextConfig({
      url: `https://${host}/anjo-and-jasmin/?ref=invitation`,
      nextConfig,
    });
    assert.equal(normalized.status, 308);
    assert.equal(getRedirectUrl(normalized), `https://${host}/anjo-and-jasmin?ref=invitation`);
    const redirected = await unstable_getResponseFromNextConfig({ url: getRedirectUrl(normalized)!, nextConfig });
    assert.equal(getRedirectUrl(redirected), "https://anjoandjasminwedding.moderninvites.com/?ref=invitation");
  }
});

test("Anjo and Jasmin's subdomain serves the invitation without redirecting", async () => {
  const response = await unstable_getResponseFromNextConfig({
    url: "https://anjoandjasminwedding.moderninvites.com/?ref=invitation",
    nextConfig,
  });
  assert.equal(getRewrittenUrl(response), "https://anjoandjasminwedding.moderninvites.com/anjo-and-jasmin?ref=invitation");
  assert.equal(getRedirectUrl(response), null);
});

test("existing invitation and seat-finder domains retain their destinations", async () => {
  for (const [host, destination] of [
    ["leslieandserjwedding.moderninvites.com", "/leslie-and-serj"],
    ["seatfinder.anjoandjasminwedding.moderninvites.com", "/seat-finder/anjo-and-jasmin"],
  ]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://${host}/`, nextConfig });
    assert.equal(getRewrittenUrl(response), `https://${host}${destination}`);
  }
});

test("the main site and nonmatching hosts keep their root routes", async () => {
  for (const host of [
    "moderninvites.com",
    "www.moderninvites.com",
    "otheranjoandjasminwedding.moderninvites.com",
    "anjoandjasminweddingXmoderninvitesXcom",
    "anjoandjasminwedding.moderninvites.com.example.org",
  ]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://${host}/`, nextConfig });
    assert.equal(getRewrittenUrl(response), null);
  }
});

test("the subdomain's APIs, assets and existing invitation path are not rewritten", async () => {
  for (const pathname of ["/api/rsvp/access", "/_next/image", "/icon.png", "/anjo-and-jasmin"]) {
    const response = await unstable_getResponseFromNextConfig({
      url: `https://anjoandjasminwedding.moderninvites.com${pathname}`,
      nextConfig,
    });
    assert.equal(getRewrittenUrl(response), null);
    assert.equal(getRedirectUrl(response), null);
  }
});
