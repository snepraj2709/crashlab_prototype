"use client";

import { ErrorBoundary } from "react-error-boundary";

import { EmptyState } from "@/components/ui/EmptyState";

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackBody?: string;
}

export function SectionErrorBoundary({
  children,
  fallbackTitle = "Section unavailable",
  fallbackBody = "This section could not be loaded right now, but the rest of the page is still available."
}: SectionErrorBoundaryProps): React.ReactElement {
  return (
    <ErrorBoundary fallback={<EmptyState body={fallbackBody} title={fallbackTitle} />}>
      {children}
    </ErrorBoundary>
  );
}
