"use client";

import { useMovie } from "@/hooks/use-movies";
import { MovieBanner } from "@/components/movie/movie-banner";
import { CastSection } from "@/components/movie/cast-section";
import { RecommendationsSection } from "@/components/movie/recommendations-section";
import { ReviewsSection } from "@/features/reviews/reviews-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export function MovieDetailsView({ id }: { id: string }) {
  const { data: movie, isLoading } = useMovie(id);
  if (isLoading || !movie) {
    return (<div className="pb-16"><Skeleton className="h-[50vh] w-full rounded-none" /><div className="mx-auto max-w-6xl px-4 py-8 sm:px-8"><Skeleton className="h-10 w-2/3" /><Skeleton className="mt-4 h-4 w-1/3" /><Skeleton className="mt-8 h-40 w-full" /></div></div>);
  }
  return (
    <div className="pb-16">
      <MovieBanner movie={movie} />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Suspense fallback={<Skeleton className="h-48 w-full rounded-xl" />}><CastSection movie={movie} /></Suspense>
            <Suspense fallback={<Skeleton className="h-40 w-full rounded-xl" />}><ReviewsSection movieId={movie.id} /></Suspense>
          </div>
          <div className="space-y-8">
            <div className="rounded-xl border border-ink-700 bg-ink-800 p-5">
              <h3 className="mb-3 font-display text-lg text-white">Information</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-zinc-400">Status</dt><dd className="text-white">{movie.status}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Release</dt><dd className="text-white">{movie.releaseDate}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Runtime</dt><dd className="text-white">{movie.runtime} min</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Budget</dt><dd className="text-white">${(movie.budget ?? 0).toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Revenue</dt><dd className="text-white">${(movie.revenue ?? 0).toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Industry</dt><dd className="text-white">{movie.industry}</dd></div>
                <div className="flex justify-between"><dt className="text-zinc-400">Languages</dt><dd className="text-right text-white">{movie.languages.join(", ")}</dd></div>
              </dl>
            </div>
            <div><h3 className="mb-3 font-display text-lg text-white">Genres</h3><div className="flex flex-wrap gap-2">{movie.genres.map((g) => <span key={g} className="rounded-full bg-ink-700 px-3 py-1 text-xs text-zinc-300">{g}</span>)}</div></div>
            <div><h3 className="mb-3 font-display text-lg text-white">Streaming On</h3><div className="flex flex-wrap gap-2">{movie.streamingProviders.map((s) => <span key={s} className="rounded-lg bg-accent-green/20 px-3 py-1.5 text-xs font-medium text-accent-green">{s}</span>)}</div></div>
            {movie.awards.length > 0 && (<div><h3 className="mb-3 font-display text-lg text-white">Awards</h3><div className="space-y-2">{movie.awards.map((a) => <div key={a.id} className="rounded-lg bg-ink-800 p-3 text-sm"><span className={a.won ? "text-brand-400 font-semibold" : "text-zinc-300"}>{a.won ? "🏆 " : "🏅 "}{a.name} ({a.year})</span><p className="text-xs text-zinc-400">{a.category}</p></div>)}</div></div>)}
          </div>
        </div>
        <div className="mt-12 space-y-8">
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}><RecommendationsSection id={movie.id} type="recommendations" /></Suspense>
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}><RecommendationsSection id={movie.id} type="similar" /></Suspense>
        </div>
      </div>
    </div>
  );
}
