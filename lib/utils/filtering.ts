import type { SitePost } from "@/lib/content/site";
import type { ProjectSeed, ProjectStatus } from "@/types/research";

export function fuzzyIncludes(haystack: string, needle: string): boolean {
  return haystack.toLowerCase().includes(needle.toLowerCase().trim());
}

export function filterProjects(
  projects: ProjectSeed[],
  filters: {
    query?: string;
    tags?: string[];
    status?: "all" | ProjectStatus | "seeking";
  }
): ProjectSeed[] {
  return projects.filter((project) => {
    const matchesQuery = !filters.query
      ? true
      : fuzzyIncludes(
          `${project.title} ${project.problemStatement} ${project.summary} ${project.tags.join(" ")}`,
          filters.query
        );

    const matchesTags =
      !filters.tags?.length || filters.tags.every((tag) => project.tags.includes(tag));

    const matchesStatus =
      !filters.status || filters.status === "all"
        ? true
        : filters.status === "seeking"
          ? project.seekingCollaborators
          : project.status === filters.status;

    return matchesQuery && matchesTags && matchesStatus;
  });
}

export function filterPosts(posts: SitePost[], category?: string): SitePost[] {
  if (!category || category === "all") {
    return posts;
  }

  return posts.filter((post) => post.category === category);
}
