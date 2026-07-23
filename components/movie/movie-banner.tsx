"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Plus, Check, Star, Clock, Calendar, Globe } from "lucide-react";
import type { Movie } from "@/types";
import { useWatchlist } from "@/features/watchlist/watchlist-provider";
import { formatRuntime, formatDate } from "@/lib/format";

export function MovieBanner({ movie }: { movie: Movie }) {
  const { isInWatchlist, add } = useWatchlist();
  const inList = isInWatchlist(movie.id);
  return (
    <div className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh]">
      <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
        <Image src={movie.backdropUrl} alt={movie.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 to-transparent" />
      </motion.div>
      <div className="relative z-10 flex h-full items-end pb-8">
        <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden w-40 flex-shrink-0 sm:block">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-card"><Image src={movie.posterUrl} alt={movie.title} fill sizes="160px" className="object-cover" /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex-1">
            <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">{movie.title}</h1>
            {movie.tagline && <p className="mt-2 text-sm italic text-brand-400">&quot;{movie.tagline}&quot;</p>}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
              <span className="flex items-center gap-1 font-semibold text-brand-400"><Star className="h-4 w-4 fill-current" />{movie.rating.toFixed(1)}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(movie.releaseDate)}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{formatRuntime(movie.runtime)}</span>
              <span className="flex items-center gap-1"><Globe className="h-4 w-4" />{movie.industry}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">{movie.genres.map((g) => <span key={g} className="rounded-full border border-ink-600 px-3 py-0.5 text-xs text-zinc-300">{g}</span>)}</div>
            <p className="mt-4 max-w-2xl text-sm text-zinc-200 sm:text-base">{movie.overview}</p>
            <div className="mt-6 flex gap-3">
              {movie.trailerUrl && <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition-all hover:bg-brand-400 hover:shadow-glow"><Play className="h-5 w-5 fill-current" />Play Trailer</a>}
              <button onClick={() => !inList && add(movie.id)} disabled={inList} className="inline-flex items-center gap-2 rounded-lg glass px-6 py-3 font-semibold text-white transition-all hover:bg-ink-700 disabled:opacity-60">{inList ? <Check className="h-5 w-5 text-accent-green" /> : <Plus className="h-5 w-5" />}{inList ? "In Watchlist" : "Add to Watchlist"}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
