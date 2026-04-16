import type { ImageAsset, PortableTextBlock } from "@/types/content";

export type ProjectStatus =
  | "active"
  | "published"
  | "completed"
  | "seeking-collaborators";

export type ProjectAudience = "researcher" | "industry" | "investor" | "all";

export type ProjectMetricType = "human" | "ai" | "gap";

export type PaperStatus = "preprint" | "coming-soon" | "published";

export interface ProjectMetric {
  label: string;
  value: string;
  type: ProjectMetricType;
}

export interface ProjectSeed {
  slug: string;
  title: string;
  problemStatement: string;
  summary: string;
  body?: PortableTextBlock[];
  status: ProjectStatus;
  venue?: string;
  publishedAt?: string;
  paperUrl?: string;
  paperStatus?: PaperStatus;
  heroImage?: ImageAsset | null;
  tags: string[];
  audience: ProjectAudience[];
  lead?: string;
  team?: string[];
  featured: boolean;
  seekingCollaborators: boolean;
  metrics?: ProjectMetric[];
}

export interface PublicationEntry {
  id: string;
  title: string;
  venue: string;
  year: number;
  type: "paper" | "abstract" | "talk" | "benchmark";
  link?: string;
  authors: string[];
  summary: string;
  tags: string[];
}
