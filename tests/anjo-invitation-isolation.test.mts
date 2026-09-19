import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const invitationRoot = path.join(projectRoot, "app/anjo-and-jasmin");

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(filename) : /\.[jt]sx?$/.test(filename) ? [filename] : [];
  });
}

test("Anjo and Jasmin's local imports resolve inside its own invitation", () => {
  for (const filename of sourceFiles(invitationRoot)) {
    const source = ts.createSourceFile(filename, readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
    function check(node: ts.Node) {
      let specifier: ts.Expression | undefined;
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) specifier = node.moduleSpecifier;
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) specifier = node.arguments[0];
      if (specifier && ts.isStringLiteral(specifier)) {
        const value = specifier.text;
        assert.ok(!value.startsWith("@/app/"), `${filename} imports another invitation: ${value}`);
        if (value.startsWith(".")) {
          const resolved = path.resolve(path.dirname(filename), value);
          const relative = path.relative(invitationRoot, resolved);
          assert.ok(!relative.startsWith("..") && !path.isAbsolute(relative), `${filename} escapes its invitation: ${value}`);
          const extensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js", "/index.jsx"];
          assert.ok(extensions.some(extension => existsSync(resolved + extension)), `${filename} has a missing import: ${value}`);
        }
      }
      ts.forEachChild(node, check);
    }
    check(source);
  }
});

test("Anjo and Jasmin's public media uses its own existing copies", () => {
  for (const filename of sourceFiles(invitationRoot)) {
    const content = readFileSync(filename, "utf8");
    for (const match of content.matchAll(/(?<=["'`(])\/(?:images|videos|music)\/[^\s"'`)]+/g)) {
      const url = match[0];
      assert.match(url, /^\/(?:images|videos|music)\/anjo-and-jasmin\//, `${filename} shares public media: ${url}`);
      assert.ok(existsSync(path.join(projectRoot, "public", decodeURIComponent(url))), `${filename} has missing public media: ${url}`);
    }
  }
});
