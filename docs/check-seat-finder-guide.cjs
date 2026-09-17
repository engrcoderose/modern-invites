// Run from the repository root: node docs/check-seat-finder-guide.cjs
// Reads code fences as virtual source files. It does not install the feature.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const Module = require("node:module");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const markdown = fs.readFileSync(path.join(__dirname, "seat-finder-admin-guide.md"), "utf8");
const normalize = file => path.resolve(file).replaceAll("\\", "/").toLowerCase();
const sources = new Map();
const directories = new Set();
for (const match of markdown.matchAll(/### File: `([^`]+)`\s+```(?:ts|tsx)\r?\n([\s\S]*?)\r?\n```/g)) {
  const file = path.resolve(root, match[1]);
  sources.set(normalize(file), { file, source: match[2] });
  let directory = path.dirname(file);
  while (directory !== path.dirname(directory)) {
    directories.add(normalize(directory));
    directory = path.dirname(directory);
  }
}
assert.equal(sources.size, 5, "Expected all five complete TypeScript files");

const configPath = path.join(root, "tsconfig.json");
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, "\n"));
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const options = { ...parsed.options, incremental: false, noEmit: true };
const host = ts.createCompilerHost(options);
const originalRead = host.readFile.bind(host);
const originalExists = host.fileExists.bind(host);
const originalDirectoryExists = host.directoryExists.bind(host);
host.readFile = file => sources.get(normalize(file))?.source ?? originalRead(file);
host.fileExists = file => sources.has(normalize(file)) || originalExists(file);
host.directoryExists = directory => directories.has(normalize(directory)) || originalDirectoryExists(directory);
host.getSourceFile = (file, languageVersion) => {
  const source = host.readFile(file);
  return source === undefined ? undefined : ts.createSourceFile(file, source, languageVersion, true);
};
const program = ts.createProgram([...parsed.fileNames, ...[...sources.values()].map(value => value.file)], options, host);
const diagnostics = [...parsed.errors, ...ts.getPreEmitDiagnostics(program)];
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: file => file,
    getCurrentDirectory: () => root,
    getNewLine: () => "\n",
  }));
  process.exitCode = 1;
} else {
  console.log("PASS: all five guide files type-check against the repository.");
}

// Execute the actual domain fence to check malformed data and bigint boundaries.
const domain = sources.get(normalize(path.join(root, "features/seating/domain/seating.ts")));
const compiled = ts.transpileModule(domain.source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
}).outputText;
const runtime = new Module(path.join(__dirname, "virtual-seating.cjs"), module);
runtime.filename = path.join(__dirname, "virtual-seating.cjs");
runtime.paths = Module._nodeModulePaths(__dirname);
runtime._compile(compiled, runtime.filename);
const { databaseId, planVersion, commandSchema } = runtime.exports;
for (const invalid of ["", "abc", "0", "-1", "1.5", " 1", "01", "9223372036854775808", "1".repeat(100), null, new Blob()]) {
  assert.equal(databaseId.safeParse(invalid).success, false, `Invalid ID: ${String(invalid)}`);
}
assert.equal(databaseId.safeParse("9007199254740993").success, true);
assert.equal(databaseId.safeParse("9223372036854775807").success, true);
assert.equal(planVersion.safeParse("0").success, true);
for (const invalid of ["abc", "-1", "", "01", "9223372036854775808"]) {
  assert.equal(planVersion.safeParse(invalid).success, false);
}
const tableId = "123e4567-e89b-42d3-a456-426614174000";
for (const invalid of ["0", "101", "1.5", "", "Infinity", "NaN"]) {
  assert.equal(commandSchema.safeParse({ operation: "assign", guestId: "1", tableId, seatNumber: invalid }).success, false);
}
assert.deepEqual(commandSchema.parse({ operation: "assign", guestId: "1", tableId, seatNumber: "2", isAdmin: true }), {
  operation: "assign", guestId: "1", tableId, seatNumber: 2,
});
assert.deepEqual(commandSchema.parse({ operation: "save_table", tableId: "", name: " Rose ", capacity: "8", location: " Entrance " }), {
  operation: "save_table", tableId: null, name: "Rose", capacity: 8, location: "Entrance",
});
assert.equal(commandSchema.safeParse({ operation: "save_table", tableId: "", name: " ", capacity: "8", location: "" }).success, false);
assert.equal(commandSchema.safeParse({ operation: "delete_event", tableId }).success, false);
console.log("PASS: input boundaries, bigint precision, and command field filtering.");
