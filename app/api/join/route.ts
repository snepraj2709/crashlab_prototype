import groq from "groq";
import * as Sentry from "@sentry/nextjs";

import { client, writeClient } from "@/lib/sanity/client";
import { createEmailTemplate, sendEmail } from "@/lib/resend/client";
import { joinSchema } from "@/lib/validations/join";
import { flattenZodErrors, parseRequestBody } from "@/lib/utils/api";
import {
  internalErrorResponse,
  invalidJsonResponse,
  rateLimitedResponse,
  sendFailedResponse,
  submittedResponse,
  successResponse,
  validationErrorResponse
} from "@/lib/utils/apiResponses";
import { createReferenceId } from "@/lib/utils/referenceId";
import { getClientIp, isRateLimited } from "@/lib/utils/rateLimit";
import type { JoinFormValues } from "@/types/forms";

async function getNextJoinReferenceId(): Promise<string> {
  const year = new Date().getUTCFullYear();

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return createReferenceId("CL", year);
  }

  try {
    const count = await client.fetch<number>(
      groq`count(*[_type == "application" && submittedAt >= $start && submittedAt < $end])`,
      {
        start: `${year}-01-01T00:00:00.000Z`,
        end: `${year + 1}-01-01T00:00:00.000Z`
      }
    );

    return `CL-${year}-${String(count + 1).padStart(4, "0")}`;
  } catch (error) {
    console.warn("[CRASH Lab] Falling back to local join reference counter.", error);
    return createReferenceId("CL", year);
  }
}

async function persistApplication(payload: JoinFormValues, referenceId: string): Promise<void> {
  if (!writeClient) {
    return;
  }

  const document = {
    _type: "application",
    referenceId,
    name: payload.name,
    email: payload.email,
    currentRole: payload.currentRole,
    institution: payload.institution,
    researchInterests: payload.researchInterests,
    portfolioUrl: payload.portfolioUrl || undefined,
    cvUrl: payload.cvUrl || undefined,
    motivation: payload.motivation,
    availability: payload.availability,
    submittedAt: new Date().toISOString()
  };

  await writeClient.create(document);
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await parseRequestBody(req);
    if (!body) {
      return invalidJsonResponse();
    }

    const normalizedBody = {
      ...body,
      researchInterests: Array.isArray(body.researchInterests)
        ? body.researchInterests
        : body.researchInterests
          ? [body.researchInterests]
          : []
    };

    const result = joinSchema.safeParse(normalizedBody);
    if (!result.success) {
      return validationErrorResponse(flattenZodErrors(result.error));
    }

    if (result.data.honeypot) {
      return submittedResponse();
    }

    const ip = getClientIp(req);
    if (isRateLimited(`join:${ip}`, 3)) {
      return rateLimitedResponse();
    }

    const referenceId = await getNextJoinReferenceId();

    try {
      await sendEmail({
        to: result.data.email,
        subject: `CRASH Lab application received (${referenceId})`,
        html: createEmailTemplate({
          eyebrow: "CRASH Lab Join",
          title: "Your CRASH Lab application has been received",
          intro: "Thank you for your interest. Dr. Datta's team reviews applications every two weeks.",
          fields: [
            { label: "Reference ID", value: referenceId },
            { label: "Current role", value: result.data.currentRole },
            { label: "Institution", value: result.data.institution },
            { label: "Research interests", value: result.data.researchInterests.join(", ") },
            { label: "Availability", value: result.data.availability }
          ],
          footer: "If you need to follow up, reply to this email and include your reference ID."
        })
      });

      await sendEmail({
        to: process.env.RESEND_TO_EMAIL ?? "suvrankar.datta@ashoka.edu.in",
        subject: `New CRASH Lab applicant: ${result.data.name} (${referenceId})`,
        html: createEmailTemplate({
          eyebrow: "Researcher Intake",
          title: "A new researcher has applied to CRASH Lab",
          intro: "The website join form has captured a new application.",
          fields: [
            { label: "Reference ID", value: referenceId },
            { label: "Name", value: result.data.name },
            { label: "Email", value: result.data.email },
            { label: "Current role", value: result.data.currentRole },
            { label: "Institution", value: result.data.institution },
            { label: "Research interests", value: result.data.researchInterests.join(", ") },
            { label: "Portfolio", value: result.data.portfolioUrl || "Not provided" },
            { label: "CV URL", value: result.data.cvUrl || "Not provided" },
            { label: "Availability", value: result.data.availability },
            { label: "Motivation", value: result.data.motivation }
          ]
        })
      });
    } catch (error) {
      console.error("[API /api/join] send failed", error);
      Sentry.captureException(error);
      return sendFailedResponse();
    }

    try {
      await persistApplication(result.data, referenceId);
    } catch (error) {
      console.error("[API /api/join] sanity persistence failed", error);
      Sentry.captureException(error);
    }

    return successResponse({
      success: true,
      message:
        "Thank you. Dr. Datta's team reviews applications every two weeks. You'll hear from us.",
      data: {
        referenceId
      }
    });
  } catch (error) {
    console.error("[API /api/join]", error);
    Sentry.captureException(error);
    return internalErrorResponse();
  }
}
