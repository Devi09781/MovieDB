"use client";

import { useTrendingMovies, useTopRatedMovies, useLatestMovies, useTrendingActors, useGenres, useCollections, useDirectors } from "@/hooks/use-movies";
import { HeroCarousel } from "@/components/movie/hero-carousel";
import { Rail } from "@/components/movie/rail";
import { MovieCard } from "@/components/movie/movie-card";
import { ActorCard } from "@/components/actor/actor-card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function TrendingMoviesRail() {
  const { data, isLoading } = useTrendingMovies();
  if (isLoading || !data) return null;
  return <HeroCarousel movies={data.slice(0, 5)} />;
}
export function TopRatedRail() {
  const { data, isLoading } = useTopRatedMovies();
  return (<Rail title="Top Rated" seeAllHref="/movies">{isLoading || !data ? null : data.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}</Rail>);
}
export function LatestRail() {
  const { data, isLoading } = useLatestMovies();
  return (<Rail title="Latest Releases" seeAllHref="/movies">{isLoading || !data ? null : data.map((m, i) => <MovieCard key={m.id} movie={m} index={i} />)}</Rail>);
}
export function TrendingActorsRail() {
  const { data, isLoading } = useTrendingActors();
  return (<Rail title="Trending Actors" seeAllHref="/actors">{isLoading || !data ? null : data.map((a, i) => <ActorCard key={a.id} actor={a} index={i} />)}</Rail>);
}
export function GenresSection() {
  const { data, isLoading } = useGenres();
  if (isLoading || !data) return null;
  return (
    <section className="px-4 py-6 sm:px-8">
      <h2 className="mb-3 font-display text-2xl tracking-wide text-white sm:text-3xl">Browse by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {data.map((g, i) => (<motion.div key={g.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.03, 0.2) }} whileHover={{ y: -4, scale: 1.05 }}><Link href={`/movies?genre=${g.slug}`} className="inline-block rounded-xl border border-ink-700 bg-ink-800 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-brand-500 hover:bg-brand-500 hover:text-ink-950">{g.name}<span className="ml-2 text-xs text-zinc-400">{g.movieCount}</span></Link></motion.div>))}
      </div>
    </section>
  );
}
export function CollectionsSection() {
  const { data, isLoading } = useCollections();
  if (isLoading || !data) return null;
  return (
    <section className="px-4 py-6 sm:px-8">
      <h2 className="mb-3 font-display text-2xl tracking-wide text-white sm:text-3xl">Popular Collections</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((c, i) => (<motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }} whileHover={{ y: -6 }}><Link href={`/movies?collection=${c.id}`}><div className="group relative aspect-video overflow-hidden rounded-xl bg-ink-800 shadow-card"><Image src={c.posterUrl} alt={c.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" /><div className="absolute bottom-0 p-4"><h3 className="font-semibold text-white">{c.name}</h3><p className="line-clamp-1 text-xs text-zinc-300">{c.description}</p></div></div></Link></motion.div>))}
      </div>
    </section>
  );
}
export function FeaturedDirectorsSection() {
  const { data, isLoading } = useDirectors();
  if (isLoading || !data) return null;
  return (
    <section className="px-4 py-6 sm:px-8">
      <h2 className="mb-3 font-display text-2xl tracking-wide text-white sm:text-3xl">Featured Directors</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((d, i) => (<motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }} whileHover={{ y: -6 }} className="rounded-xl border border-ink-700 bg-ink-800 p-5 transition-colors hover:border-brand-500"><div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-ink-700"><Image src={d.profileUrl} alt={d.name} fill sizes="96px" className="object-cover" loading="lazy" /></div><h3 className="text-center font-semibold text-white">{d.name}</h3><p className="mt-1 line-clamp-2 text-center text-xs text-zinc-400">{d.biography}</p><div className="mt-3 flex flex-wrap justify-center gap-1.5">{d.knownFor.slice(0, 3).map((k) => <span key={k} className="rounded-full bg-ink-700 px-2 py-0.5 text-xs text-zinc-300">{k}</span>)}</div></motion.div>))}
      </div>
    </section>
  );
}
