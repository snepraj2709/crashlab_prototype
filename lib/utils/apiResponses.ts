import type { ApiResponse } from "@/types/forms";

const RATE_LIMIT_MESSAGE = "Too many requests. Please try again later.";
const SEND_FAILED_MESSAGE = "Submission failed. Please email us directly.";

type ApiSuccess<T> = Extract<ApiResponse<T>, { success: true }>;
type ApiFailure = Extract<ApiResponse, { success: false }>;

function response<T>(body: T, status: number): Response {
  return Response.json(body, { status });
}

export function invalidJsonResponse(): Response {
  return response({ success: false, error: "INVALID_JSON" } satisfies ApiFailure, 400);
}

export function invalidPayloadResponse(): Response {
  return response({ success: false, error: "INVALID_PAYLOAD" } satisfies ApiFailure, 400);
}

export function validationErrorResponse(details: Record<string, string>): Response {
  return response(
    {
      success: false,
      error: "VALIDATION_ERROR",
      details
    } satisfies ApiFailure,
    400
  );
}

export function unauthorizedResponse(message = "Unauthorized."): Response {
  return response({ success: false, error: "UNAUTHORIZED", message } satisfies ApiFailure, 401);
}

export function rateLimitedResponse(): Response {
  return response(
    {
      success: false,
      error: "RATE_LIMITED",
      message: RATE_LIMIT_MESSAGE
    } satisfies ApiFailure,
    429
  );
}

export function sendFailedResponse(message = SEND_FAILED_MESSAGE): Response {
  return response({ success: false, error: "SEND_FAILED", message } satisfies ApiFailure, 500);
}

export function internalErrorResponse(message = SEND_FAILED_MESSAGE): Response {
  return response({ success: false, error: "INTERNAL_ERROR", message } satisfies ApiFailure, 500);
}

export function submittedResponse(message = "Submitted."): Response {
  return response({ success: true, message } satisfies ApiSuccess<never>, 200);
}

export function successResponse<T>(body: ApiSuccess<T>, status = 200): Response {
  return response(body, status);
}
