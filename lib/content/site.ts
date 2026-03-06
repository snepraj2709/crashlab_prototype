import blogSeed from "@/content/seed/blog.json";
import projectsSeed from "@/content/seed/projects.json";
import publicationsSeed from "@/content/seed/publications.json";
import teamSeed from "@/content/seed/team.json";
import { safeFetch } from "@/lib/sanity/client";
import {
  allPeopleQuery,
  allPostsQuery,
  allProjectsQuery,
  personBySlugQuery,
  postBySlugQuery,
  projectBySlugQuery
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type { PublicationEntry, ProjectSeed } from "@/types/research";
import type { PersonDocument, PostDocument, ResearchDocument } from "@/types/sanity";
import type { PersonSeed } from "@/types/team";

function normalizeProject(project: ResearchDocument): ProjectSeed {
  return {
    slug: project.slug.current,
    title: project.title,
    problemStatement: project.problemStatement,
    summary: project.summary,
    body: project.body,
    status: project.status,
    venue: project.venue,
    publishedAt: project.publishedAt,
    paperUrl: project.paperUrl,
    heroImage: project.heroImage
      ? {
          url: urlFor(project.heroImage),
          alt: project.problemStatement
        }
      : null,
    tags: project.tags,
    audience: project.audience,
    lead: project.lead?.slug.current,
    team: project.team?.map((member) => member.slug.current),
    featured: Boolean(project.featured),
    seekingCollaborators: Boolean(project.seekingCollaborators),
    metrics: project.metrics
  };
}

function normalizePerson(person: PersonDocument): PersonSeed {
  return {
    slug: person.slug.current,
    name: person.name,
    role: person.role,
    title: person.title,
    photo: person.photo
      ? {
          url: urlFor(person.photo),
          alt: `${person.name} portrait`
        }
      : null,
    shortBio: person.shortBio,
    fullBio: person.fullBio,
    email: person.email,
    credentials: person.credentials ?? [],
    researchFocus: person.researchFocus ?? [],
    socialLinks: person.socialLinks,
    isPrincipalInvestigator: Boolean(person.isPrincipalInvestigator),
    isActive: Boolean(person.isActive),
    joinedAt: person.joinedAt,
    position: person.position ?? 999
  };
}

function resolveAuthor(authorSlug: string | undefined): PersonSeed | undefined {
  if (!authorSlug) {
    return undefined;
  }

  return (teamSeed as PersonSeed[]).find((person) => person.slug === authorSlug);
}

export function getSeedProjects(): ProjectSeed[] {
  return projectsSeed as ProjectSeed[];
}

export function getSeedPeople(): PersonSeed[] {
  return teamSeed as PersonSeed[];
}

export function getSeedPublications(): PublicationEntry[] {
  return publicationsSeed as PublicationEntry[];
}

export function getSeedPosts(): PostDocument[] {
  return (blogSeed as Array<
    Omit<PostDocument, "author"> & {
      authorSlug?: string;
      coverImage?: { url: string; alt: string };
    }
  >).map((post) => ({
    ...post,
    author: resolveAuthor(post.authorSlug)
      ? {
          _id: `seed-${post.authorSlug}`,
          _type: "person",
          slug: { current: post.authorSlug ?? "" },
          name: resolveAuthor(post.authorSlug)?.name ?? "CRASH Lab",
          role: resolveAuthor(post.authorSlug)?.role ?? "Author",
          title: resolveAuthor(post.authorSlug)?.title ?? "Dr.",
          photo: undefined,
          shortBio: resolveAuthor(post.authorSlug)?.shortBio ?? "",
          credentials: resolveAuthor(post.authorSlug)?.credentials,
          researchFocus: resolveAuthor(post.authorSlug)?.researchFocus,
          socialLinks: resolveAuthor(post.authorSlug)?.socialLinks,
          isPrincipalInvestigator: resolveAuthor(post.authorSlug)?.isPrincipalInvestigator,
          isActive: true,
          joinedAt: resolveAuthor(post.authorSlug)?.joinedAt,
          position: resolveAuthor(post.authorSlug)?.position
        }
      : undefined,
    coverImage: post.coverImage
      ? {
          asset: {
            _ref: post.coverImage.url,
            _type: "reference"
          },
          alt: post.coverImage.alt
        }
      : undefined
  })) as PostDocument[];
}

export async function getProjects(): Promise<ProjectSeed[]> {
  const projects = await safeFetch<ResearchDocument[]>(allProjectsQuery);
  if (!projects?.length) {
    console.warn("[CRASH Lab] Using seed project data because Sanity is unavailable.");
    return getSeedProjects();
  }

  return projects.map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<ProjectSeed | null> {
  const project = await safeFetch<ResearchDocument>(projectBySlugQuery, { slug });
  if (!project) {
    return getSeedProjects().find((entry) => entry.slug === slug) ?? null;
  }

  return normalizeProject(project);
}

export async function getPeople(): Promise<PersonSeed[]> {
  const people = await safeFetch<PersonDocument[]>(allPeopleQuery);
  if (!people?.length) {
    console.warn("[CRASH Lab] Using seed team data because Sanity is unavailable.");
    return getSeedPeople();
  }

  return people.map(normalizePerson);
}

export async function getPersonBySlug(slug: string): Promise<PersonSeed | null> {
  const person = await safeFetch<PersonDocument>(personBySlugQuery, { slug });
  if (!person) {
    return getSeedPeople().find((entry) => entry.slug === slug) ?? null;
  }

  const seedPerson = getSeedPeople().find((entry) => entry.slug === slug);

  return {
    ...seedPerson,
    ...normalizePerson(person)
  };
}

export async function getPosts(): Promise<PostDocument[]> {
  const posts = await safeFetch<PostDocument[]>(allPostsQuery);
  if (!posts?.length) {
    console.warn("[CRASH Lab] Using seed blog data because Sanity is unavailable.");
    return getSeedPosts();
  }

  return posts;
}

export async function getPostBySlug(slug: string): Promise<PostDocument | null> {
  const post = await safeFetch<PostDocument>(postBySlugQuery, { slug });
  if (!post) {
    return getSeedPosts().find((entry) => entry.slug.current === slug) ?? null;
  }

  return post;
}

export async function getFeaturedProject(): Promise<ProjectSeed | null> {
  const projects = await getProjects();
  return projects.find((project) => project.featured) ?? projects[0] ?? null;
}

export async function getRelatedProjects(currentSlug: string, tags: string[]): Promise<ProjectSeed[]> {
  const projects = await getProjects();
  return projects
    .filter((project) => project.slug !== currentSlug)
    .map((project) => ({
      project,
      score: project.tags.filter((tag) => tags.includes(tag)).length
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ project }) => project);
}
