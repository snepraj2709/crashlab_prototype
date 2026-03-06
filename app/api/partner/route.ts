import * as Sentry from "@sentry/nextjs";

import { createEmailTemplate, sendEmail } from "@/lib/resend/client";
import { partnerSchema } from "@/lib/validations/partner";
import { flattenZodErrors, parseRequestBody } from "@/lib/utils/api";
import { createReferenceId } from "@/lib/utils/referenceId";
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

    const result = partnerSchema.safeParse(body);
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
    if (isRateLimited(`partner:${ip}`, 3)) {
      return Response.json(
        {
          success: false,
          error: "RATE_LIMITED",
          message: "Too many requests. Please try again later."
        } satisfies ApiResponse,
        { status: 429 }
      );
    }

    const referenceId = createReferenceId("CP");

    try {
      await sendEmail({
        to: process.env.RESEND_TO_EMAIL ?? "suvrankar.datta@ashoka.edu.in",
        subject: `New CRASH Lab partnership lead: ${result.data.company} (${referenceId})`,
        html: createEmailTemplate({
          eyebrow: "Industry Partnership",
          title: "A new partnership lead has arrived",
          intro: "The CRASH Lab partners page received a new inquiry.",
          fields: [
            { label: "Reference ID", value: referenceId },
            { label: "Name", value: result.data.name },
            { label: "Email", value: result.data.email },
            { label: "Company", value: result.data.company },
            { label: "Company size", value: result.data.companySize },
            { label: "Engagement", value: result.data.engagementType },
            { label: "Timeline", value: result.data.timeline },
            { label: "Budget", value: result.data.budget || "Not provided" },
            { label: "Problem", value: result.data.problemDescription }
          ]
        })
      });
    } catch (error) {
      console.error("[API /api/partner] send failed", error);
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

    return Response.json(
      {
        success: true,
        message: "A CRASH Lab team member will reach out within 5 business days.",
        data: { referenceId }
      } satisfies ApiResponse<{ referenceId: string }>,
      { status: 200 }
    );
  } catch (error) {
    console.error("[API /api/partner]", error);
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
