import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <Clapperboard className="h-20 w-20 text-brand-500" />
      <h1 className="mt-6 font-display text-6xl text-white">404</h1>
      <p className="mt-2 text-lg text-zinc-400">This scene didn&apos;t make the final cut.</p>
      <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition-all hover:bg-brand-400 hover:shadow-glow">Back to home</Link>
    </div>
  );
}
