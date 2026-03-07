import type { QueryParams } from "@sanity/client";

import { client } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
};

export async function sanityFetch<T>({
  query,
  params = {}
}: SanityFetchOptions): Promise<{ data: T }> {
  const data = await client.fetch<T>(query, params);

  return { data };
}

export function SanityLive(): null {
  return null;
}
