export class JsonRequestError extends Error {
  readonly status: 400 | 413;
  constructor(status: JsonRequestError["status"]) {
    super(status === 413 ? "The request is too large." : "The request must contain valid JSON.");
    this.status = status;
  }
}

/** Bound streamed bodies even when Content-Length is absent or misleading. */
export async function readLimitedJson(request: Pick<Request, "body">, maximumBytes: number): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new JsonRequestError(400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maximumBytes) {
        await reader.cancel();
        throw new JsonRequestError(413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body)); }
  catch { throw new JsonRequestError(400); }
}
