import type { PortableTextBlock, ProjectAudience, ProjectMetric, ProjectStatus } from "@/types/research";
import type { SocialLinks } from "@/types/team";

export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  alt?: string;
}

export interface ResearchDocument {
  _id: string;
  _type: "research";
  slug: SanitySlug;
  title: string;
  problemStatement: string;
  summary: string;
  body?: PortableTextBlock[];
  status: ProjectStatus;
  venue?: string;
  publishedAt?: string;
  paperUrl?: string;
  heroImage?: SanityImage;
  tags: string[];
  audience: ProjectAudience[];
  lead?: PersonDocument;
  team?: PersonDocument[];
  featured?: boolean;
  seekingCollaborators?: boolean;
  metrics?: ProjectMetric[];
}

export interface PersonDocument {
  _id: string;
  _type: "person";
  slug: SanitySlug;
  name: string;
  role: string;
  title: string;
  photo?: SanityImage;
  shortBio: string;
  fullBio?: PortableTextBlock[];
  email?: string;
  credentials?: string[];
  researchFocus?: string[];
  socialLinks?: SocialLinks;
  isPrincipalInvestigator?: boolean;
  isActive?: boolean;
  joinedAt?: string;
  position?: number;
}

export interface PostDocument {
  _id: string;
  _type: "post";
  slug: SanitySlug;
  title: string;
  excerpt: string;
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
  publishedAt?: string;
  author?: PersonDocument;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
}

export interface ApplicationDocument {
  _id?: string;
  _type: "application";
  referenceId: string;
  name: string;
  email: string;
  currentRole: string;
  institution: string;
  researchInterests: string[];
  portfolioUrl?: string;
  cvUrl?: string;
  motivation: string;
  availability: string;
  submittedAt: string;
}
