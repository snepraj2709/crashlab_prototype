import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/resend/client", () => ({
  createEmailTemplate: vi.fn(() => "<p>email</p>"),
  sendEmail: vi.fn(async () => undefined)
}));

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn()
}));

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns 400 for malformed JSON", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "not-json",
      headers: {
        "content-type": "application/json"
      }
    });

    const response = await POST(request);
    const json = (await response.json()) as { error: string };

    expect(response.status).toBe(400);
    expect(json.error).toBe("INVALID_JSON");
  });

  it("returns validation errors for invalid payloads", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "A",
        email: "invalid",
        message: "short",
        audienceType: "researcher"
      }),
      headers: {
        "content-type": "application/json"
      }
    });

    const response = await POST(request);
    const json = (await response.json()) as { error: string; details: Record<string, string> };

    expect(response.status).toBe(400);
    expect(json.error).toBe("VALIDATION_ERROR");
    expect(json.details.email).toBeDefined();
  });

  it("accepts a valid payload", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Researcher Name",
        email: "person@example.com",
        organization: "Ashoka University",
        message: "I would like to discuss a research collaboration around evaluation design.",
        audienceType: "researcher"
      }),
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "127.0.0.1"
      }
    });

    const response = await POST(request);
    const json = (await response.json()) as { success: boolean; message: string };

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.message).toContain("48 hours");
  });
});
