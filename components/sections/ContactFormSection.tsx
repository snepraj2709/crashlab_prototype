"use client";

import { useState } from "react";

import { Button, Card, SectionLabel } from "@/components/ui";
import type { ApiResponse, AudienceType, ContactFormValues } from "@/types/forms";

interface ContactFormSectionProps {
  audienceType?: AudienceType;
  title?: string;
  intro?: string;
}

const audienceOptions: AudienceType[] = ["researcher", "industry", "investor", "other"];

export function ContactFormSection({
  audienceType = "other",
  title = "Want to fund this work?",
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
      audienceType: String(formData.get("audienceType") ?? audienceType) as AudienceType,
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
    const result = (await response.json()) as ApiResponse;

    if (!result.success) {
      setErrors((result.details as Record<string, string>) ?? { form: result.message ?? "Failed." });
    } else {
      setSubmitted(result.message ?? "We'll be in touch soon.");
      event.currentTarget.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Card className="border-white/12">
          <SectionLabel number="08" text="Contact" />
          <h2 className="mt-6 font-display text-4xl text-white lg:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-text-secondary">{intro}</p>
          <form action="/api/contact" className="mt-10 grid gap-5 md:grid-cols-2" method="post" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-text-secondary">Name</span>
              <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="name" required />
              {errors.name ? <span className="mt-2 block text-sm text-red-300">{errors.name}</span> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-text-secondary">Email</span>
              <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="email" required type="email" />
              {errors.email ? <span className="mt-2 block text-sm text-red-300">{errors.email}</span> : null}
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-text-secondary">Organization</span>
              <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="organization" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-text-secondary">Audience</span>
              <select
                className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white"
                defaultValue={audienceType}
                name="audienceType"
              >
                {audienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm text-text-secondary">Message</span>
              <textarea className="min-h-36 w-full rounded-3xl border border-white/10 bg-bg-primary px-4 py-4 text-white" name="message" required />
              {errors.message ? <span className="mt-2 block text-sm text-red-300">{errors.message}</span> : null}
            </label>
            <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />
            {errors.form ? <p className="md:col-span-2 text-sm text-red-300">{errors.form}</p> : null}
            {submitted ? <p className="md:col-span-2 text-sm text-emerald-300">{submitted}</p> : null}
            <div className="md:col-span-2">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
