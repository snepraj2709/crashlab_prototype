interface EmptyStateProps {
  title: string;
  body: string;
}

export function EmptyState({ title, body }: EmptyStateProps): React.ReactElement {
  return (
    <div className="py-12 text-center">
      <h3 className="font-display text-2xl text-text-primary">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-text-secondary">{body}</p>
    </div>
  );
}
