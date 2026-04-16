"use client";

import { useMemo, useState } from "react";

import { Button, Card } from "@/components/ui";
import { flattenApiErrorDetails } from "@/lib/utils/api";
import { coerceFormOption } from "@/lib/utils/forms";
import type { ApiResponse, JoinFormValues } from "@/types/forms";

interface JoinInterestFormProps {
  interests: string[];
}

const roleOptions = ["PhD Student", "Clinician", "Engineer", "Postdoc", "Other"];
const availabilityOptions: JoinFormValues["availability"][] = [
  "immediate",
  "1-3months",
  "3-6months",
  "exploring"
];

export function JoinInterestForm({ interests }: JoinInterestFormProps): React.ReactElement {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [motivationLength, setMotivationLength] = useState(0);

  const sortedInterests = useMemo(() => [...interests].sort(), [interests]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage(null);
    setReferenceId(null);

    const formData = new FormData(event.currentTarget);
    const payload: JoinFormValues = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      currentRole: String(formData.get("currentRole") ?? ""),
      institution: String(formData.get("institution") ?? ""),
      researchInterests: formData.getAll("researchInterests").map(String),
      portfolioUrl: String(formData.get("portfolioUrl") ?? ""),
      cvUrl: String(formData.get("cvUrl") ?? ""),
      motivation: String(formData.get("motivation") ?? ""),
      availability: coerceFormOption(formData.get("availability"), availabilityOptions, "exploring"),
      honeypot: String(formData.get("honeypot") ?? "")
    };

    const response = await fetch("/api/join", {
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
      setSuccessMessage(result.message ?? "Application received.");
      setReferenceId(result.data?.referenceId ?? null);
      event.currentTarget.reset();
      setMotivationLength(0);
    }

    setIsSubmitting(false);
  }

  return (
    <Card className="border-border">
      <h3 className="font-display text-3xl text-text-primary">Interest Form</h3>
      <p className="mt-3 max-w-2xl text-text-secondary">
        Tell the lab what you work on, why this research agenda matters to you, and how soon you
        could start.
      </p>
      <form action="/api/join" className="mt-8 grid gap-5 md:grid-cols-2" method="post" onSubmit={handleSubmit}>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Name</span>
          <input className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary" name="name" required />
          {errors.name ? <span className="mt-2 block text-sm text-red-300">{errors.name}</span> : null}
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Email</span>
          <input className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary" name="email" required type="email" />
          {errors.email ? <span className="mt-2 block text-sm text-red-300">{errors.email}</span> : null}
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Current Role</span>
          <select className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary" defaultValue="" name="currentRole" required>
            <option disabled value="">
              Select one
            </option>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Institution</span>
          <input className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary" name="institution" required />
        </label>
        <fieldset className="md:col-span-2">
          <legend className="mb-3 text-sm text-text-secondary">Research interests</legend>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {sortedInterests.map((interest) => (
              <label className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3 text-sm text-text-secondary" key={interest}>
                <input className="rounded border-border bg-bg-primary text-accent-cyan" name="researchInterests" type="checkbox" value={interest} />
                {interest}
              </label>
            ))}
          </div>
          {errors.researchInterests ? (
            <span className="mt-2 block text-sm text-red-300">{errors.researchInterests}</span>
          ) : null}
        </fieldset>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">Portfolio / GitHub URL</span>
          <input className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary" name="portfolioUrl" type="url" />
        </label>
        <label>
          <span className="mb-2 block text-sm text-text-secondary">CV URL</span>
          <input className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary" name="cvUrl" type="url" />
        </label>
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm text-text-secondary">Motivation</span>
          <textarea
            className="min-h-40 w-full rounded-3xl border border-border bg-bg-primary px-4 py-4 text-text-primary"
            name="motivation"
            onChange={(event) => setMotivationLength(event.target.value.length)}
            required
          />
          <div className="mt-2 flex items-center justify-between">
            {errors.motivation ? <span className="text-sm text-red-300">{errors.motivation}</span> : <span />}
            <span className="text-sm text-text-tertiary">{motivationLength} / 1000</span>
          </div>
        </label>
        <fieldset className="md:col-span-2">
          <legend className="mb-3 text-sm text-text-secondary">Availability</legend>
          <div className="flex flex-wrap gap-3">
            {availabilityOptions.map((option) => (
              <label className="flex items-center gap-3 rounded-full border border-border px-4 py-3 text-sm text-text-secondary" key={option}>
                <input className="rounded border-border bg-bg-primary text-accent-cyan" defaultChecked={option === "exploring"} name="availability" type="radio" value={option} />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
        <input autoComplete="off" className="hidden" name="honeypot" tabIndex={-1} />
        {errors.form ? <p className="md:col-span-2 text-sm text-red-300">{errors.form}</p> : null}
        {successMessage ? (
          <div className="md:col-span-2 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
            <p className="text-sm text-emerald-300">{successMessage}</p>
            {referenceId ? <p className="mt-2 font-mono text-text-primary">{referenceId}</p> : null}
          </div>
        ) : null}
        <div className="md:col-span-2">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Submitting..." : "Submit Interest"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
