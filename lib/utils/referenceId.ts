const counters = new Map<string, number>();

export function createReferenceId(prefix: "CL" | "CP", year = new Date().getUTCFullYear()): string {
  const key = `${prefix}-${year}`;
  const nextValue = (counters.get(key) ?? 0) + 1;
  counters.set(key, nextValue);

  return `${prefix}-${year}-${String(nextValue).padStart(4, "0")}`;
}
