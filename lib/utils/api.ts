import type { ZodError } from "zod";
import type { ApiResponse } from "@/types/forms";

type ApiErrorDetails = NonNullable<Extract<ApiResponse, { success: false }>["details"]>;
export type RequestBodyValue = string | string[];
export type RequestBody = Record<string, RequestBodyValue>;

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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeRequestValue(value: unknown): RequestBodyValue | null {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value instanceof File) {
    return value.name;
  }

  if (Array.isArray(value)) {
    const normalizedValues = value.map(normalizeRequestValue);
    if (normalizedValues.every((entry): entry is string => typeof entry === "string")) {
      return normalizedValues;
    }
  }

  return null;
}

function normalizeObjectBody(value: Record<string, unknown>): RequestBody | null {
  const body: RequestBody = {};

  for (const [key, entry] of Object.entries(value)) {
    const normalizedValue = normalizeRequestValue(entry);
    if (!normalizedValue) {
      return null;
    }

    body[key] = normalizedValue;
  }

  return body;
}

export function flattenApiErrorDetails(details: ApiErrorDetails | undefined): Record<string, string> {
  if (!details) {
    return {};
  }

  return Object.entries(details).reduce<Record<string, string>>((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    acc[key] = Array.isArray(value) ? value[0] ?? "" : value;
    return acc;
  }, {});
}

export async function parseRequestBody(request: Request): Promise<RequestBody | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const parsed: unknown = await request.json().catch(() => null);

    if (!isPlainObject(parsed)) {
      return null;
    }

    return normalizeObjectBody(parsed);
  }

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const formData: FormData | null = await request.formData().catch(() => null);

    if (!formData) {
      return null;
    }

    const body: RequestBody = {};
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

  const parsed: unknown = await request.json().catch(() => null);

  if (!isPlainObject(parsed)) {
    return null;
  }

  return normalizeObjectBody(parsed);
}
