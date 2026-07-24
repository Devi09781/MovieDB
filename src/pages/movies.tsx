import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search, Filter, TrendingUp, Flame, Award, Clock, Star, Film } from "lucide-react";
import MovieCard from "@/components/movie-card";
import { useMovies, useGenres, useSearch, useTrending, usePopular, useTopRated, useLatest, useBollywood, useTollywood, useHollywood } from "@/hooks/use-data";
import type { Movie } from "@/types";

const CATEGORIES = [
  { key: "", label: "All", icon: Film },
  { key: "trending", label: "Trending", icon: TrendingUp },
  { key: "popular", label: "Popular", icon: Flame },
  { key: "top-rated", label: "Top Rated", icon: Award },
  { key: "latest", label: "Latest", icon: Clock },
  { key: "bollywood", label: "Bollywood", icon: Film },
  { key: "tollywood", label: "Tollywood", icon: Film },
  { key: "hollywood", label: "Hollywood", icon: Star },
];

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const queryParam = params.get("q") ?? "";
  const genreParam = params.get("genre") ?? "";
  const categoryParam = params.get("category") ?? "";
  const [searchInput, setSearchInput] = useState(queryParam);

  const { data: allMovies, isLoading } = useMovies();
  const { data: genres } = useGenres();
  const { data: searchResults, isLoading: searchLoading } = useSearch(queryParam);
  const { data: trending } = useTrending();
  const { data: popular } = usePopular();
  const { data: topRated } = useTopRated();
  const { data: latest } = useLatest();
  const { data: bollywood } = useBollywood();
  const { data: tollywood } = useTollywood();
  const { data: hollywood } = useHollywood();

  const categoryMovies: Record<string, Movie[] | undefined> = {
    trending,
    popular,
    "top-rated": topRated,
    latest,
    bollywood,
    tollywood,
    hollywood,
  };

  const filtered = useMemo(() => {
    let list: Movie[] = allMovies ?? [];
    if (queryParam.trim()) {
      list = searchResults ?? [];
    } else if (categoryParam && categoryMovies[categoryParam]) {
      list = categoryMovies[categoryParam]!;
    }
    if (genreParam) list = list.filter((m) => (m.genres ?? []).includes(genreParam));
    return list;
  }, [allMovies, searchResults, queryParam, categoryParam, genreParam, trending, popular, topRated, latest, bollywood, tollywood, hollywood]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (searchInput.trim()) next.set("q", searchInput.trim()); else next.delete("q");
    next.delete("category");
    setParams(next);
  }
  function setCategory(cat: string) {
    const next = new URLSearchParams(params);
    if (cat) next.set("category", cat); else next.delete("category");
    next.delete("q");
    setSearchInput("");
    setParams(next);
  }
  function setGenre(g: string) {
    const next = new URLSearchParams(params);
    if (g) next.set("genre", g); else next.delete("genre");
    setParams(next);
  }

  const loading = isLoading || (!!queryParam.trim() && searchLoading);
  const activeLabel = CATEGORIES.find((c) => c.key === categoryParam)?.label ?? "All";
  const heading = queryParam.trim() ? `Search: "${queryParam}"` : categoryParam ? activeLabel : "All Movies";

  return (
    <div className="container-page space-y-8 py-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{heading}</h1>
        <p className="mt-2 text-ink-400">Discover and explore our movie collection.</p>
      </div>

      <form onSubmit={handleSearch} className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search movies..." className="w-full rounded-xl border border-ink-600 bg-ink-900/70 py-3 pl-12 pr-4 text-sm text-ink-100 placeholder-ink-400 focus:border-brand-500 focus:outline-none" />
      </form>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-ink-400"><Filter className="h-4 w-4" />Category</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <button key={c.key} onClick={() => setCategory(c.key)} className={`chip transition ${categoryParam === c.key ? "border-brand-500 bg-brand-500/15 text-brand-400" : "hover:border-brand-500 hover:text-brand-400"}`}>
                <Icon className="h-3.5 w-3.5" />{c.label}
              </button>
            );
          })}
        </div>
      </div>

      {genres && genres.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-ink-400"><Filter className="h-4 w-4" />Genre</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setGenre("")} className={`chip transition ${!genreParam ? "border-brand-500 text-brand-400" : "hover:border-brand-500 hover:text-brand-400"}`}>All</button>
            {genres.map((g) => <button key={g.id} onClick={() => setGenre(g.name)} className={`chip transition ${genreParam === g.name ? "border-brand-500 text-brand-400" : "hover:border-brand-500 hover:text-brand-400"}`}>{g.name}</button>)}
          </div>
        </div>
      )}

      <div>
        <p className="mb-4 text-sm text-ink-400">{loading ? "Loading..." : `${filtered.length} movie${filtered.length !== 1 ? "s" : ""}`}{queryParam && ` for "${queryParam}"`}{genreParam && ` in ${genreParam}`}</p>
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-ink-800" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card p-12 text-center text-ink-400">No movies found. Try a different search, category, or genre.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>
        )}
      </div>
    </div>
  );
}
