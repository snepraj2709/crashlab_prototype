"use client";

import { useState } from "react";

import type { ApiResponse, ContactFormValues } from "@/types/forms";

interface ContactPageFormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  form?: string;
}

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

    const result = (await response.json()) as ApiResponse;

    if (!result.success) {
      setErrors({
        form: result.message ?? "Submission failed.",
        message:
          typeof result.details?.message === "string" ? result.details.message : undefined
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
      className="mt-12 grid gap-8"
      data-cursor="native"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-3 block text-base font-medium text-text-primary">
            First Name <span className="text-text-secondary">(required)</span>
          </span>
          <input
            className="h-16 w-full border border-border bg-bg-surface px-5 text-lg text-text-primary outline-none focus:border-accent-cyan"
            name="firstName"
            required
          />
          {errors.firstName ? <span className="mt-2 block text-sm text-red-300">{errors.firstName}</span> : null}
        </label>

        <label className="block">
          <span className="mb-3 block text-base font-medium text-text-primary">
            Last Name <span className="text-text-secondary">(required)</span>
          </span>
          <input
            className="h-16 w-full border border-border bg-bg-surface px-5 text-lg text-text-primary outline-none focus:border-accent-cyan"
            name="lastName"
            required
          />
          {errors.lastName ? <span className="mt-2 block text-sm text-red-300">{errors.lastName}</span> : null}
        </label>
      </div>

      <label className="block">
        <span className="mb-3 block text-base font-medium text-text-primary">
          Email <span className="text-text-secondary">(required)</span>
        </span>
        <input
          className="h-16 w-full border border-border bg-bg-surface px-5 text-lg text-text-primary outline-none focus:border-accent-cyan"
          name="email"
          required
          type="email"
        />
        {errors.email ? <span className="mt-2 block text-sm text-red-300">{errors.email}</span> : null}
      </label>

      <label className="block">
        <span className="mb-3 block text-base font-medium text-text-primary">
          Message <span className="text-text-secondary">(required)</span>
        </span>
        <textarea
          className="min-h-60 w-full resize-y border border-border bg-bg-surface px-5 py-4 text-lg text-text-primary outline-none focus:border-accent-cyan"
          name="message"
          required
        />
        {errors.message ? <span className="mt-2 block text-sm text-red-300">{errors.message}</span> : null}
      </label>

      <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />

      {errors.form ? <p className="text-sm text-red-300">{errors.form}</p> : null}
      {submitted ? <p className="text-sm text-emerald-300">{submitted}</p> : null}

      <div>
        <button
          className="inline-flex rounded-2xl border border-border bg-bg-surface px-7 py-4 text-2xl text-text-primary transition hover:border-accent-cyan hover:text-accent-cyan disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
