const WINDOW_MS = 60 * 60 * 1000;

const requestStore = new Map<string, number[]>();

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor?.split(",")[0]?.trim() || realIp || "local";
}

export function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const timestamps = requestStore.get(key) ?? [];
  const recent = timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);

  recent.push(now);
  requestStore.set(key, recent);

  // v1 caveat: this in-memory limiter resets on cold starts and should be
  // replaced with Vercel KV or another shared store in production.
  return recent.length > maxRequests;
}
