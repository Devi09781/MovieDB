"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertCircle className="h-16 w-16 text-red-500" />
      <h1 className="mt-4 font-display text-3xl text-white">Something went wrong</h1>
      <p className="mt-2 max-w-md text-zinc-400">An unexpected error occurred while loading this page.</p>
      <button onClick={reset} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition-all hover:bg-brand-400 hover:shadow-glow"><RotateCcw className="h-5 w-5" />Try again</button>
    </div>
  );
}
