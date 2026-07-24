import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "@/types";
import MovieCard from "./movie-card";

export default function Rail({ title, movies, loading }: { title: string; movies: Movie[]; loading?: boolean }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  function scrollBy(dir: number) { const el = scrollerRef.current; if (el) el.scrollBy({ left: dir * 600, behavior: "smooth" }); }
  if (loading) return (
    <section className="space-y-4"><h2 className="section-title">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-ink-800" />)}</div>
    </section>
  );
  if (!movies || movies.length === 0) return null;
  return (
    <section className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="section-title">{title}</h2>
          <div className="hidden gap-2 sm:flex">
            <button onClick={() => scrollBy(-1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-600 text-ink-300 hover:border-brand-500 hover:text-brand-400 transition" aria-label="Scroll left"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={() => scrollBy(1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-600 text-ink-300 hover:border-brand-500 hover:text-brand-400 transition" aria-label="Scroll right"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      )}
      <div ref={scrollerRef} className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2">
        {movies.map((movie) => <div key={movie.id} className="w-36 shrink-0 sm:w-44 md:w-48"><MovieCard movie={movie} /></div>)}
      </div>
    </section>
  );
}
