const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean } {
  const now = Date.now();
  const timestamps = hits.get(key) ?? [];
  const recent = timestamps.filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}

export function rateLimitByIp(
  req: Request,
  prefix: string,
  limit: number,
  windowMs: number
): { ok: boolean } {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  return rateLimit(`${prefix}:${ip}`, limit, windowMs);
}
