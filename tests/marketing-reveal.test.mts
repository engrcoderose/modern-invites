import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { createElement, type ComponentType, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const sourceUrl = new URL("../components/landing/ScrollReveal.tsx", import.meta.url);
const compiled = ts.transpileModule(readFileSync(sourceUrl, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const componentExports: { default?: ComponentType<{ children: ReactNode; direction: string; className: string }> } = {};
const hookUrl = new URL("../components/landing/useMarketingReducedMotion.ts", import.meta.url);
const hookCompiled = ts.transpileModule(readFileSync(hookUrl, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const hookExports = {};
runInNewContext(hookCompiled, { exports: hookExports, require: createRequire(hookUrl) });
const require = createRequire(sourceUrl);
runInNewContext(compiled, {
  exports: componentExports,
  require: (specifier: string) => specifier === "./useMarketingReducedMotion" ? hookExports : require(specifier),
});
assert.ok(componentExports.default);
const ScrollReveal = componentExports.default;

for (const direction of ["up", "left", "right", "scale"]) {
  test(`server-rendered ${direction} reveal keeps content readable without hydration`, () => {
    const markup = renderToStaticMarkup(createElement(ScrollReveal, {
      direction,
      className: "h-full",
      children: createElement("a", { href: "/pricing" }, "Compare invitation packages"),
    }));
    assert.match(markup, /class="h-full"/);
    assert.match(markup, /href="\/pricing"/);
    assert.match(markup, /Compare invitation packages/);
    // No hidden, blurred or displaced server fallback for any reveal direction.
    assert.doesNotMatch(markup, /opacity:\s*0(?:[;".]|$)|filter:\s*blur\([1-9]|translate[XY]?\(|scale\(0\.|visibility:\s*hidden|display:\s*none/);
  });
}
