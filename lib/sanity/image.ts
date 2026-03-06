import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource): string {
  try {
    return builder.image(source).width(1600).fit("max").url();
  } catch {
    return "/og/default.svg";
  }
}
