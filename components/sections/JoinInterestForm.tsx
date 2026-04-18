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
      <form
        action="/api/join"
        aria-busy={isSubmitting}
        className="mt-8 grid gap-5 md:grid-cols-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="join-name">
          <span className="ui-field-label">Name</span>
          <input
            aria-describedby={errors.name ? "join-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            className="ui-field"
            id="join-name"
            name="name"
            required
          />
          {errors.name ? <span className="ui-field-error" id="join-name-error">{errors.name}</span> : null}
        </label>
        <label htmlFor="join-email">
          <span className="ui-field-label">Email</span>
          <input
            aria-describedby={errors.email ? "join-email-error" : undefined}
            aria-invalid={Boolean(errors.email)}
            className="ui-field"
            id="join-email"
            name="email"
            required
            type="email"
          />
          {errors.email ? <span className="ui-field-error" id="join-email-error">{errors.email}</span> : null}
        </label>
        <label htmlFor="join-current-role">
          <span className="ui-field-label">Current Role</span>
          <select
            aria-describedby={errors.currentRole ? "join-current-role-error" : undefined}
            aria-invalid={Boolean(errors.currentRole)}
            className="ui-select"
            defaultValue=""
            id="join-current-role"
            name="currentRole"
            required
          >
            <option disabled value="">
              Select one
            </option>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.currentRole ? (
            <span className="ui-field-error" id="join-current-role-error">{errors.currentRole}</span>
          ) : null}
        </label>
        <label htmlFor="join-institution">
          <span className="ui-field-label">Institution</span>
          <input
            aria-describedby={errors.institution ? "join-institution-error" : undefined}
            aria-invalid={Boolean(errors.institution)}
            className="ui-field"
            id="join-institution"
            name="institution"
            required
          />
          {errors.institution ? (
            <span className="ui-field-error" id="join-institution-error">{errors.institution}</span>
          ) : null}
        </label>
        <fieldset
          aria-describedby={errors.researchInterests ? "join-research-interests-error" : undefined}
          className="md:col-span-2"
        >
          <legend className="ui-field-label mb-3">Research interests</legend>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {sortedInterests.map((interest) => (
              <label className="ui-choice-card" key={interest}>
                <input
                  aria-invalid={Boolean(errors.researchInterests)}
                  className="ui-choice-control"
                  name="researchInterests"
                  type="checkbox"
                  value={interest}
                />
                {interest}
              </label>
            ))}
          </div>
          {errors.researchInterests ? (
            <span className="ui-field-error" id="join-research-interests-error">{errors.researchInterests}</span>
          ) : null}
        </fieldset>
        <label htmlFor="join-portfolio-url">
          <span className="ui-field-label">Portfolio / GitHub URL</span>
          <input
            aria-describedby={errors.portfolioUrl ? "join-portfolio-url-error" : undefined}
            aria-invalid={Boolean(errors.portfolioUrl)}
            className="ui-field"
            id="join-portfolio-url"
            name="portfolioUrl"
            type="url"
          />
          {errors.portfolioUrl ? (
            <span className="ui-field-error" id="join-portfolio-url-error">{errors.portfolioUrl}</span>
          ) : null}
        </label>
        <label htmlFor="join-cv-url">
          <span className="ui-field-label">CV URL</span>
          <input
            aria-describedby={errors.cvUrl ? "join-cv-url-error" : undefined}
            aria-invalid={Boolean(errors.cvUrl)}
            className="ui-field"
            id="join-cv-url"
            name="cvUrl"
            type="url"
          />
          {errors.cvUrl ? <span className="ui-field-error" id="join-cv-url-error">{errors.cvUrl}</span> : null}
        </label>
        <label className="md:col-span-2" htmlFor="join-motivation">
          <span className="ui-field-label">Motivation</span>
          <textarea
            aria-describedby={[
              errors.motivation ? "join-motivation-error" : null,
              "join-motivation-count"
            ].filter(Boolean).join(" ")}
            aria-invalid={Boolean(errors.motivation)}
            className="ui-textarea"
            id="join-motivation"
            name="motivation"
            onChange={(event) => setMotivationLength(event.target.value.length)}
            required
          />
          <div className="mt-2 flex items-center justify-between">
            {errors.motivation ? <span className="ui-field-error mt-0" id="join-motivation-error">{errors.motivation}</span> : <span />}
            <span className="text-sm text-text-tertiary" id="join-motivation-count">{motivationLength} / 1000</span>
          </div>
        </label>
        <fieldset
          aria-describedby={errors.availability ? "join-availability-error" : undefined}
          className="md:col-span-2"
        >
          <legend className="ui-field-label mb-3">Availability</legend>
          <div className="flex flex-wrap gap-3">
            {availabilityOptions.map((option) => (
              <label className="ui-choice-pill" key={option}>
                <input
                  className="ui-choice-control"
                  defaultChecked={option === "exploring"}
                  name="availability"
                  type="radio"
                  value={option}
                />
                {option}
              </label>
            ))}
          </div>
          {errors.availability ? (
            <span className="ui-field-error" id="join-availability-error">{errors.availability}</span>
          ) : null}
        </fieldset>
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
            {isSubmitting ? "Submitting..." : "Submit Interest"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
