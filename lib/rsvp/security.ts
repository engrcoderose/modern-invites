export interface RateLimitRule {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class MemoryRateLimiter {
  private readonly entries = new Map<string, RateLimitEntry>();

  check(
    key: string,
    rule: RateLimitRule,
    now = Date.now(),
  ): RateLimitResult {
    const current = this.entries.get(key);

    if (!current || current.resetAt <= now) {
      this.entries.set(key, {
        count: 1,
        resetAt: now + rule.windowMs,
      });

      return {
        allowed: true,
        remaining: Math.max(0, rule.limit - 1),
        retryAfterSeconds: 0,
      };
    }

    if (current.count >= rule.limit) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((current.resetAt - now) / 1000),
        ),
      };
    }

    current.count += 1;

    return {
      allowed: true,
      remaining: Math.max(0, rule.limit - current.count),
      retryAfterSeconds: 0,
    };
  }

  clear() {
    this.entries.clear();
  }
}

export function isRsvpDeadlinePassed(
  deadline: string | null | undefined,
  now = Date.now(),
) {
  if (!deadline) {
    return false;
  }

  const deadlineTime = Date.parse(deadline);

  return Number.isFinite(deadlineTime) && deadlineTime < now;
}

export function isValidOptionalEmail(email: string) {
  if (!email) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface RequestOriginInformation {
  origin: string | null;
  host: string | null;
  forwardedHost: string | null;
  fetchSite: string | null;
}

export function isCrossSiteRequest({
  origin,
  host,
  forwardedHost,
  fetchSite,
}: RequestOriginInformation) {
  if (fetchSite === "cross-site") {
    return true;
  }

  if (!origin) {
    return false;
  }

  const expectedHost = forwardedHost?.split(",")[0]?.trim() || host;

  if (!expectedHost) {
    return false;
  }

  try {
    return new URL(origin).host !== expectedHost;
  } catch {
    return true;
  }
}
