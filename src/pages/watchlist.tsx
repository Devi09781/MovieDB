import { Link } from "react-router-dom";
import { Bookmark, Trash2, Film } from "lucide-react";
import { useWatchlist, useMovies, useRemoveFromWatchlist, useUpdateWatchlistStatus } from "@/hooks/use-data";

const STATUSES = ["planning", "watching", "completed"] as const;

export default function WatchlistPage() {
  const { data: watchlist, isLoading } = useWatchlist();
  const { data: movies } = useMovies();
  const removeMutation = useRemoveFromWatchlist();
  const updateMutation = useUpdateWatchlistStatus();
  const items = (watchlist ?? []).map((w) => ({ item: w, movie: movies?.find((m) => m.id === w.movie_id) })).filter((x) => x.movie);

  return (
    <div className="container-page space-y-8 py-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">My Watchlist</h1>
        <p className="mt-2 text-ink-400">Movies you want to watch, are watching, or have completed.</p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-ink-800" />)}</div>
      ) : items.length === 0 ? (
        <div className="card flex flex-col items-center gap-4 p-12 text-center">
          <Bookmark className="h-12 w-12 text-ink-500" />
          <div><p className="font-semibold text-white">Your watchlist is empty</p><p className="text-sm text-ink-400">Add movies from their detail pages.</p></div>
          <Link to="/movies" className="btn-primary"><Film className="h-4 w-4" />Browse Movies</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(({ item, movie }) => (
            <div key={item.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <Link to={`/movie/${movie!.id}`} className="flex shrink-0 gap-4"><img src={movie!.poster_url} alt={movie!.title} className="h-28 w-20 rounded-lg border border-ink-700/60 object-cover" /></Link>
              <div className="flex-1">
                <Link to={`/movie/${movie!.id}`}><h3 className="font-semibold text-white hover:text-brand-400 transition">{movie!.title}</h3></Link>
                <p className="text-sm text-ink-400">{movie!.year} · {movie!.genres.join(", ")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STATUSES.map((s) => <button key={s} onClick={() => updateMutation.mutate({ id: item.id, status: s })} className={`chip capitalize transition ${item.status === s ? "border-brand-500 text-brand-400" : "hover:border-brand-500 hover:text-brand-400"}`}>{s}</button>)}
                </div>
              </div>
              <button onClick={() => removeMutation.mutate(item.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 text-ink-300 hover:border-error-500 hover:text-error-400 transition" aria-label="Remove from watchlist"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
