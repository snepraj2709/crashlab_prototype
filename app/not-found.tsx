import Link from "next/link";

export default function NotFound(): React.ReactElement {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">404</p>
        <h1 className="mt-6 font-display text-5xl text-text-primary">This page is not in the archive.</h1>
        <p className="mt-6 text-text-secondary">
          The route may have moved, been unpublished, or never existed.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full border border-border px-5 py-3 text-text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
          href="/"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
