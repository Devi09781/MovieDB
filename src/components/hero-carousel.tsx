import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "@/types";
import { ratingColor } from "@/lib/utils";
import SmartImage from "./smart-image";

export default function HeroCarousel({ movies }: { movies: Movie[] }) {
  const [index, setIndex] = useState(0);
  const featured = movies.slice(0, 5);
  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % featured.length), 6000);
    return () => clearInterval(timer);
  }, [featured.length]);
  if (featured.length === 0) return null;
  const movie = featured[index];
  return (
    <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={movie.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
          <SmartImage src={movie.backdrop_url} alt={movie.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="container-page relative flex h-full items-end pb-12">
        <motion.div key={`text-${movie.id}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-xl">
          <div className="mb-3 flex items-center gap-2">
            <span className="chip border-brand-500/40 text-brand-400">Featured</span>
            <span className={`flex items-center gap-1 text-sm font-bold ${ratingColor(Number(movie.rating))}`}><Star className="h-4 w-4 fill-current" />{Number(movie.rating).toFixed(1)}</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white sm:text-5xl">{movie.title}</h1>
          <p className="mt-2 text-sm text-ink-300">{movie.year} · {movie.genres.join(", ")}</p>
          <p className="mt-4 line-clamp-3 text-sm text-ink-200 sm:text-base">{movie.overview}</p>
          <div className="mt-6 flex gap-3">
            <Link to={`/movie/${movie.id}`} className="btn-primary"><Play className="h-4 w-4 fill-current" />View Details</Link>
            <Link to="/movies" className="btn-outline">Browse All</Link>
          </div>
        </motion.div>
      </div>
      <div className="container-page absolute bottom-6 left-0 right-0 hidden gap-2 sm:flex">
        {featured.map((m, i) => <button key={m.id} onClick={() => setIndex(i)} className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-brand-500" : "w-4 bg-ink-600"}`} />)}
      </div>
    </div>
  );
}
