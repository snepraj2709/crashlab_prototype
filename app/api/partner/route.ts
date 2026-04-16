import * as Sentry from "@sentry/nextjs";

import { createEmailTemplate, sendEmail } from "@/lib/resend/client";
import { partnerSchema } from "@/lib/validations/partner";
import { flattenZodErrors, parseRequestBody } from "@/lib/utils/api";
import {
  internalErrorResponse,
  invalidJsonResponse,
  rateLimitedResponse,
  sendFailedResponse,
  submittedResponse,
  validationErrorResponse,
  successResponse
} from "@/lib/utils/apiResponses";
import { createReferenceId } from "@/lib/utils/referenceId";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await parseRequestBody(req);
    if (!body) {
      return invalidJsonResponse();
    }

    const result = partnerSchema.safeParse(body);
    if (!result.success) {
      return validationErrorResponse(flattenZodErrors(result.error));
    }

    if (result.data.honeypot) {
      return submittedResponse();
    }

    const ip = getClientIp(req);
    if (isRateLimited(`partner:${ip}`, 3)) {
      return rateLimitedResponse();
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
      return sendFailedResponse();
    }

    return successResponse({
      success: true,
      message: "A CRASH Lab team member will reach out within 5 business days.",
      data: { referenceId }
    });
  } catch (error) {
    console.error("[API /api/partner]", error);
    Sentry.captureException(error);
    return internalErrorResponse();
  }
}
