import { Link } from "react-router-dom";
import { Star, Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Movie } from "@/types";
import { ratingColor } from "@/lib/utils";
import SmartImage from "./smart-image";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group">
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-ink-700/60 bg-ink-800">
          <SmartImage src={movie.poster_url} alt={movie.title} className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105" fallbackText={movie.title.slice(0, 2).toUpperCase()} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-ink-950/80 px-2 py-1 backdrop-blur">
            <Star className={`h-3.5 w-3.5 fill-current ${ratingColor(Number(movie.rating))}`} />
            <span className={`text-xs font-bold ${ratingColor(Number(movie.rating))}`}>{Number(movie.rating).toFixed(1)}</span>
          </div>
          {movie.trailer_url && (
            <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/90 opacity-0 transition group-hover:opacity-100">
              <Play className="h-4 w-4 fill-current text-ink-950" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-xs text-ink-300">{movie.year}</p>
            <h3 className="truncate text-sm font-semibold text-white">{movie.title}</h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
