export function coerceFormOption<T extends string>(
  value: FormDataEntryValue | null,
  options: readonly T[],
  fallback: T
): T {
  if (typeof value !== "string") {
    return fallback;
  }

  return options.find((option) => option === value) ?? fallback;
}
