"use client";

import { useState } from "react";

import { Button, Card } from "@/components/ui";
import { flattenApiErrorDetails } from "@/lib/utils/api";
import { coerceFormOption } from "@/lib/utils/forms";
import type { ApiResponse, PartnerFormValues } from "@/types/forms";

const engagementOptions: PartnerFormValues["engagementType"][] = [
  "research-license",
  "commissioned-study",
  "joint-grant",
  "data-partnership",
  "other"
];

const companySizes: PartnerFormValues["companySize"][] = [
  "startup",
  "sme",
  "enterprise",
  "government"
];

const timelines: PartnerFormValues["timeline"][] = [
  "urgent",
  "1-3months",
  "3-6months",
  "exploring"
];

export function PartnerInterestForm(): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    setSuccessMessage(null);
    setReferenceId(null);

    const formData = new FormData(event.currentTarget);
    const payload: PartnerFormValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      companySize: coerceFormOption(formData.get("companySize"), companySizes, "startup"),
      problemDescription: String(formData.get("problemDescription") ?? ""),
      engagementType: coerceFormOption(formData.get("engagementType"), engagementOptions, "other"),
      timeline: coerceFormOption(formData.get("timeline"), timelines, "exploring"),
      budget: String(formData.get("budget") ?? ""),
      honeypot: String(formData.get("honeypot") ?? "")
    };

    const response = await fetch("/api/partner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result: ApiResponse<{ referenceId: string }> = await response.json();
    if (!result.success) {
      const fieldErrors = flattenApiErrorDetails(result.details);
      setErrors(
        Object.keys(fieldErrors).length ? fieldErrors : { form: result.message ?? "Failed." }
      );
    } else {
      setSuccessMessage(result.message ?? "Inquiry received.");
      setReferenceId(result.data?.referenceId ?? null);
      event.currentTarget.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <Card className="border-border">
      <h3 className="font-display text-3xl text-text-primary">Collaboration interest form</h3>
      <p className="mt-3 text-text-secondary">
        Describe the clinical or commercial problem you need solved and how you want to
        collaborate with the lab.
      </p>
      <form
        action="/api/partner"
        aria-busy={isSubmitting}
        className="mt-8 grid gap-5 md:grid-cols-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="partner-name">
          <span className="ui-field-label">Name</span>
          <input
            aria-describedby={errors.name ? "partner-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            className="ui-field"
            id="partner-name"
            name="name"
            required
          />
          {errors.name ? <span className="ui-field-error" id="partner-name-error">{errors.name}</span> : null}
        </label>
        <label htmlFor="partner-email">
          <span className="ui-field-label">Email</span>
          <input
            aria-describedby={errors.email ? "partner-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            className="ui-field"
            id="partner-email"
            name="email"
            required
            type="email"
          />
          {errors.email ? <span className="ui-field-error" id="partner-email-error">{errors.email}</span> : null}
        </label>
        <label htmlFor="partner-company">
          <span className="ui-field-label">Company</span>
          <input
            aria-describedby={errors.company ? "partner-company-error" : undefined}
            aria-invalid={Boolean(errors.company)}
            className="ui-field"
            id="partner-company"
            name="company"
            required
          />
          {errors.company ? <span className="ui-field-error" id="partner-company-error">{errors.company}</span> : null}
        </label>
        <label htmlFor="partner-company-size">
          <span className="ui-field-label">Company size</span>
          <select className="ui-select" defaultValue="startup" id="partner-company-size" name="companySize">
            {companySizes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2" htmlFor="partner-problem-description">
          <span className="ui-field-label">Problem description</span>
          <textarea
            aria-describedby={errors.problemDescription ? "partner-problem-description-error" : undefined}
            aria-invalid={Boolean(errors.problemDescription)}
            className="ui-textarea"
            id="partner-problem-description"
            name="problemDescription"
            required
          />
          {errors.problemDescription ? (
            <span className="ui-field-error" id="partner-problem-description-error">{errors.problemDescription}</span>
          ) : null}
        </label>
        <label htmlFor="partner-engagement-type">
          <span className="ui-field-label">Engagement type</span>
          <select className="ui-select" defaultValue="research-license" id="partner-engagement-type" name="engagementType">
            {engagementOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="partner-timeline">
          <span className="ui-field-label">Timeline</span>
          <select className="ui-select" defaultValue="exploring" id="partner-timeline" name="timeline">
            {timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2" htmlFor="partner-budget">
          <span className="ui-field-label">Budget range</span>
          <input className="ui-field" id="partner-budget" name="budget" />
        </label>
        <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />
        {errors.form ? (
          <div className="ui-feedback ui-feedback--error md:col-span-2" role="alert">
            <p className="text-sm text-status-error-text">{errors.form}</p>
          </div>
        ) : null}
        {successMessage ? (
          <div className="ui-feedback ui-feedback--success md:col-span-2" role="status">
            <p className="text-sm text-status-success-text">{successMessage}</p>
            {referenceId ? <p className="mt-2 font-mono text-text-primary">{referenceId}</p> : null}
          </div>
        ) : null}
        <div className="md:col-span-2">
          <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Start the Conversation"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
