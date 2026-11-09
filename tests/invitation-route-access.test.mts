import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { NextRequest, NextResponse } from "next/server.js";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server.js";
import ts from "typescript";

type MiddlewareUnderTest = {
  middleware: (request: NextRequest) => Promise<Response>;
  config: { matcher: string[] };
};

function loadMiddleware(environment: "development" | "production"): MiddlewareUnderTest {
  // Execute the actual middleware with a synthetic environment. The auth module
  // is replaced before import so these routing checks cannot access Supabase.
  const source = readFileSync(new URL("../middleware.ts", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  runInNewContext(outputText, {
    module,
    exports: module.exports,
    process: { env: { NODE_ENV: environment } },
    require(specifier: string) {
      if (specifier === "next/server") return { NextResponse };
      if (specifier === "@/lib/supabase/middleware") {
        return { updateSupabaseSession() { throw new Error("Routing unexpectedly entered auth middleware"); } };
      }
      throw new Error(`Unexpected middleware import: ${specifier}`);
    },
  });
  return module.exports as MiddlewareUnderTest;
}

for (const [name, slug, domain] of [
  ["Edcel", "edcel-and-apreal", "edcelandaprealwedding.moderninvites.com"],
  ["Jaydee", "jaydee-and-bea", "jaydeeandbeawedding.moderninvites.com"],
  ["Marian", "marian-and-deejay", "mariananddeejaywedding.moderninvites.com"],
  ["Marian calendar", "marian-and-deejay/calendar", "mariananddeejaywedding.moderninvites.com"],
  ["Marian legacy", "marian-and-dee-jay", "mariananddeejaywedding.moderninvites.com"],
  ["Marian legacy calendar", "marian-and-dee-jay/calendar", "mariananddeejaywedding.moderninvites.com"],
]) {
  test(`${name}'s retired page returns uncached 404 responses on every deployed host`, async () => {
    for (const environment of ["development", "production"] as const) {
      const { middleware } = loadMiddleware(environment);
      for (const host of [
        "moderninvites.com", "www.moderninvites.com",
        domain, "preview.vercel.app",
      ]) {
        for (const suffix of ["", "/", "?ref=invitation"]) {
          const response = await middleware(new NextRequest(`https://${host}/${slug}${suffix}`));
          assert.equal(response.status, 404);
          assert.equal(response.headers.get("cache-control"), "no-store");
          assert.equal(await response.text(), "Not found");
        }
      }
    }
  });

  test(`${name}'s old route remains available on loopback hosts in development and local production`, async () => {
    for (const environment of ["development", "production"] as const) {
      const { middleware } = loadMiddleware(environment);
      for (const host of ["localhost:3000", "127.0.0.1:3000", "[::1]:3000"]) {
        const response = await middleware(new NextRequest(`http://${host}/${slug}?ref=preview`));
        assert.equal(response.headers.get("x-middleware-next"), "1");
      }
    }
  });

  test(`${name}'s internal loopback server URL does not allow the old page on an external Host`, async () => {
    for (const environment of ["development", "production"] as const) {
      const { middleware } = loadMiddleware(environment);
      const request = new NextRequest(`http://127.0.0.1:3000/${slug}`, {
        headers: { host: "moderninvites.com", "x-forwarded-host": "localhost:3000" },
      });
      assert.equal((await middleware(request)).status, 404);
    }
  });
}

test("the retired-page matcher excludes public roots, RSVP APIs and invitation media", () => {
  const { config } = loadMiddleware("production");
  const origin = "https://edcelandaprealwedding.moderninvites.com";
  for (const pathname of ["/jaydee-and-bea", "/jaydee-and-bea/", "/edcel-and-apreal", "/edcel-and-apreal/", "/mario-and-inah", "/marian-and-deejay", "/marian-and-deejay/", "/marian-and-deejay/calendar", "/marian-and-dee-jay", "/marian-and-dee-jay/calendar", "/admin/events"]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url: `${origin}${pathname}` }), true);
  }
  for (const pathname of [
    "/", "/?ref=invitation", "/api/rsvp/access", "/_next/image", "/_next/static/chunk.js",
    "/edcel-and-apreal/music/iris-jada-facer-b2861c80.mp3",
    "/edcel-and-apreal/video/save-the-date-1080p-07f4f465.mp4",
    "/jaydee-and-bea/sharing/envelope-8dfe0d26.jpg",
    "/jaydee-and-bea/music/could-i-love-you-any-more-2a7f2771.mp3",
    "/calendar", "/marian-and-deejay/videos/prenup-film-web-v1.mp4",
  ]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url: `${origin}${pathname}` }), false);
  }
});

test("Aljay's local invitation route bypasses auth and retired-page middleware in development and production", () => {
  for (const environment of ["development", "production"] as const) {
    const { config } = loadMiddleware(environment);
    for (const origin of ["http://localhost:3000", "http://localhost:3017", "http://127.0.0.1:3023", "http://[::1]:3000"]) {
      for (const suffix of ["", "/", "?ref=preview"]) {
        assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url: `${origin}/aljay-and-erlyn${suffix}` }), false);
      }
    }
  }
});

test("Mario and Inah retain their existing development-only localhost exception", async () => {
  const local = new NextRequest("http://localhost:3000/mario-and-inah");
  assert.equal((await loadMiddleware("development").middleware(local)).headers.get("x-middleware-next"), "1");
  assert.equal((await loadMiddleware("production").middleware(local)).status, 404);
  assert.equal((await loadMiddleware("development").middleware(new NextRequest("https://moderninvites.com/mario-and-inah"))).status, 404);
});
