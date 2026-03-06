import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  organization: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(20).max(2000),
  audienceType: z.enum(["researcher", "industry", "investor", "other"]),
  honeypot: z.string().optional()
});
