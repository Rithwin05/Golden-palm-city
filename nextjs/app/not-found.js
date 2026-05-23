import Link from "next/link";

export const metadata = {
  title: "Page Not Found — Golden Palm City",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-bone gap-8 px-6 text-center">
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-sand" />
        <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
          404
        </span>
        <span className="h-px w-12 bg-sand" />
      </div>
      <h1 className="font-display text-5xl md:text-7xl text-ivory tracking-tight leading-[0.95]">
        Page not <span className="italic text-sand">found.</span>
      </h1>
      <p className="text-base text-bone/60 font-light max-w-md">
        The address you&apos;re looking for has not yet been composed. Let us
        guide you back.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-3 bg-sand text-ink px-8 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-ivory transition-colors duration-700"
      >
        Return Home →
      </Link>
    </div>
  );
}
