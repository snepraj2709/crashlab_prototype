"use client";

import { useState } from "react";

import { Button, Card } from "@/components/ui";
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
      companySize: String(formData.get("companySize") ?? "startup") as PartnerFormValues["companySize"],
      problemDescription: String(formData.get("problemDescription") ?? ""),
      engagementType: String(formData.get("engagementType") ?? "other") as PartnerFormValues["engagementType"],
      timeline: String(formData.get("timeline") ?? "exploring") as PartnerFormValues["timeline"],
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

    const result = (await response.json()) as ApiResponse<{ referenceId: string }>;
    if (!result.success) {
      setErrors((result.details as Record<string, string>) ?? { form: result.message ?? "Failed." });
    } else {
      setSuccessMessage(result.message ?? "Inquiry received.");
      setReferenceId(result.data?.referenceId ?? null);
      event.currentTarget.reset();
    }

    setIsSubmitting(false);
  }

  return (
    <Card className="border-white/12">
      <h3 className="font-display text-3xl text-white">Partner interest form</h3>
      <p className="mt-3 text-text-secondary">
        Describe the clinical or commercial problem you need solved and how you want to work with
        the lab.
      </p>
      <form action="/api/partner" className="mt-8 grid gap-5 md:grid-cols-2" method="post" onSubmit={handleSubmit}>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Name</span>
          <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="name" required />
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Email</span>
          <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="email" required type="email" />
          {errors.email ? <span className="mt-2 block text-sm text-red-300">{errors.email}</span> : null}
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Company</span>
          <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="company" required />
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Company size</span>
          <select className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" defaultValue="startup" name="companySize">
            {companySizes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm text-text-secondary">Problem description</span>
          <textarea className="min-h-40 w-full rounded-3xl border border-white/10 bg-bg-primary px-4 py-4 text-white" name="problemDescription" required />
          {errors.problemDescription ? (
            <span className="mt-2 block text-sm text-red-300">{errors.problemDescription}</span>
          ) : null}
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Engagement type</span>
          <select className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" defaultValue="research-license" name="engagementType">
            {engagementOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Timeline</span>
          <select className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" defaultValue="exploring" name="timeline">
            {timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm text-text-secondary">Budget range</span>
          <input className="w-full rounded-2xl border border-white/10 bg-bg-primary px-4 py-3 text-white" name="budget" />
        </label>
        <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />
        {errors.form ? <p className="md:col-span-2 text-sm text-red-300">{errors.form}</p> : null}
        {successMessage ? (
          <div className="md:col-span-2 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
            <p className="text-sm text-emerald-300">{successMessage}</p>
            {referenceId ? <p className="mt-2 font-mono text-white">{referenceId}</p> : null}
          </div>
        ) : null}
        <div className="md:col-span-2">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Start the Conversation"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
