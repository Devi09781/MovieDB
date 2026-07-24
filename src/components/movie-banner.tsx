import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Movie } from "@/types";
import { formatRuntime, ratingColor } from "@/lib/utils";
import SmartImage from "./smart-image";

export default function MovieBanner({ movie }: { movie: Movie }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 h-[50vh] min-h-[320px] w-full">
        <SmartImage src={movie.backdrop_url} alt={movie.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
      </div>
      <div className="container-page relative pt-32 sm:pt-40">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <Link to={`/movie/${movie.id}`}><SmartImage src={movie.poster_url} alt={movie.title} className="h-48 w-32 rounded-xl border border-ink-700/60 object-cover shadow-2xl sm:h-64 sm:w-44" fallbackText={movie.title.slice(0, 2).toUpperCase()} /></Link>
          <div className="flex-1 pb-4">
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{movie.title}</h1>
            {movie.original_title && movie.original_title !== movie.title && <p className="mt-1 text-sm text-ink-300">{movie.original_title}</p>}
            {movie.tagline && <p className="mt-2 text-sm italic text-ink-300">"{movie.tagline}"</p>}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-200">
              <span className={`flex items-center gap-1 font-bold ${ratingColor(Number(movie.rating))}`}><Star className="h-4 w-4 fill-current" />{Number(movie.rating).toFixed(1)}</span>
              <span className="text-ink-500">·</span><span>{movie.year}</span>
              <span className="text-ink-500">·</span><span>{formatRuntime(movie.runtime)}</span>
              <span className="text-ink-500">·</span><span>{movie.industry}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {movie.genres.map((g) => <Link key={g} to={`/movies?genre=${encodeURIComponent(g)}`} className="chip hover:border-brand-500 hover:text-brand-400 transition">{g}</Link>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
