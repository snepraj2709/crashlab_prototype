import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailTemplateOptions {
  eyebrow: string;
  title: string;
  intro: string;
  fields: Array<{ label: string; value: string }>;
  footer?: string;
}

function renderRows(fields: Array<{ label: string; value: string }>): string {
  return fields
    .map(
      (field) => `
        <tr>
          <td style="padding: 8px 0; color: #94A3B8; font-size: 13px; width: 160px;">${field.label}</td>
          <td style="padding: 8px 0; color: #E8EDF5; font-size: 14px;">${field.value}</td>
        </tr>
      `
    )
    .join("");
}

export function createEmailTemplate(options: EmailTemplateOptions): string {
  return `
    <div style="background:#0A0F1E;padding:32px;font-family:DM Sans,system-ui,sans-serif;color:#E8EDF5;">
      <div style="max-width:680px;margin:0 auto;border:1px solid #1F2937;border-radius:24px;background:#111827;padding:32px;">
        <p style="margin:0 0 12px;color:#00D4FF;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">${options.eyebrow}</p>
        <h1 style="margin:0 0 16px;font-size:28px;line-height:1.1;font-family:Georgia,serif;">${options.title}</h1>
        <p style="margin:0 0 24px;color:#94A3B8;font-size:15px;line-height:1.7;">${options.intro}</p>
        <table style="width:100%;border-collapse:collapse;">
          ${renderRows(options.fields)}
        </table>
        ${
          options.footer
            ? `<p style="margin:24px 0 0;color:#64748B;font-size:13px;line-height:1.6;">${options.footer}</p>`
            : ""
        }
      </div>
    </div>
  `;
}

export async function sendEmail({
  to,
  subject,
  html
}: {
  to: string | string[];
  subject: string;
  html: string;
}): Promise<void> {
  if (!resend) {
    throw new Error("Resend is not configured.");
  }

  const from = process.env.RESEND_FROM_EMAIL;

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  await resend.emails.send({
    from,
    to,
    subject,
    html
  });
}
