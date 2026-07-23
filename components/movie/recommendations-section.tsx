"use client";

import { useRecommendations, useSimilarMovies } from "@/hooks/use-movies";
import { Rail } from "@/components/movie/rail";
import { MovieCard } from "@/components/movie/movie-card";

export function RecommendationsSection({ id, type }: { id: string; type: "recommendations" | "similar" }) {
  const recs = useRecommendations(id);
  const sim = useSimilarMovies(id);
  const data = type === "recommendations" ? recs.data : sim.data;
  const isLoading = type === "recommendations" ? recs.isLoading : sim.isLoading;
  if (isLoading || !data || data.length === 0) return null;
  return (
    <Rail title={type === "recommendations" ? "Recommendations" : "More Like This"}>
      {data.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}
    </Rail>
  );
}
