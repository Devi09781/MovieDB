import { Link } from "react-router-dom";
import type { Movie } from "@/types";
import MovieCard from "./movie-card";

export default function RecommendationsSection({ title, movies }: { title: string; movies: Movie[] }) {
  if (!movies || movies.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="section-title">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </section>
  );
}
