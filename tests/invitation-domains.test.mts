import assert from "node:assert/strict";
import test from "node:test";
import {
  getRedirectUrl,
  getRewrittenUrl,
  unstable_getResponseFromNextConfig,
} from "next/experimental/testing/server.js";
import nextConfig from "../next.config.ts";
import { getInvitationUrl } from "../lib/invitation-url.ts";
import { isCrossSiteRequest } from "../lib/rsvp/security.ts";

test("Jaydee and Bea's public domain serves the invitation and preserves guest links", async () => {
  const origin = "https://jaydeeandbeawedding.moderninvites.com";
  assert.equal(getInvitationUrl("jaydee-and-bea"), `${origin}/`);
  const response = await unstable_getResponseFromNextConfig({ url: `${origin}/?ref=invitation`, nextConfig });
  assert.equal(getRewrittenUrl(response), `${origin}/jaydee-and-bea?ref=invitation`);
  assert.equal(getRedirectUrl(response), null);
});

test("Jaydee and Bea's APIs, share image and music stay outside the root rewrite", async () => {
  const host = "jaydeeandbeawedding.moderninvites.com";
  for (const pathname of [
    "/api/rsvp/access", "/api/rsvp/search", "/api/rsvp/party", "/api/rsvp/submit",
    "/_next/image", "/_next/static/chunk.js", "/icon.png",
    "/jaydee-and-bea/sharing/envelope-8dfe0d26.jpg",
    "/jaydee-and-bea/music/could-i-love-you-any-more-2a7f2771.mp3",
  ]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://${host}${pathname}`, nextConfig });
    assert.equal(getRewrittenUrl(response), null);
    assert.equal(getRedirectUrl(response), null);
  }
  assert.equal(isCrossSiteRequest({ origin: `https://${host}`, host, forwardedHost: null, fetchSite: "same-origin" }), false);
  assert.equal(isCrossSiteRequest({ origin: "https://other.example", host, forwardedHost: null, fetchSite: "cross-site" }), true);
});

test("Aljay and Erlyn's requested public domain serves the invitation and preserves guest links", async () => {
  const origin = "https://aljayanderlynwedding.moderninvites.com";
  assert.equal(getInvitationUrl("aljay-and-erlyn"), `${origin}/`);
  const response = await unstable_getResponseFromNextConfig({ url: `${origin}/?ref=invitation`, nextConfig });
  assert.equal(getRewrittenUrl(response), `${origin}/aljay-and-erlyn?ref=invitation`);
  assert.equal(getRedirectUrl(response), null);
});

test("Aljay and Erlyn's previous subdomain redirects to the corrected Erlyn spelling", async () => {
  const response = await unstable_getResponseFromNextConfig({ url: "https://aljayandarlynwedding.moderninvites.com/?ref=invitation", nextConfig });
  assert.equal(response.status, 308);
  assert.equal(getRedirectUrl(response), "https://aljayanderlynwedding.moderninvites.com/?ref=invitation");
  assert.equal(getRewrittenUrl(response), null);
  for (const pathname of ["/api/rsvp/access", "/_next/image", "/aljay-and-erlyn/music/spring-snow.mp3"]) {
    const mediaResponse = await unstable_getResponseFromNextConfig({ url: `https://aljayandarlynwedding.moderninvites.com${pathname}`, nextConfig });
    assert.equal(getRedirectUrl(mediaResponse), null);
    assert.equal(getRewrittenUrl(mediaResponse), null);
  }
});

test("Aljay and Erlyn's old main-site links redirect without affecting local or subdomain routes", async () => {
  for (const host of ["moderninvites.com", "www.moderninvites.com"]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://${host}/aljay-and-erlyn?ref=invitation`, nextConfig });
    assert.equal(response.status, 308);
    assert.equal(getRedirectUrl(response), "https://aljayanderlynwedding.moderninvites.com/?ref=invitation");
  }
  for (const origin of ["https://aljayanderlynwedding.moderninvites.com"]) {
    const response = await unstable_getResponseFromNextConfig({ url: `${origin}/aljay-and-erlyn`, nextConfig });
    assert.equal(getRedirectUrl(response), null);
    assert.equal(getRewrittenUrl(response), null);
  }
});

test("Aljay and Erlyn's old route remains directly accessible on local preview hosts", async () => {
  for (const origin of ["http://localhost:3000", "http://localhost:3017", "http://127.0.0.1:3023", "http://[::1]:3000"]) {
    for (const suffix of ["", "?ref=preview"]) {
      const response = await unstable_getResponseFromNextConfig({ url: `${origin}/aljay-and-erlyn${suffix}`, nextConfig });
      assert.equal(getRedirectUrl(response), null);
      assert.equal(getRewrittenUrl(response), null);
    }
  }
});

test("Aljay and Erlyn's RSVP APIs, image optimizer and music stay outside the root rewrite", async () => {
  const origin = "https://aljayanderlynwedding.moderninvites.com";
  for (const pathname of ["/api/rsvp/access", "/api/rsvp/search", "/api/rsvp/party", "/api/rsvp/submit", "/_next/image", "/_next/static/chunk.js", "/aljay-and-erlyn/music/spring-snow.mp3"]) {
    const response = await unstable_getResponseFromNextConfig({ url: `${origin}${pathname}`, nextConfig });
    assert.equal(getRewrittenUrl(response), null);
    assert.equal(getRedirectUrl(response), null);
  }
});

test("Aljay and Erlyn's new host accepts same-origin RSVP requests and rejects foreign origins", () => {
  const host = "aljayanderlynwedding.moderninvites.com";
  assert.equal(isCrossSiteRequest({ origin: `https://${host}`, host, forwardedHost: null, fetchSite: "same-origin" }), false);
  assert.equal(isCrossSiteRequest({ origin: `https://${host}`, host: "internal.vercel.app", forwardedHost: host, fetchSite: "same-origin" }), false);
  assert.equal(isCrossSiteRequest({ origin: "https://other.example", host, forwardedHost: null, fetchSite: "cross-site" }), true);
});

test("Edcel and Apreal's public domain serves the invitation and preserves guest links", async () => {
  const origin = "https://edcelandaprealwedding.moderninvites.com";
  assert.equal(getInvitationUrl("edcel-and-apreal"), `${origin}/`);
  const response = await unstable_getResponseFromNextConfig({ url: `${origin}/?ref=invitation`, nextConfig });
  assert.equal(getRewrittenUrl(response), `${origin}/edcel-and-apreal?ref=invitation`);
  assert.equal(getRedirectUrl(response), null);
});

test("Edcel and Apreal's APIs and media stay outside the root rewrite", async () => {
  const origin = "https://edcelandaprealwedding.moderninvites.com";
  for (const pathname of [
    "/api/rsvp/access", "/_next/image", "/icon.png", "/edcel-and-apreal",
    "/edcel-and-apreal/music/iris-jada-facer-b2861c80.mp3",
    "/edcel-and-apreal/video/save-the-date-1080p-07f4f465.mp4",
  ]) {
    const response = await unstable_getResponseFromNextConfig({ url: `${origin}${pathname}`, nextConfig });
    assert.equal(getRewrittenUrl(response), null);
    assert.equal(getRedirectUrl(response), null);
  }
});

test("Ryan and Anne's final domain serves the invitation and preserves guest links", async () => {
  const origin = "https://ryanandannewedding.moderninvites.com";
  assert.equal(getInvitationUrl("ryan-and-anne"), `${origin}/`);
  const response = await unstable_getResponseFromNextConfig({ url: `${origin}/?ref=invitation`, nextConfig });
  assert.equal(getRewrittenUrl(response), `${origin}/ryan-and-anne?ref=invitation`);
  assert.equal(getRedirectUrl(response), null);
});

test("Ryan and Anne's old main-site links redirect permanently without affecting local previews", async () => {
  for (const host of ["moderninvites.com", "www.moderninvites.com"]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://${host}/ryan-and-anne?ref=invitation`, nextConfig });
    assert.equal(response.status, 308);
    assert.equal(getRedirectUrl(response), "https://ryanandannewedding.moderninvites.com/?ref=invitation");
  }
  const preview = await unstable_getResponseFromNextConfig({ url: "http://localhost:3000/ryan-and-anne", nextConfig });
  assert.equal(getRedirectUrl(preview), null);
});

test("Ryan and Anne's APIs, image optimizer and invitation path stay outside the root rewrite", async () => {
  for (const pathname of ["/api/rsvp/access", "/_next/image", "/icon.png", "/ryan-and-anne"]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://ryanandannewedding.moderninvites.com${pathname}`, nextConfig });
    assert.equal(getRewrittenUrl(response), null);
    assert.equal(getRedirectUrl(response), null);
  }
});

test("the dashboard's Mario and Inah link reaches the invitation through its root rewrite", async () => {
  const url = getInvitationUrl("mario-and-inah");
  const response = await unstable_getResponseFromNextConfig({ url, nextConfig });
  assert.equal(getRewrittenUrl(response), "https://marioandinahwedding.moderninvites.com/mario-and-inah");
  assert.equal(getRedirectUrl(response), null);
});

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
    ["marioandinahwedding.moderninvites.com", "/mario-and-inah"],
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
    "otherjaydeeandbeawedding.moderninvites.com",
    "jaydeeandbeaweddingXmoderninvitesXcom",
    "jaydeeandbeawedding.moderninvites.com.example.org",
    "otheraljayanderlynwedding.moderninvites.com",
    "otheraljayandarlynwedding.moderninvites.com",
    "aljayandarlynweddingXmoderninvitesXcom",
    "aljayandarlynwedding.moderninvites.com.example.org",
    "aljayanderlynweddingXmoderninvitesXcom",
    "aljayanderlynwedding.moderninvites.com.example.org",
    "otheredcelandaprealwedding.moderninvites.com",
    "edcelandaprealweddingXmoderninvitesXcom",
    "edcelandaprealwedding.moderninvites.com.example.org",
    "otheranjoandjasminwedding.moderninvites.com",
    "anjoandjasminweddingXmoderninvitesXcom",
    "anjoandjasminwedding.moderninvites.com.example.org",
    "othermarioandinahwedding.moderninvites.com",
    "marioandinahweddingXmoderninvitesXcom",
    "marioandinahwedding.moderninvites.com.example.org",
    "otherryanandannewedding.moderninvites.com",
    "ryanandanneweddingXmoderninvitesXcom",
    "ryanandannewedding.moderninvites.com.example.org",
  ]) {
    const response = await unstable_getResponseFromNextConfig({ url: `https://${host}/`, nextConfig });
    assert.equal(getRewrittenUrl(response), null);
  }
});

test("Mario and Inah's root preserves guest links and media stays outside the rewrite", async () => {
  const origin = "https://marioandinahwedding.moderninvites.com";
  const response = await unstable_getResponseFromNextConfig({ url: `${origin}/?ref=invitation`, nextConfig });
  assert.equal(getRewrittenUrl(response), `${origin}/mario-and-inah?ref=invitation`);
  assert.equal(getRedirectUrl(response), null);

  for (const pathname of ["/api/rsvp/access", "/_next/image", "/mario-and-inah/music/song.mp3", "/mario-and-inah/sharing/proposal-02d29584.jpg"]) {
    const mediaResponse = await unstable_getResponseFromNextConfig({ url: `${origin}${pathname}`, nextConfig });
    assert.equal(getRewrittenUrl(mediaResponse), null);
    assert.equal(getRedirectUrl(mediaResponse), null);
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
