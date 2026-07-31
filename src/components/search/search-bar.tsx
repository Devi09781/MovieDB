/*import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp } from "lucide-react";
import { useSearch } from "@/hooks/use-data";
import { trendingSearches } from "@/lib/repository";
import { Link } from "react-router-dom";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { data: results = [] } = useSearch(query);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); inputRef.current?.focus(); }
      if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navigateTo = (path: string) => { setOpen(false); setQuery(""); navigate(path); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    const max = Math.min(results.length, 6) - 1;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, max)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) { e.preventDefault(); navigateTo(`/movie/${results[activeIndex].id}`); }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input ref={inputRef} type="text" value={query} onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)} onKeyDown={onKeyDown} placeholder="Search movies, actors, genres..." aria-label="Search" aria-expanded={open} className="w-full rounded-full border border-ink-700 bg-ink-800/80 py-2 pl-10 pr-10 text-sm text-white placeholder-zinc-500 backdrop-blur transition-all focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
        {query && <button onClick={() => { setQuery(""); inputRef.current?.focus(); }} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"><X className="h-4 w-4" /></button>}
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-ink-700 glass shadow-card">
          {query.length > 1 && results.length > 0 && (
            <ul>{results.slice(0, 6).map((movie, i) => (<li key={movie.id}><Link to={`/movie/${movie.id}`} onMouseEnter={() => setActiveIndex(i)} onClick={() => { setOpen(false); setQuery(""); }} className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${i === activeIndex ? "bg-ink-700" : "hover:bg-ink-700/50"}`}><span className="h-10 w-8 flex-shrink-0 rounded bg-ink-600" /><div className="min-w-0"><p className="truncate font-medium text-white">{movie.title}</p><p className="truncate text-xs text-zinc-400">{movie.year} · {movie.genres.join(", ")}</p></div></Link></li>))}</ul>
          )}
          {query.length > 1 && results.length === 0 && <p className="px-4 py-6 text-center text-sm text-zinc-400">No results for &quot;{query}&quot;</p>}
          {query.length <= 1 && (
            <div className="px-4 py-3"><p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400"><TrendingUp className="h-3 w-3" />Trending searches</p><div className="flex flex-wrap gap-2">{trendingSearches.map((t) => <button key={t} onClick={() => { setQuery(t); inputRef.current?.focus(); }} className="rounded-full bg-ink-700 px-3 py-1 text-xs text-zinc-300 hover:bg-brand-500 hover:text-ink-950 transition-colors">{t}</button>)}</div></div>
          )}
        </div>
      )}
    </div>
  );
}
*/















import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, X, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useSearch } from "@/hooks/use-data";
import { getTrendingSearches } from "@/lib/repository";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { data: results = [] } = useSearch(query);

  const {
    data: trendingSearches = [],
    isLoading: isTrendingLoading,
  } = useQuery({
    queryKey: ["trending-searches"],
    queryFn: getTrendingSearches,
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key === "k"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener(
      "keydown",
      handler
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handler
      );
    };
  }, []);

  const navigateTo = (path: string) => {
    setOpen(false);
    setQuery("");
    navigate(path);
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!open) return;

    const max =
      Math.min(results.length, 6) - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((i) =>
        Math.min(i + 1, max)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((i) =>
        Math.max(i - 1, 0)
      );
    } else if (
      e.key === "Enter" &&
      activeIndex >= 0 &&
      results[activeIndex]
    ) {
      e.preventDefault();

      navigateTo(
        `/movie/${results[activeIndex].id}`
      );
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() =>
            setTimeout(
              () => setOpen(false),
              150
            )
          }
          onKeyDown={onKeyDown}
          placeholder="Search movies, actors, genres..."
          aria-label="Search"
          aria-expanded={open}
          className="w-full rounded-full border border-ink-700 bg-ink-800/80 py-2 pl-10 pr-10 text-sm text-white placeholder-zinc-500 backdrop-blur transition-all focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-ink-700 glass shadow-card">
          {query.length > 1 &&
            results.length > 0 && (
              <ul>
                {results
                  .slice(0, 6)
                  .map((movie, i) => (
                    <li key={movie.id}>
                      <Link
                        to={`/movie/${movie.id}`}
                        onMouseEnter={() =>
                          setActiveIndex(i)
                        }
                        onClick={() => {
                          setOpen(false);
                          setQuery("");
                        }}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          i === activeIndex
                            ? "bg-ink-700"
                            : "hover:bg-ink-700/50"
                        }`}
                      >
                        <span className="h-10 w-8 flex-shrink-0 rounded bg-ink-600" />

                        <div className="min-w-0">
                          <p className="truncate font-medium text-white">
                            {movie.title}
                          </p>

                          <p className="truncate text-xs text-zinc-400">
                            {movie.year} ·{" "}
                            {movie.genres.join(
                              ", "
                            )}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            )}

          {query.length > 1 &&
            results.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-zinc-400">
                No results for &quot;
                {query}&quot;
              </p>
            )}

          {query.length <= 1 && (
            <div className="px-4 py-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <TrendingUp className="h-3 w-3" />
                Trending searches
              </p>

              {isTrendingLoading ? (
                <p className="text-xs text-zinc-500">
                  Loading trending searches...
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map(
                    (t: string) => (
                      <button
                        key={t}
                        onClick={() => {
                          setQuery(t);
                          inputRef.current?.focus();
                        }}
                        className="rounded-full bg-ink-700 px-3 py-1 text-xs text-zinc-300 transition-colors hover:bg-brand-500 hover:text-ink-950"
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
