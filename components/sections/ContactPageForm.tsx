"use client";

import { useState } from "react";

import { flattenApiErrorDetails } from "@/lib/utils/api";
import type { ApiResponse, ContactFormValues } from "@/types/forms";

interface ContactPageFormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  form?: string;
}

const fieldClassName = "ui-field px-5 text-lg";

const textareaClassName = "ui-textarea min-h-60 resize-y px-5 py-4 text-lg";

export function ContactPageForm(): React.ReactElement {
  const [errors, setErrors] = useState<ContactPageFormState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setErrors({});
    setSubmitted(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const honeypot = String(formData.get("honeypot") ?? "");

    const nextErrors: ContactPageFormState = {};

    if (!firstName) {
      nextErrors.firstName = "First name is required.";
    }

    if (!lastName) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!email) {
      nextErrors.email = "Email is required.";
    }

    if (!message) {
      nextErrors.message = "Message is required.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const payload: ContactFormValues = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      organization: "",
      audienceType: "other",
      message,
      honeypot
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
      setErrors({
        form: result.message ?? "Submission failed.",
        message: fieldErrors.message
      });
    } else {
      setSubmitted(result.message ?? "We'll be in touch soon.");
      event.currentTarget.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <form
      action="/api/contact"
      aria-busy={isSubmitting}
      className="ui-panel grid gap-8 p-8 md:p-10 lg:p-12"
      data-cursor="native"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block" htmlFor="contact-page-first-name">
          <span className="ui-field-label text-base">
            First Name <span className="text-text-muted">(required)</span>
          </span>
          <input
            aria-describedby={errors.firstName ? "contact-page-first-name-error" : undefined}
            aria-invalid={Boolean(errors.firstName)}
            className={fieldClassName}
            id="contact-page-first-name"
            name="firstName"
            required
          />
          {errors.firstName ? <span className="ui-field-error" id="contact-page-first-name-error">{errors.firstName}</span> : null}
        </label>

        <label className="block" htmlFor="contact-page-last-name">
          <span className="ui-field-label text-base">
            Last Name <span className="text-text-muted">(required)</span>
          </span>
          <input
            aria-describedby={errors.lastName ? "contact-page-last-name-error" : undefined}
            aria-invalid={Boolean(errors.lastName)}
            className={fieldClassName}
            id="contact-page-last-name"
            name="lastName"
            required
          />
          {errors.lastName ? <span className="ui-field-error" id="contact-page-last-name-error">{errors.lastName}</span> : null}
        </label>
      </div>

      <label className="block" htmlFor="contact-page-email">
        <span className="ui-field-label text-base">
          Email <span className="text-text-muted">(required)</span>
        </span>
        <input
          aria-describedby={errors.email ? "contact-page-email-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          className={fieldClassName}
          id="contact-page-email"
          name="email"
          required
          type="email"
        />
        {errors.email ? <span className="ui-field-error" id="contact-page-email-error">{errors.email}</span> : null}
      </label>

      <label className="block" htmlFor="contact-page-message">
        <span className="ui-field-label text-base">
          Message <span className="text-text-muted">(required)</span>
        </span>
        <textarea
          aria-describedby={errors.message ? "contact-page-message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className={textareaClassName}
          id="contact-page-message"
          name="message"
          required
        />
        {errors.message ? <span className="ui-field-error" id="contact-page-message-error">{errors.message}</span> : null}
      </label>

      <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />

      {errors.form ? (
        <div className="ui-feedback ui-feedback--error" role="alert">
          <p className="text-sm text-status-error-text">{errors.form}</p>
        </div>
      ) : null}
      {submitted ? (
        <div className="ui-feedback ui-feedback--success" role="status">
          <p className="text-sm text-status-success-text">{submitted}</p>
        </div>
      ) : null}

      <div>
        <button
          aria-busy={isSubmitting}
          className="ui-focus-ring inline-flex min-h-[52px] items-center justify-center rounded-token-pill border border-surface-strong bg-surface-strong px-8 py-4 text-xl font-medium text-text-on-strong transition hover:border-border-focus hover:bg-surface-shell disabled:cursor-not-allowed disabled:border-border disabled:bg-bg-elevated disabled:text-text-tertiary"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
