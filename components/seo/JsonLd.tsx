import type { JsonValue } from "@/types/json";

interface JsonLdProps {
  data: JsonValue;
}

export function JsonLd({ data }: JsonLdProps): React.ReactElement {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
