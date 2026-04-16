import { Card } from "@/components/ui/Card";

interface EmptyStateProps {
  title: string;
  body: string;
}

export function EmptyState({ title, body }: EmptyStateProps): React.ReactElement {
  return (
    <Card className="border-dashed border-border-default text-center">
      <h3 className="font-display text-2xl text-text-default">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-text-muted">{body}</p>
    </Card>
  );
}
