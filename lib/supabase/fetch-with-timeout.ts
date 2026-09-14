/** Bound both connection time and response-body reads; never retry a write. */
export function createFetchWithTimeout(timeoutMs = 15_000, fetcher: typeof fetch = fetch): typeof fetch {
  return async (input, init) => {
    const controller = new AbortController();
    const signals = [init?.signal, input instanceof Request ? input.signal : null].filter((signal): signal is AbortSignal => Boolean(signal));
    const abort = () => controller.abort(new DOMException("Request cancelled or timed out.", "AbortError"));
    signals.forEach(signal => signal.addEventListener("abort", abort, { once: true }));
    if (signals.some(signal => signal.aborted)) abort();
    const timer = setTimeout(abort, timeoutMs);

    try {
      const response = await fetcher(input, { ...init, signal: controller.signal });
      // Supabase and dashboard mutations return small JSON payloads. Keeping the
      // timer alive through body consumption also covers a stalled response body.
      const body = response.body ? await response.arrayBuffer() : null;
      return new Response(body, { status: response.status, statusText: response.statusText, headers: response.headers });
    } finally {
      clearTimeout(timer);
      signals.forEach(signal => signal.removeEventListener("abort", abort));
    }
  };
}
