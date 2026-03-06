import { z } from "zod";

export const joinSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  currentRole: z.string().min(2).max(100),
  institution: z.string().min(2).max(200),
  researchInterests: z.array(z.string()).min(1),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  cvUrl: z.string().url().optional().or(z.literal("")),
  motivation: z.string().min(100).max(1000),
  availability: z.enum(["immediate", "1-3months", "3-6months", "exploring"]),
  honeypot: z.string().optional()
});
