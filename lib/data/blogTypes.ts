export interface Author {
  name: string;
  initials: string;
  role?: string;
}

export interface ContentSection {
  type: 'text' | 'heading' | 'list' | 'table' | 'callout' | 'image';
  content: string | string[] | TableData | CalloutData;
  heading?: string;
}

export interface TableData {
  headers: string[];
  rows: Array<{
    cells: string[];
    highlight?: boolean;
    highlightColor?: string;
  }>;
}

export interface CalloutData {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  readTime: string;
  author: Author;
  authors?: Author[];
  featuredImage?: string;
  imageAlt?: string;
  imageOverlay?: {
    badge?: string;
    stat?: {
      label: string;
      value: string;
      sublabel: string;
    };
  };
  tldr?: string;
  content: ContentSection[];
  link?: string;
  venue?: string;
  description?: string;
}
