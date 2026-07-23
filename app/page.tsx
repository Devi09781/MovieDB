import { Suspense } from "react";
import { MovieRailSkeleton, HeroSkeleton, ActorCardSkeleton } from "@/components/ui/skeleton";
import { TrendingMoviesRail, TopRatedRail, LatestRail, TrendingActorsRail, GenresSection, CollectionsSection, FeaturedDirectorsSection } from "@/features/home/home-rails";

export default function HomePage() {
  return (
    <div className="pb-16">
      <Suspense fallback={<HeroSkeleton />}><TrendingMoviesRail /></Suspense>
      <div className="mt-8">
        <Suspense fallback={<MovieRailSkeleton />}><TopRatedRail /></Suspense>
        <Suspense fallback={<MovieRailSkeleton />}><LatestRail /></Suspense>
        <Suspense fallback={<div className="flex gap-4 overflow-hidden px-4 py-6 sm:px-8">{Array.from({ length: 6 }).map((_, i) => <ActorCardSkeleton key={i} />)}</div>}><TrendingActorsRail /></Suspense>
        <Suspense fallback={<MovieRailSkeleton />}><GenresSection /></Suspense>
        <Suspense fallback={<MovieRailSkeleton />}><CollectionsSection /></Suspense>
        <Suspense fallback={<MovieRailSkeleton />}><FeaturedDirectorsSection /></Suspense>
      </div>
    </div>
  );
}
