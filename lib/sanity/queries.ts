import groq from "groq";

export const projectFields = `
  _id,
  _type,
  slug,
  title,
  problemStatement,
  summary,
  body,
  status,
  venue,
  publishedAt,
  paperUrl,
  heroImage,
  tags,
  audience,
  featured,
  seekingCollaborators,
  metrics,
  lead->{
    _id,
    _type,
    slug,
    name,
    role,
    title,
    photo,
    shortBio,
    credentials,
    researchFocus,
    socialLinks,
    isPrincipalInvestigator,
    isActive,
    joinedAt,
    position
  },
  team[]->{
    _id,
    _type,
    slug,
    name,
    role,
    title,
    photo,
    shortBio,
    credentials,
    researchFocus,
    socialLinks,
    isPrincipalInvestigator,
    isActive,
    joinedAt,
    position
  }
`;

export const personFields = `
  _id,
  _type,
  slug,
  name,
  role,
  title,
  photo,
  shortBio,
  fullBio,
  email,
  credentials,
  researchFocus,
  socialLinks,
  isPrincipalInvestigator,
  isActive,
  joinedAt,
  position,
  alumniYear,
  currentInstitution
`;

export const postFields = `
  _id,
  _type,
  slug,
  title,
  excerpt,
  body,
  coverImage,
  publishedAt,
  category,
  tags,
  seoTitle,
  seoDescription,
  featured,
  author->{
    _id,
    _type,
    slug,
    name,
    role,
    title,
    photo,
    shortBio,
    credentials,
    researchFocus,
    socialLinks,
    isPrincipalInvestigator,
    isActive,
    joinedAt,
    position
  }
`;

export const allProjectsQuery = groq`*[_type == "research"] | order(featured desc, publishedAt desc, title asc) { ${projectFields} }`;
export const projectBySlugQuery = groq`*[_type == "research" && slug.current == $slug][0] { ${projectFields} }`;
export const allPeopleQuery = groq`*[_type == "person"] | order(isActive desc, isPrincipalInvestigator desc, position asc, name asc) { ${personFields} }`;
export const personBySlugQuery = groq`*[_type == "person" && slug.current == $slug][0] {
  ${personFields},
  "authoredPosts": *[_type == "post" && references(^._id)] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    category,
    postType
  }[0..4]
}`;
export const allPostsQuery = groq`*[_type == "post"] | order(featured desc, publishedAt desc) { ${postFields}, postType }`;
export const newsPostsQuery = groq`*[_type == "post" && (postType == "news" || !defined(postType))] | order(featured desc, publishedAt desc) { ${postFields}, postType }`;
export const blogPostsQuery = groq`*[_type == "post" && postType == "blog"] | order(featured desc, publishedAt desc) { ${postFields}, postType }`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] { ${postFields}, postType }`;
export const activeAnnouncementQuery = groq`*[_type == "announcement" && isActive == true] | order(_createdAt desc)[0] { _id, message, ctaText, ctaUrl, type }`;
export const allEventsQuery = groq`*[_type == "event"] | order(date asc) { _id, title, date, location, description, eventUrl, type }`;
