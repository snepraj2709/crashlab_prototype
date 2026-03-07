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
  position
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
export const allPeopleQuery = groq`*[_type == "person" && isActive == true] | order(isPrincipalInvestigator desc, position asc, name asc) { ${personFields} }`;
export const personBySlugQuery = groq`*[_type == "person" && slug.current == $slug][0] { ${personFields} }`;
export const allPostsQuery = groq`*[_type == "post"] | order(featured desc, publishedAt desc) { ${postFields} }`;
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] { ${postFields} }`;
