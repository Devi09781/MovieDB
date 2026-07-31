/*"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Trash2, Undo2, Loader2 } from "lucide-react";
import { useWatchlist } from "@/features/watchlist/watchlist-provider";
import { useMovie } from "@/hooks/use-movies";
import type { WatchlistItem } from "@/types";

export function WatchlistView() {
  const { items, remove, undoRemove, updateStatus, lastAction } = useWatchlist();
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-2 flex items-center gap-3 font-display text-4xl text-white sm:text-5xl"><Bookmark className="h-8 w-8 text-brand-500" />My Watchlist</motion.h1>
      <p className="mb-8 text-zinc-400">{items.length} {items.length === 1 ? "movie" : "movies"} saved</p>
      {lastAction && (<div className="mb-4 flex items-center justify-between rounded-lg border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-300"><span>{lastAction}</span><button onClick={undoRemove} className="inline-flex items-center gap-1.5 font-medium text-brand-400 hover:text-brand-300"><Undo2 className="h-3.5 w-3.5" />Undo</button></div>)}
      {items.length === 0 ? (
        <div className="rounded-xl border border-ink-700 bg-ink-800 p-12 text-center"><Bookmark className="mx-auto h-12 w-12 text-zinc-600" /><p className="mt-4 text-lg font-medium text-white">Your watchlist is empty</p><p className="mt-1 text-sm text-zinc-400">Browse movies and tap the + button to add them here.</p><Link href="/movies" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition-all hover:bg-brand-400 hover:shadow-glow">Browse Movies</Link></div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">{items.map((item) => <WatchlistCard key={item.id} item={item} onRemove={remove} onUpdateStatus={updateStatus} />)}</AnimatePresence>
        </div>
      )}
    </div>
  );
}

function WatchlistCard({ item, onRemove, onUpdateStatus }: { item: WatchlistItem; onRemove: (id: string) => Promise<void>; onUpdateStatus: (id: string, status: WatchlistItem["status"]) => Promise<void> }) {
  const { data: movie, isLoading } = useMovie(item.movieId);
  if (isLoading || !movie) return <div className="skeleton h-64 rounded-xl" />;
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }} className="group relative overflow-hidden rounded-xl border border-ink-700 bg-ink-800 shadow-card">
      <Link href={`/movie/${movie.id}`}><div className="relative aspect-video overflow-hidden"><Image src={movie.backdropUrl} alt={movie.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" /></div></Link>
      <div className="p-4">
        <Link href={`/movie/${movie.id}`}><h3 className="font-semibold text-white hover:text-brand-400 transition-colors">{movie.title}</h3></Link>
        <p className="text-xs text-zinc-400">{movie.year} · ★ {movie.rating.toFixed(1)}</p>
        <div className="mt-3 flex items-center gap-2">{(["planned", "watching", "watched"] as const).map((s) => <button key={s} onClick={() => onUpdateStatus(item.id, s)} className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${item.status === s ? "bg-brand-500 text-ink-950" : "bg-ink-700 text-zinc-400 hover:text-white"}`}>{s}</button>)}</div>
        <button onClick={() => onRemove(item.id)} aria-label="Remove from watchlist" className="mt-3 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" />Remove</button>
      </div>
    </motion.div>
  );
}
