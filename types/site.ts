import type { ImageAsset, PortableTextBlock } from "@/types/content";

export type SitePostCategory =
  | "benchmark-update"
  | "research-paper"
  | "industry-insight"
  | "lab-news"
  | "policy";

export interface SitePostAuthor {
  _id: string;
  slug: string;
  name: string;
  shortBio: string;
}

export interface SitePost {
  _id: string;
  _type: "post";
  slug: string;
  title: string;
  excerpt: string;
  body?: PortableTextBlock[];
  coverImage?: ImageAsset | null;
  publishedAt?: string;
  category?: SitePostCategory;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  author?: SitePostAuthor;
}

export interface SitePostSeed {
  _id: string;
  _type: "post";
  slug: {
    current?: string;
  };
  title?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  coverImage?: ImageAsset | null;
  publishedAt?: string;
  category?: SitePostCategory;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  authorSlug?: string;
}
