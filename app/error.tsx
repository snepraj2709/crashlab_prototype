"use client";

import Link from "next/link";

export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Something went wrong</p>
            <h1 className="mt-6 font-display text-5xl text-text-primary">
              The page hit a problem, but the lab is still here.
            </h1>
            <p className="mt-6 text-text-secondary">
              Try reloading the page. If the issue persists, contact the team directly.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="rounded-full bg-accent-cyan px-5 py-3 font-medium text-[var(--color-text-inverse)]"
                onClick={reset}
                type="button"
              >
                Try again
              </button>
              <Link
                className="rounded-full border border-border px-5 py-3 text-text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
                href="mailto:suvrankar.datta@ashoka.edu.in"
              >
                Contact the lab
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
