import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-muted-dark uppercase mb-6">
        LGTM
      </p>
      <h1 className="text-5xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
      >
        Back to home
      </Link>
    </main>
  );
}
