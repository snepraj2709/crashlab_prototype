import * as Sentry from "@sentry/nextjs";

import { sendEmail, createEmailTemplate } from "@/lib/resend/client";
import { contactSchema } from "@/lib/validations/contact";
import { flattenZodErrors, parseRequestBody, truncateEmail } from "@/lib/utils/api";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";
import type { ApiResponse } from "@/types/forms";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await parseRequestBody(req);
    if (!body) {
      return Response.json({ success: false, error: "INVALID_JSON" } satisfies ApiResponse, {
        status: 400
      });
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: "VALIDATION_ERROR",
          details: flattenZodErrors(result.error)
        } satisfies ApiResponse,
        { status: 400 }
      );
    }

    if (result.data.honeypot) {
      return Response.json({ success: true, message: "Submitted." } satisfies ApiResponse, {
        status: 200
      });
    }

    const ip = getClientIp(req);
    if (isRateLimited(`contact:${ip}`, 3)) {
      return Response.json(
        {
          success: false,
          error: "RATE_LIMITED",
          message: "Too many requests. Please try again later."
        } satisfies ApiResponse,
        { status: 429 }
      );
    }

    try {
      await sendEmail({
        to: process.env.RESEND_TO_EMAIL ?? "suvrankar.datta@ashoka.edu.in",
        subject: `CRASH Lab contact inquiry from ${result.data.name}`,
        html: createEmailTemplate({
          eyebrow: "CRASH Lab Contact",
          title: "New contact form submission",
          intro: "A new general inquiry has been submitted through the CRASH Lab website.",
          fields: [
            { label: "Name", value: result.data.name },
            { label: "Email", value: result.data.email },
            { label: "Organization", value: result.data.organization || "Not provided" },
            { label: "Audience", value: result.data.audienceType },
            { label: "Message", value: result.data.message }
          ],
          footer: "This message was sent from the CRASH Lab website contact form."
        })
      });
    } catch (error) {
      console.error("[API /api/contact] send failed", error);
      Sentry.captureException(error);
      return Response.json(
        {
          success: false,
          error: "SEND_FAILED",
          message: "Submission failed. Please email us directly."
        } satisfies ApiResponse,
        { status: 500 }
      );
    }

    console.info("[CRASH Lab Contact]", {
      timestamp: new Date().toISOString(),
      audienceType: result.data.audienceType,
      email: truncateEmail(result.data.email)
    });

    return Response.json(
      { success: true, message: "We'll be in touch within 48 hours." } satisfies ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("[API /api/contact]", error);
    Sentry.captureException(error);
    return Response.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: "Submission failed. Please email us directly."
      } satisfies ApiResponse,
      { status: 500 }
    );
  }
}
