"use client";

import { useState } from "react";

import { Button, Card, SectionLabel } from "@/components/ui";
import { flattenApiErrorDetails } from "@/lib/utils/api";
import { coerceFormOption } from "@/lib/utils/forms";
import type { ApiResponse, AudienceType, ContactFormValues } from "@/types/forms";

interface ContactFormSectionProps {
  audienceType?: AudienceType;
  title?: string;
  intro?: string;
}

const audienceOptions: AudienceType[] = ["researcher", "industry", "investor", "other"];

export function ContactFormSection({
  audienceType = "other",
  title = "Want to fund our work?",
  intro = "Send a note and the lab will reply within 48 hours."
}: ContactFormSectionProps): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitted(null);

    const formData = new FormData(event.currentTarget);
    const payload: ContactFormValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      organization: String(formData.get("organization") ?? ""),
      audienceType: coerceFormOption(formData.get("audienceType"), audienceOptions, audienceType),
      message: String(formData.get("message") ?? ""),
      honeypot: String(formData.get("honeypot") ?? "")
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result: ApiResponse = await response.json();

    if (!result.success) {
      const fieldErrors = flattenApiErrorDetails(result.details);
      setErrors(
        Object.keys(fieldErrors).length ? fieldErrors : { form: result.message ?? "Failed." }
      );
    } else {
      setSubmitted(result.message ?? "We'll be in touch soon.");
      event.currentTarget.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Card className="border-border">
          <SectionLabel number="08" text="Contact" />
          <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-text-secondary">{intro}</p>
          <form
            action="/api/contact"
            aria-busy={isSubmitting}
            className="mt-10 grid gap-5 md:grid-cols-2"
            method="post"
            onSubmit={handleSubmit}
          >
            <label className="block" htmlFor="contact-name">
              <span className="ui-field-label">Name</span>
              <input
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                aria-invalid={Boolean(errors.name)}
                className="ui-field"
                id="contact-name"
                name="name"
                required
              />
              {errors.name ? <span className="ui-field-error" id="contact-name-error">{errors.name}</span> : null}
            </label>
            <label className="block" htmlFor="contact-email">
              <span className="ui-field-label">Email</span>
              <input
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                aria-invalid={Boolean(errors.email)}
                className="ui-field"
                id="contact-email"
                name="email"
                required
                type="email"
              />
              {errors.email ? <span className="ui-field-error" id="contact-email-error">{errors.email}</span> : null}
            </label>
            <label className="block" htmlFor="contact-organization">
              <span className="ui-field-label">Organization</span>
              <input className="ui-field" id="contact-organization" name="organization" />
            </label>
            <label className="block" htmlFor="contact-audience">
              <span className="ui-field-label">Audience</span>
              <select
                className="ui-select"
                defaultValue={audienceType}
                id="contact-audience"
                name="audienceType"
              >
                {audienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block md:col-span-2" htmlFor="contact-message">
              <span className="ui-field-label">Message</span>
              <textarea
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                aria-invalid={Boolean(errors.message)}
                className="ui-textarea"
                id="contact-message"
                name="message"
                required
              />
              {errors.message ? <span className="ui-field-error" id="contact-message-error">{errors.message}</span> : null}
            </label>
            <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />
            {errors.form ? (
              <div className="ui-feedback ui-feedback--error md:col-span-2" role="alert">
                <p className="text-sm text-status-error-text">{errors.form}</p>
              </div>
            ) : null}
            {submitted ? (
              <div className="ui-feedback ui-feedback--success md:col-span-2" role="status">
                <p className="text-sm text-status-success-text">{submitted}</p>
              </div>
            ) : null}
            <div className="md:col-span-2">
              <Button aria-busy={isSubmitting} disabled={isSubmitting} type="submit">
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
