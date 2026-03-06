import * as Sentry from "@sentry/nextjs";
import { revalidatePath } from "next/cache";

import type { ApiResponse } from "@/types/forms";

interface RevalidatePayload {
  _type: "research" | "person" | "post";
  slug?: { current: string };
}

export async function POST(req: Request): Promise<Response> {
  try {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      return Response.json(
        {
          success: false,
          error: "UNAUTHORIZED",
          message: "Unauthorized."
        } satisfies ApiResponse,
        { status: 401 }
      );
    }

    const body = (await req.json().catch(() => null)) as RevalidatePayload | null;
    if (!body) {
      return Response.json({ success: false, error: "INVALID_JSON" } satisfies ApiResponse, {
        status: 400
      });
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
        revalidatePath("/blog");
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`);
        }
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

    return Response.json(
      {
        success: true,
        message: "Revalidation triggered."
      } satisfies ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("[API /api/revalidate]", error);
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Revalidation failed."
      } satisfies ApiResponse,
      { status: 500 }
    );
  }
}
