import { z } from "zod";

export const partnerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(150),
  companySize: z.enum(["startup", "sme", "enterprise", "government"]),
  problemDescription: z.string().min(50).max(1500),
  engagementType: z.enum([
    "research-license",
    "commissioned-study",
    "joint-grant",
    "data-partnership",
    "other"
  ]),
  timeline: z.enum(["urgent", "1-3months", "3-6months", "exploring"]),
  budget: z.string().max(100).optional().or(z.literal("")),
  honeypot: z.string().optional()
});
