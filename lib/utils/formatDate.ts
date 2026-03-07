export function formatDate(
  date: string | Date | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric"
  }
): string {
  if (!date) {
    return "Ongoing";
  }

  const parsed = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(parsed.getTime())) {
    return "Ongoing";
  }

  return new Intl.DateTimeFormat("en-IN", options).format(parsed);
}

export function formatMonthYear(date: string | Date | undefined): string {
  if (!date) {
    return "Ongoing";
  }

  const parsed = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(parsed.getTime())) {
    return "Ongoing";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(parsed);
}
