import type { ZodError } from "zod";

export function flattenZodErrors(error: ZodError): Record<string, string> {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.entries(fieldErrors).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value?.[0]) {
      acc[key] = value[0];
    }

    return acc;
  }, {});
}

export function truncateEmail(email: string): string {
  const [localPart = "", domain = ""] = email.split("@");

  if (!domain) {
    return email.slice(0, 3);
  }

  return `${localPart.slice(0, 3)}***@${domain}`;
}

export async function parseRequestBody(request: Request): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json().catch(() => null)) as Record<string, unknown> | null;
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData = await request.formData().catch(() => null);

    if (!formData) {
      return null;
    }

    const body: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      const nextValue = typeof value === "string" ? value : value.name;
      const currentValue = body[key];

      if (Array.isArray(currentValue)) {
        currentValue.push(nextValue);
      } else if (typeof currentValue === "string") {
        body[key] = [currentValue, nextValue];
      } else {
        body[key] = nextValue;
      }
    }

    return body;
  }

  return (await request.json().catch(() => null)) as Record<string, unknown> | null;
}
