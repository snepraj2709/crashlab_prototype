export type AudienceType = "researcher" | "industry" | "investor" | "other";

export type JoinAvailability = "immediate" | "1-3months" | "3-6months" | "exploring";

export type PartnerTimeline = "urgent" | "1-3months" | "3-6months" | "exploring";

export type EngagementType =
  | "research-license"
  | "commissioned-study"
  | "joint-grant"
  | "data-partnership"
  | "other";

export interface ContactFormValues {
  name: string;
  email: string;
  organization?: string;
  message: string;
  audienceType: AudienceType;
  honeypot?: string;
}

export interface JoinFormValues {
  name: string;
  email: string;
  currentRole: string;
  institution: string;
  researchInterests: string[];
  portfolioUrl?: string;
  cvUrl?: string;
  motivation: string;
  availability: JoinAvailability;
  honeypot?: string;
}

export interface PartnerFormValues {
  name: string;
  email: string;
  company: string;
  companySize: "startup" | "sme" | "enterprise" | "government";
  problemDescription: string;
  engagementType: EngagementType;
  timeline: PartnerTimeline;
  budget?: string;
  honeypot?: string;
}

export type ApiResponse<T = null> =
  | { success: true; data?: T; message?: string }
  | {
      success: false;
      error: string;
      details?: Record<string, string | string[] | undefined>;
      message?: string;
    };
