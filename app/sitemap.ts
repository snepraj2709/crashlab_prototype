import type { MetadataRoute } from "next";

import { getPosts, getProjects, getTeamProfiles } from "@/lib/content/site";

const baseUrl = "https://crashlab.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, people, posts] = await Promise.all([
    getProjects(),
    getTeamProfiles(),
    getPosts()
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/research`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/publications`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/people`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/collaborate`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/join`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/news`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: "weekly", priority: 0.7 }
  ];

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/research/${project.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const peopleEntries = people.map((person) => ({
    url: `${baseUrl}/people/${person.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.7
  }));

  return [...staticEntries, ...projectEntries, ...peopleEntries, ...postEntries];
}
