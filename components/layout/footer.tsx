import Link from "next/link";
import { Clapperboard, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2"><Clapperboard className="h-6 w-6 text-brand-500" /><span className="font-display text-xl tracking-wider text-white">CINE<span className="text-brand-500">DB</span></span></div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
            <Link href="/movies" className="hover:text-brand-400 transition-colors">Movies</Link>
            <Link href="/actors" className="hover:text-brand-400 transition-colors">Actors</Link>
            <Link href="/watchlist" className="hover:text-brand-400 transition-colors">Watchlist</Link>
          </nav>
          <div className="flex gap-4"><a href="#" aria-label="GitHub" className="text-zinc-400 hover:text-white transition-colors"><Github className="h-5 w-5" /></a><a href="#" aria-label="Twitter" className="text-zinc-400 hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a></div>
        </div>
        <p className="mt-6 text-center text-xs text-zinc-500">Data from TMDb & OMDb. This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </div>
    </footer>
  );
}
