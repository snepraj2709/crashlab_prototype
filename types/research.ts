export type ProjectStatus =
  | "active"
  | "published"
  | "completed"
  | "seeking-collaborators";

export type ProjectAudience = "researcher" | "industry" | "investor" | "all";

export type ProjectMetricType = "human" | "ai" | "gap";

export interface PortableTextSpan {
  _type: "span";
  text: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "blockquote";
  children: PortableTextSpan[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  type: ProjectMetricType;
}

export interface ImageAsset {
  url: string;
  alt: string;
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
