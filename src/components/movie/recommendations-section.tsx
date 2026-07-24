import { useMovie } from "@/hooks/use-data";
import { Rail } from "@/components/movie/rail";
import { MovieCard } from "@/components/movie/movie-card";

export function RecommendationsSection({ id, type }: { id: string; type: "recommendations" | "similar" }) {
  const { data: movie } = useMovie(id);
  if (!movie) return null;
  const ids = type === "recommendations" ? movie.recommendations : movie.similar_movies;
  return (
    <Rail title={type === "recommendations" ? "Recommendations" : "More Like This"}>
      {ids.map((rid, i) => <RecommendationCard key={rid} movieId={rid} index={i} />)}
    </Rail>
  );
}

function RecommendationCard({ movieId, index }: { movieId: string; index: number }) {
  const { data: movie, isLoading } = useMovie(movieId);
  if (isLoading || !movie) return <div className="skeleton aspect-[2/3] w-[160px] rounded-xl sm:w-[200px]" />;
  return <MovieCard movie={movie} index={index} />;
}
