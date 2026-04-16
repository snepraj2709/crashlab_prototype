import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";

import {
  internalErrorResponse,
  invalidJsonResponse,
  invalidPayloadResponse,
  successResponse,
  unauthorizedResponse
} from "@/lib/utils/apiResponses";

interface RevalidatePayload {
  _type: "research" | "person" | "post";
  slug?: { current: string };
}

function getRevalidateSlug(value: object): { current?: string } | undefined {
  const current = Reflect.get(value, "current");
  if (current === undefined || typeof current === "string") {
    return { current };
  }

  return undefined;
}

function isRevalidatePayload(body: unknown): body is RevalidatePayload {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const type = Reflect.get(body, "_type");
  if (type !== "research" && type !== "person" && type !== "post") {
    return false;
  }

  const slug = Reflect.get(body, "slug");
  if (slug === undefined) {
    return true;
  }

  if (typeof slug !== "object" || slug === null) {
    return false;
  }

  return getRevalidateSlug(slug) !== undefined;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return unauthorizedResponse();
    }

    const body: unknown = await req.json().catch(() => null);
    if (body === null) {
      return invalidJsonResponse();
    }

    if (!isRevalidatePayload(body)) {
      return invalidPayloadResponse();
    }

    switch (body._type) {
      case "research":
        revalidatePath("/research");
        if (body.slug?.current) {
          revalidatePath(`/research/${body.slug.current}`);
        }
        revalidatePath("/");
        break;
      case "post":
        revalidatePath("/news");
        if (body.slug?.current) {
          revalidatePath(`/news/${body.slug.current}`);
        }
        revalidatePath("/");
        break;
      case "person":
        revalidatePath("/people");
        if (body.slug?.current) {
          revalidatePath(`/people/${body.slug.current}`);
        }
        break;
      default:
        break;
    }

    return successResponse({ success: true, message: "Revalidation triggered." });
  } catch (error) {
    console.error("[API /api/revalidate]", error);
    Sentry.captureException(error);
    return internalErrorResponse("Revalidation failed.");
  }
}
