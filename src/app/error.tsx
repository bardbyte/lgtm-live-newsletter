"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-6">
        LGTM
      </p>
      <h1 className="text-4xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 text-lg text-muted">
        An unexpected error occurred.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
      >
        Try again
      </button>
    </main>
  );
}
