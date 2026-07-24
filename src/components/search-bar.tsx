import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp } from "lucide-react";
import { useTrendingSearches } from "@/hooks/use-data";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: trending } = useTrendingSearches();
  function submit(e: React.FormEvent) { e.preventDefault(); if (query.trim()) navigate(`/movies?q=${encodeURIComponent(query.trim())}`); }
  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for movies..." className="w-full rounded-2xl border border-ink-600 bg-ink-900/70 py-3.5 pl-12 pr-4 text-base text-ink-100 placeholder-ink-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500" />
      </form>
      {trending && trending.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-ink-400"><TrendingUp className="h-3.5 w-3.5" />Trending:</span>
          {trending.slice(0, 6).map((t) => <button key={t} onClick={() => navigate(`/movies?q=${encodeURIComponent(t)}`)} className="chip hover:border-brand-500 hover:text-brand-400 transition">{t}</button>)}
        </div>
      )}
    </div>
  );
}
