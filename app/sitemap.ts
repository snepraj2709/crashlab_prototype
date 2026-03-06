import type { MetadataRoute } from "next";

import { getPeople, getPosts, getProjects } from "@/lib/content/site";

const baseUrl = "https://crashlab.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, people, posts] = await Promise.all([getProjects(), getPeople(), getPosts()]);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/research`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/people`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/join`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/partners`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/impact`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.7 }
  ];

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/research/${project.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const peopleEntries = people.map((person) => ({
    url: `${baseUrl}/people/${person.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    changeFrequency: "daily" as const,
    priority: 0.7
  }));

  return [...staticEntries, ...projectEntries, ...peopleEntries, ...postEntries];
}
