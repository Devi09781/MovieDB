import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Plus, Check } from "lucide-react";
import type { Movie } from "@/types";
import { useWatchlist } from "@/hooks/use-data";

export function MovieCard({ movie, index = 0 }: { movie: Movie; index?: number }) {
  const { isInWatchlist, add } = useWatchlist();
  const inList = isInWatchlist(movie.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }} whileHover={{ y: -8, scale: 1.03 }} className="group relative w-[160px] flex-shrink-0 sm:w-[200px]">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-ink-800 shadow-card">
          <img src={movie.poster_url} alt={movie.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute left-2 top-2"><span className="inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-brand-400 backdrop-blur"><Star className="h-3 w-3 fill-current" />{Number(movie.rating).toFixed(1)}</span></div>
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-opacity group-hover:opacity-100"><p className="line-clamp-2 text-xs text-white/80">{movie.overview}</p></div>
        </div>
      </Link>
      <div className="mt-2"><Link to={`/movie/${movie.id}`}><h3 className="line-clamp-1 text-sm font-semibold text-white hover:text-brand-400 transition-colors">{movie.title}</h3></Link><p className="text-xs text-zinc-400">{movie.year}</p></div>
      <button onClick={(e) => { e.preventDefault(); if (!inList) add(movie.id); }} disabled={inList} aria-label={inList ? "In watchlist" : "Add to watchlist"} className="absolute right-2 top-2 z-10 rounded-full bg-brand-500 p-2 text-ink-950 opacity-0 shadow-glow transition-all hover:scale-110 group-hover:opacity-100 disabled:opacity-60">{inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}</button>
    </motion.div>
  );
}
