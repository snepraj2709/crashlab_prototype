import announcementsSeed from "@/content/seed/announcements.json";
import blogSeed from "@/content/seed/blog.json";
import eventsSeed from "@/content/seed/events.json";
import {
  labMemberGroups,
  labMemberVisuals,
  labMembers,
} from "@/content/seed/labMembers";
import projectsSeed from "@/content/seed/projects.json";
import publicationsSeed from "@/content/seed/publications.json";
import teamSeed from "@/content/seed/team.json";
import trustSeed from "@/content/seed/trust.json";
import { safeFetch } from "@/lib/sanity/client";
import {
  activeAnnouncementQuery,
  allEventsQuery,
  allPeopleQuery,
  allPostsQuery,
  blogPostsQuery,
  newsPostsQuery,
  allProjectsQuery,
  postBySlugQuery,
  projectBySlugQuery,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import type {
  ProjectAudience,
  PublicationEntry,
  ProjectSeed,
} from "@/types/research";
import type { SitePost, SitePostAuthor, SitePostSeed } from "@/types/site";
import type {
  AllPeopleQueryResult,
  AllPostsQueryResult,
  AllProjectsQueryResult,
  PersonBySlugQueryResult,
  PostBySlugQueryResult,
  ProjectBySlugQueryResult,
} from "@/types/sanity";
import type {
  PersonSeed,
  TeamDirectoryGroup,
  TeamDirectoryMember,
  TeamMemberProfile,
} from "@/types/team";
import type { TrustSectionSeed } from "@/types/trust";

type SanityProject = NonNullable<ProjectBySlugQueryResult>;
type SanityPerson = NonNullable<PersonBySlugQueryResult>;
type SanityPost = NonNullable<PostBySlugQueryResult>;
type PortableTextSource =
  | SanityProject["body"]
  | SanityPerson["fullBio"]
  | SanityPost["body"];

function normalizePersonMatchKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(dr|mr|ms)\.?\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const seedPeople = teamSeed as PersonSeed[];
const seedPeopleBySlug = new Map(
  seedPeople.map((person) => [person.slug, person]),
);
const seedSlugByNameKey = new Map(
  seedPeople.map((person) => [
    normalizePersonMatchKey(person.name),
    person.slug,
  ]),
);
const personSlugAliasMap = new Map<string, string>([
  ["hakikat-bhatti", "hakikat-bir-singh-bhatti"],
  ["lakshmi-kaza", "lakshmi-vennela-chowdary-kaza"],
  ["siddharth-anthireddy", "siddharth-reddy-anthireddy"],
]);

const groupOrderMap = new Map(
  labMemberGroups.map((group) => [group.id, group.order]),
);
const groupLabelMap = new Map(
  labMemberGroups.map((group) => [group.id, group.label]),
);
const labMemberVisualMap = new Map(
  labMemberVisuals.map((member) => [member.id, member]),
);
const defaultPhotoUrls = new Set(["/og/default.svg"]);
const projectAudienceSet = new Set<ProjectAudience>([
  "researcher",
  "industry",
  "investor",
  "all",
]);

function normalizePortableText(
  blocks: PortableTextSource,
): ProjectSeed["body"] | undefined {
  if (!blocks?.length) {
    return undefined;
  }

  return blocks.flatMap((block) => {
    if (block._type !== "block") {
      return [];
    }

    return [
      {
        _key: block._key,
        _type: "block" as const,
        style:
          block.style === "h2" ||
          block.style === "h3" ||
          block.style === "blockquote"
            ? block.style
            : "normal",
        children: (block.children ?? []).map((child) => ({
          _type: "span" as const,
          text: child.text ?? "",
        })),
      },
    ];
  });
}

function normalizeProject(project: SanityProject): ProjectSeed {
  return {
    slug: project.slug?.current ?? "",
    title: project.title ?? "",
    problemStatement: project.problemStatement ?? "",
    summary: project.summary ?? "",
    body: normalizePortableText(project.body),
    status: project.status ?? "active",
    venue: project.venue ?? undefined,
    publishedAt: project.publishedAt ?? undefined,
    paperUrl: project.paperUrl ?? undefined,
    heroImage: project.heroImage
      ? {
          url: urlFor(project.heroImage),
          alt:
            project.problemStatement ??
            project.title ??
            "CRASH Lab research project",
        }
      : null,
    tags: project.tags ?? [],
    audience:
      project.audience?.filter((audience): audience is ProjectAudience =>
        projectAudienceSet.has(audience as ProjectAudience),
      ) ?? [],
    lead: project.lead?.slug?.current ?? undefined,
    team:
      project.team
        ?.map((member) => member.slug?.current)
        .filter((memberSlug): memberSlug is string => Boolean(memberSlug)) ??
      [],
    featured: Boolean(project.featured),
    seekingCollaborators: Boolean(project.seekingCollaborators),
    metrics: project.metrics?.map((metric) => ({
      label: metric.label ?? "",
      value: metric.value ?? "",
      type: metric.type ?? "human",
    })),
  };
}

function normalizePerson(person: AllPeopleQueryResult[number]): PersonSeed {
  return {
    slug: person.slug?.current ?? "",
    name: person.name ?? "",
    role: person.role ?? "",
    title: person.title ?? "",
    photo: person.photo
      ? {
          url: urlFor(person.photo),
          alt: `${person.name ?? "CRASH Lab team member"} portrait`,
        }
      : null,
    shortBio: person.shortBio ?? "",
    fullBio: normalizePortableText(person.fullBio),
    email: person.email ?? undefined,
    credentials: person.credentials ?? [],
    researchFocus: person.researchFocus ?? [],
    socialLinks: person.socialLinks ?? undefined,
    isPrincipalInvestigator: Boolean(person.isPrincipalInvestigator),
    isActive: Boolean(person.isActive),
    joinedAt: person.joinedAt ?? undefined,
    position: person.position ?? 999,
  };
}

function buildFallbackTeamBio(member: TeamDirectoryMember): string {
  const projectCount = member.projectSlugs.length;
  const affiliationSuffix = member.affiliation
    ? ` as ${member.affiliation}`
    : "";

  if (!projectCount) {
    return member.isActive
      ? `${member.name} contributes to CRASH Lab${affiliationSuffix}.`
      : `${member.name} contributed to CRASH Lab${affiliationSuffix}.`;
  }

  const projectLabel = `${projectCount} ${projectCount === 1 ? "project" : "projects"}`;
  const contributionWindow = member.isActive ? "current work" : "past work";

  return `${member.name} contributes to CRASH Lab${affiliationSuffix}, with ${contributionWindow} spanning ${projectLabel}.`;
}

function buildPhotoFromSeed(
  memberId: string,
  memberName: string,
): PersonSeed["photo"] {
  const visual = labMemberVisualMap.get(memberId);

  if (!visual) {
    return null;
  }

  return {
    url: visual.image,
    alt: `${memberName} portrait`,
  };
}

function resolvePreferredPhoto(
  personPhoto: PersonSeed["photo"] | undefined,
  memberId: string,
  memberName: string,
): PersonSeed["photo"] {
  const seedPhoto = buildPhotoFromSeed(memberId, memberName);

  if (seedPhoto?.url && seedPhoto.url !== "/team/person-placeholder.svg") {
    return seedPhoto;
  }

  if (personPhoto?.url && !defaultPhotoUrls.has(personPhoto.url)) {
    return personPhoto;
  }

  return seedPhoto ?? personPhoto ?? null;
}

function resolveCanonicalPersonSlug(slug: string, name: string): string {
  const aliasedSlug = personSlugAliasMap.get(slug);
  if (aliasedSlug && seedPeopleBySlug.has(aliasedSlug)) {
    return aliasedSlug;
  }

  if (seedPeopleBySlug.has(slug)) {
    return slug;
  }

  return seedSlugByNameKey.get(normalizePersonMatchKey(name)) ?? slug;
}

function buildSeedBackedPerson(
  seedPerson: PersonSeed,
  sanityPerson?: PersonSeed,
): PersonSeed {
  return {
    ...seedPerson,
    photo: resolvePreferredPhoto(
      sanityPerson?.photo ?? seedPerson.photo,
      seedPerson.slug,
      seedPerson.name,
    ),
    joinedAt: seedPerson.joinedAt ?? sanityPerson?.joinedAt,
  };
}

function buildMergedPeople(sanityPeople: PersonSeed[]): PersonSeed[] {
  const mergedPeople = new Map<string, PersonSeed>();

  for (const seedPerson of seedPeople) {
    mergedPeople.set(seedPerson.slug, buildSeedBackedPerson(seedPerson));
  }

  for (const sanityPerson of sanityPeople) {
    const canonicalSlug = resolveCanonicalPersonSlug(
      sanityPerson.slug,
      sanityPerson.name,
    );
    const seedPerson = seedPeopleBySlug.get(canonicalSlug);

    if (seedPerson) {
      mergedPeople.set(
        canonicalSlug,
        buildSeedBackedPerson(seedPerson, sanityPerson),
      );
      continue;
    }

    if (!mergedPeople.has(canonicalSlug)) {
      mergedPeople.set(canonicalSlug, sanityPerson);
    }
  }

  return [...mergedPeople.values()].sort((left, right) => {
    if (left.position !== right.position) {
      return left.position - right.position;
    }

    return left.name.localeCompare(right.name);
  });
}

function sortDirectoryMembers(
  left: TeamDirectoryMember,
  right: TeamDirectoryMember,
): number {
  if (left.groupId === right.groupId) {
    return left.position - right.position;
  }

  return (
    (groupOrderMap.get(left.groupId) ?? 999) -
    (groupOrderMap.get(right.groupId) ?? 999)
  );
}

function mergeTeamMemberProfile(
  member: TeamDirectoryMember,
  peopleBySlug: Map<string, PersonSeed>,
): TeamMemberProfile {
  const person = peopleBySlug.get(member.id);
  const visual = labMemberVisualMap.get(member.id);

  return {
    slug: member.id,
    id: member.id,
    name: person?.name ?? member.name,
    role: person?.role ?? visual?.role ?? member.affiliation,
    title: person?.title ?? "",
    photo: resolvePreferredPhoto(person?.photo, member.id, member.name),
    shortBio: person?.shortBio || "",
    fullBio: person?.fullBio,
    email: person?.email,
    credentials: person?.credentials ?? [],
    researchFocus: person?.researchFocus ?? [],
    socialLinks: person?.socialLinks,
    isPrincipalInvestigator:
      person?.isPrincipalInvestigator ?? Boolean(visual?.isLead),
    isActive: person?.isActive ?? member.isActive,
    joinedAt: person?.joinedAt,
    position: person?.position ?? member.position,
    headline: person?.headline,
    originStory: person?.originStory,
    collaborations: person?.collaborations,
    affiliation: member.affiliation,
    tenure: member.tenure,
    groupId: member.groupId,
    groupLabel: groupLabelMap.get(member.groupId),
    highlights: member.highlights,
  };
}

function mergePersonWithRosterFallback(person: PersonSeed): PersonSeed {
  const rosterMember = getLabMembers().find(
    (member) => member.id === person.slug,
  );

  if (!rosterMember) {
    return person;
  }

  return mergeTeamMemberProfile(rosterMember, new Map([[person.slug, person]]));
}

function normalizePostAuthor(
  author: SanityPost["author"],
): SitePostAuthor | undefined {
  if (!author) {
    return undefined;
  }

  return {
    _id: author._id,
    slug: author.slug?.current ?? "",
    name: author.name ?? "CRASH Lab",
    shortBio:
      author.shortBio ??
      "CRASH Lab is an interdisciplinary research group building responsible healthcare AI from Ashoka University.",
    photo: author.photo
      ? { url: urlFor(author.photo), alt: `${author.name ?? "Author"} photo` }
      : null,
    credentials: author.credentials ?? undefined,
    socialLinks: author.socialLinks ?? undefined,
  };
}

function normalizePost(post: SanityPost): SitePost {
  return {
    _id: post._id,
    _type: "post",
    slug: post.slug?.current ?? "",
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    body: normalizePortableText(post.body),
    coverImage: post.coverImage
      ? {
          url: urlFor(post.coverImage),
          alt: post.title ?? "CRASH Lab blog post",
        }
      : null,
    publishedAt: post.publishedAt ?? undefined,
    category: post.category ?? undefined,
    tags: post.tags ?? [],
    seoTitle: post.seoTitle ?? undefined,
    seoDescription: post.seoDescription ?? undefined,
    featured: Boolean(post.featured),
    author: normalizePostAuthor(post.author),
  };
}

function resolveAuthor(authorSlug: string | undefined): PersonSeed | undefined {
  if (!authorSlug) {
    return undefined;
  }

  return seedPeople.find((person) => person.slug === authorSlug);
}

export function getSeedProjects(): ProjectSeed[] {
  return projectsSeed as ProjectSeed[];
}

export function getSeedPeople(): PersonSeed[] {
  return seedPeople;
}

export function getLabMemberGroups(): TeamDirectoryGroup[] {
  return [...labMemberGroups].sort((left, right) => left.order - right.order);
}

export function getLabMembers(): TeamDirectoryMember[] {
  return [...labMembers].sort(sortDirectoryMembers);
}

export function getProjectLabMembers(
  projectSlug: string,
): TeamDirectoryMember[] {
  return getLabMembers().filter(
    (member) => member.isActive && member.projectSlugs.includes(projectSlug),
  );
}

export function getSeedPublications(): PublicationEntry[] {
  return publicationsSeed as PublicationEntry[];
}

export function getSeedPosts(): SitePost[] {
  return (blogSeed as SitePostSeed[]).map((post) => ({
    _id: post._id,
    _type: "post",
    slug: post.slug.current ?? "",
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    body: post.body,
    coverImage: post.coverImage ?? null,
    publishedAt: post.publishedAt,
    category: post.category,
    tags: post.tags ?? [],
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    featured: Boolean(post.featured),
    author: (() => {
      const author = resolveAuthor(post.authorSlug);

      if (!author || !post.authorSlug) {
        return undefined;
      }

      return {
        _id: `seed-${post.authorSlug}`,
        slug: post.authorSlug,
        name: author.name,
        shortBio: author.shortBio,
      };
    })(),
  }));
}

export function getTrustSection(): TrustSectionSeed {
  const data = trustSeed as TrustSectionSeed;

  return {
    ...data,
    logos: [...data.logos].sort(
      (left, right) => left.position - right.position,
    ),
    credentials: [...data.credentials].sort(
      (left, right) => left.position - right.position,
    ),
  };
}

export async function getProjects(): Promise<ProjectSeed[]> {
  const projects = await safeFetch<AllProjectsQueryResult>(allProjectsQuery);
  if (!projects?.length) {
    console.warn(
      "[CRASH Lab] Using seed project data because Sanity is unavailable.",
    );
    return getSeedProjects();
  }

  return projects.map(normalizeProject);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectSeed | null> {
  const project = await safeFetch<ProjectBySlugQueryResult>(
    projectBySlugQuery,
    { slug },
  );
  if (!project) {
    return getSeedProjects().find((entry) => entry.slug === slug) ?? null;
  }

  return normalizeProject(project);
}

export async function getPeople(): Promise<PersonSeed[]> {
  const sanityPeople = await safeFetch<AllPeopleQueryResult>(allPeopleQuery);
  if (!sanityPeople?.length) {
    console.warn(
      "[CRASH Lab] Using seed team data because Sanity is unavailable.",
    );
    return getSeedPeople();
  }

  return buildMergedPeople(sanityPeople.map(normalizePerson));
}

export async function getPersonBySlug(
  slug: string,
): Promise<PersonSeed | null> {
  const people = await getPeople();
  const person = people.find((entry) => entry.slug === slug);

  return person ? mergePersonWithRosterFallback(person) : null;
}

export async function getTeamProfiles(): Promise<TeamMemberProfile[]> {
  const people = await getPeople();
  const peopleBySlug = new Map(people.map((person) => [person.slug, person]));
  const usedSlugs = new Set<string>();
  const usedNames = new Set<string>();

  const rosterProfiles = getLabMembers().map((member) => {
    const profile = mergeTeamMemberProfile(member, peopleBySlug);

    usedSlugs.add(profile.slug);
    usedNames.add(normalizePersonMatchKey(profile.name));

    return profile;
  });

  const extraProfiles = people
    .filter(
      (person) =>
        !usedSlugs.has(person.slug) &&
        !usedNames.has(normalizePersonMatchKey(person.name)),
    )
    .map<TeamMemberProfile>((person) => ({
      ...person,
      id: person.slug,
      photo: resolvePreferredPhoto(person.photo, person.slug, person.name),
      groupId: person.isActive ? "active-profiles" : "archived-profiles",
      groupLabel: person.isActive ? "Active Profiles" : "Archived Profiles",
    }))
    .sort((left, right) => {
      if (left.isPrincipalInvestigator !== right.isPrincipalInvestigator) {
        return left.isPrincipalInvestigator ? -1 : 1;
      }

      if (left.position !== right.position) {
        return left.position - right.position;
      }

      return left.name.localeCompare(right.name);
    });

  return [...rosterProfiles, ...extraProfiles];
}

export async function getTeamProfileBySlug(
  slug: string,
): Promise<TeamMemberProfile | null> {
  const profiles = await getTeamProfiles();
  return profiles.find((profile) => profile.slug === slug) ?? null;
}

export async function getPosts(): Promise<SitePost[]> {
  const posts = await safeFetch<AllPostsQueryResult>(allPostsQuery);
  if (!posts?.length) {
    console.warn(
      "[CRASH Lab] Using seed blog data because Sanity is unavailable.",
    );
    return getSeedPosts();
  }

  return posts.map(normalizePost);
}

export async function getPostBySlug(slug: string): Promise<SitePost | null> {
  const post = await safeFetch<PostBySlugQueryResult>(postBySlugQuery, {
    slug,
  });
  if (!post) {
    return getSeedPosts().find((entry) => entry.slug === slug) ?? null;
  }

  return normalizePost(post);
}

export async function getFeaturedProject(): Promise<ProjectSeed | null> {
  const projects = await getProjects();
  return projects.find((project) => project.featured) ?? projects[0] ?? null;
}

export async function getRelatedProjects(
  currentSlug: string,
  tags: string[],
): Promise<ProjectSeed[]> {
  const projects = await getProjects();
  return projects
    .filter((project) => project.slug !== currentSlug)
    .map((project) => ({
      project,
      score: project.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ project }) => project);
}

export interface AnnouncementSeed {
  _id: string;
  message: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
  type?: "grant" | "paper" | "event" | "general" | null;
  isActive?: boolean;
}

export interface LabEvent {
  _id: string;
  title: string;
  date: string;
  location?: string | null;
  description?: string | null;
  eventUrl?: string | null;
  type?: "conference" | "seminar" | "workshop" | "lab-event" | null;
}

export async function getActiveAnnouncement(): Promise<AnnouncementSeed | null> {
  const result = await safeFetch<AnnouncementSeed | null>(
    activeAnnouncementQuery,
  );
  if (result) return result;
  const active = (announcementsSeed as AnnouncementSeed[]).find(
    (a) => a.isActive,
  );
  return active ?? null;
}

export async function getEvents(): Promise<LabEvent[]> {
  const result = await safeFetch<LabEvent[]>(allEventsQuery);
  if (result?.length) return result;
  return eventsSeed as LabEvent[];
}

export async function getNewsPosts(): Promise<SitePost[]> {
  const posts = await safeFetch<AllPostsQueryResult>(newsPostsQuery);
  if (!posts?.length) {
    return getSeedPosts().filter(
      (p) =>
        !("postType" in p) ||
        (p as SitePost & { postType?: string }).postType !== "blog",
    );
  }
  return posts.map(normalizePost);
}

export async function getBlogPosts(): Promise<SitePost[]> {
  const posts = await safeFetch<AllPostsQueryResult>(blogPostsQuery);
  if (!posts?.length) return [];
  return posts.map(normalizePost);
}
