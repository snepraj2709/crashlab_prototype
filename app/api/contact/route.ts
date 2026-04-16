import * as Sentry from "@sentry/nextjs";

import { sendEmail, createEmailTemplate } from "@/lib/resend/client";
import { contactSchema } from "@/lib/validations/contact";
import { flattenZodErrors, parseRequestBody, truncateEmail } from "@/lib/utils/api";
import {
  internalErrorResponse,
  invalidJsonResponse,
  rateLimitedResponse,
  sendFailedResponse,
  submittedResponse,
  validationErrorResponse,
  successResponse
} from "@/lib/utils/apiResponses";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await parseRequestBody(req);
    if (!body) {
      return invalidJsonResponse();
    }

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return validationErrorResponse(flattenZodErrors(result.error));
    }

    if (result.data.honeypot) {
      return submittedResponse();
    }

    const ip = getClientIp(req);
    if (isRateLimited(`contact:${ip}`, 3)) {
      return rateLimitedResponse();
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
      return sendFailedResponse();
    }

    console.info("[CRASH Lab Contact]", {
      timestamp: new Date().toISOString(),
      audienceType: result.data.audienceType,
      email: truncateEmail(result.data.email)
    });

    return successResponse({ success: true, message: "We'll be in touch within 48 hours." });
  } catch (error) {
    console.error("[API /api/contact]", error);
    Sentry.captureException(error);
    return internalErrorResponse();
  }
}
