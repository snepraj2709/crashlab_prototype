import type { ImageAsset, PortableTextBlock } from "@/types/content";

export interface SocialLinks {
  twitter?: string;
  googleScholar?: string;
  linkedin?: string;
  personalWebsite?: string;
  researchgate?: string;
}

export interface PersonSeed {
  slug: string;
  name: string;
  role: string;
  title: string;
  photo?: ImageAsset | null;
  shortBio: string;
  fullBio?: PortableTextBlock[];
  email?: string;
  credentials: string[];
  researchFocus: string[];
  socialLinks?: SocialLinks;
  isPrincipalInvestigator: boolean;
  isActive: boolean;
  joinedAt?: string;
  position: number;
  headline?: string[];
  originStory?: PortableTextBlock[];
  collaborations?: string[];
}

export interface TeamMemberProfile extends PersonSeed {
  id: string;
  affiliation?: string;
  tenure?: string;
  groupId?: string;
  groupLabel?: string;
  highlights?: TeamDirectoryHighlight[];
}

export type TeamDirectoryBadgeTone = "amber" | "blue" | "emerald" | "rose" | "slate";

export interface TeamDirectoryHighlight {
  label: string;
  tone?: TeamDirectoryBadgeTone;
}

export interface TeamDirectoryGroup {
  id: string;
  label: string;
  order: number;
}

export interface LabMemberVisualSeed {
  id: string;
  name: string;
  role: string;
  initials: string;
  image: string;
  isLead: boolean;
}

export interface TeamDirectoryMember {
  id: string;
  name: string;
  tenure: string;
  affiliation: string;
  groupId: string;
  isActive: boolean;
  position: number;
  projectSlugs: string[];
  highlights?: TeamDirectoryHighlight[];
}
