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

const fieldClassName =
  "h-16 w-full rounded-[24px] border border-slate-300 bg-slate-50 px-5 text-lg text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100";

const textareaClassName =
  "min-h-60 w-full resize-y rounded-[28px] border border-slate-300 bg-slate-50 px-5 py-4 text-lg text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100";

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
      className="grid gap-8 rounded-[36px] border border-slate-200 bg-white p-8 md:p-10 lg:p-12"
      data-cursor="native"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="mb-3 block text-base font-medium text-slate-700">
            First Name <span className="text-slate-500">(required)</span>
          </span>
          <input
            className={fieldClassName}
            name="firstName"
            required
          />
          {errors.firstName ? <span className="mt-2 block text-sm text-red-600">{errors.firstName}</span> : null}
        </label>

        <label className="block">
          <span className="mb-3 block text-base font-medium text-slate-700">
            Last Name <span className="text-slate-500">(required)</span>
          </span>
          <input
            className={fieldClassName}
            name="lastName"
            required
          />
          {errors.lastName ? <span className="mt-2 block text-sm text-red-600">{errors.lastName}</span> : null}
        </label>
      </div>

      <label className="block">
        <span className="mb-3 block text-base font-medium text-slate-700">
          Email <span className="text-slate-500">(required)</span>
        </span>
        <input
          className={fieldClassName}
          name="email"
          required
          type="email"
        />
        {errors.email ? <span className="mt-2 block text-sm text-red-600">{errors.email}</span> : null}
      </label>

      <label className="block">
        <span className="mb-3 block text-base font-medium text-slate-700">
          Message <span className="text-slate-500">(required)</span>
        </span>
        <textarea
          className={textareaClassName}
          name="message"
          required
        />
        {errors.message ? <span className="mt-2 block text-sm text-red-600">{errors.message}</span> : null}
      </label>

      <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />

      {errors.form ? <p className="text-sm text-red-600">{errors.form}</p> : null}
      {submitted ? <p className="text-sm text-emerald-600">{submitted}</p> : null}

      <div>
        <button
          className="inline-flex rounded-[24px] bg-sky-600 px-8 py-4 text-xl font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}
