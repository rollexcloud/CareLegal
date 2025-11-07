type RateLimitEntry = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

export type RateLimitConfig = {
  windowMs: number;
  max: number;
  blockDurationMs: number;
};

type RateLimitResult =
  | { success: true }
  | { success: false; retryAfterMs: number };

declare global {
  // eslint-disable-next-line no-var
  var __carelegalRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const store = (globalThis.__carelegalRateLimitStore =
  globalThis.__carelegalRateLimitStore ?? new Map<string, RateLimitEntry>());

export function enforceRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (existing?.blockedUntil && existing.blockedUntil > now) {
    return { success: false, retryAfterMs: existing.blockedUntil - now };
  }

  if (!existing || existing.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return { success: true };
  }

  existing.count += 1;

  if (existing.count > config.max) {
    existing.blockedUntil = now + config.blockDurationMs;
    store.set(key, existing);
    return { success: false, retryAfterMs: existing.blockedUntil - now };
  }

  store.set(key, existing);
  return { success: true };
}
