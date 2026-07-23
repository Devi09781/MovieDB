"use client";

import { useMoviesByGenre, useGenres } from "@/hooks/use-movies";
import { MovieCard } from "@/components/movie/movie-card";
import { motion } from "framer-motion";
import Link from "next/link";

export function MoviesBrowser() {
  const { data: genres } = useGenres();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 font-display text-4xl text-white sm:text-5xl">Browse Movies</motion.h1>
      <div className="mb-8 flex flex-wrap gap-3"><Link href="/movies" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-ink-950 hover:bg-brand-400 transition-colors">All</Link>{genres?.map((g) => <Link key={g.id} href={`/movies?genre=${g.slug}`} className="rounded-full border border-ink-700 bg-ink-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-brand-500 hover:text-brand-400 transition-colors">{g.name}</Link>)}</div>
      {genres?.map((genre) => <GenreBlock key={genre.id} slug={genre.slug} name={genre.name} />)}
    </div>
  );
}

function GenreBlock({ slug, name }: { slug: string; name: string }) {
  const { data, isLoading } = useMoviesByGenre(slug);
  if (isLoading || !data || data.length === 0) return null;
  return (<section className="mb-10"><h2 className="mb-4 font-display text-2xl text-white">{name}</h2><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{data.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}</div></section>);
}
