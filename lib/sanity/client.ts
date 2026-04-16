import { createClient } from "@sanity/client";
import * as Sentry from "@sentry/nextjs";
import type { QueryParams } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-03-01";

export const client = createClient({
  projectId: projectId || "demo-project",
  dataset,
  apiVersion,
  useCdn: true
});

export const writeClient = process.env.SANITY_API_TOKEN
  ? createClient({
      projectId: projectId || "demo-project",
      dataset,
      apiVersion,
      token: process.env.SANITY_API_TOKEN,
      useCdn: false
    })
  : null;

export async function safeFetch<T>(
  query: string,
  params?: QueryParams
): Promise<T | null> {
  if (!projectId) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (error) {
    console.error("[Sanity fetch error]", { query: query.slice(0, 80), error });
    Sentry.captureException(error);
    return null;
  }
}
