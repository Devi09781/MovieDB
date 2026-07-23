"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import Link from "next/link";
import type { Movie } from "@/types";

export function HeroCarousel({ movies }: { movies: Movie[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = movies.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count === 0) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next, count]);

  if (count === 0) return null;
  const movie = movies[index];

  return (
    <div className="relative h-[60vh] w-full overflow-hidden sm:h-[70vh] lg:h-[80vh]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} role="region" aria-label="Featured movies carousel">
      <AnimatePresence mode="wait">
        <motion.div key={movie.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute inset-0">
          <Image src={movie.backdropUrl} alt={movie.title} fill priority={index === 0} sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 flex h-full items-end pb-16 sm:pb-20">
        <div className="px-4 sm:px-8 lg:px-16">
          <motion.div key={`info-${movie.id}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl">
            <span className="mb-3 inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">Featured</span>
            <h1 className="font-display text-4xl leading-tight text-white sm:text-6xl lg:text-7xl">{movie.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <span className="font-semibold text-brand-400">★ {movie.rating.toFixed(1)}</span><span>{movie.year}</span><span>{movie.runtime}m</span>
              <span className="rounded border border-zinc-600 px-1.5 py-0.5 text-xs">{movie.industry}</span>
            </div>
            <p className="mt-4 line-clamp-3 max-w-xl text-sm text-zinc-300 sm:text-base">{movie.overview}</p>
            <div className="mt-6 flex gap-3">
              <Link href={`/movie/${movie.id}`}><span className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition-all hover:bg-brand-400 hover:shadow-glow"><Play className="h-5 w-5 fill-current" />Watch Trailer</span></Link>
              <Link href={`/movie/${movie.id}`}><span className="inline-flex items-center gap-2 rounded-lg glass px-6 py-3 font-semibold text-white transition-all hover:bg-ink-700"><Info className="h-5 w-5" />More Info</span></Link>
            </div>
          </motion.div>
        </div>
      </div>
      <button onClick={prev} aria-label="Previous slide" className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full glass p-2 text-white transition-all hover:bg-ink-700"><ChevronLeft className="h-6 w-6" /></button>
      <button onClick={next} aria-label="Next slide" className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full glass p-2 text-white transition-all hover:bg-ink-700"><ChevronRight className="h-6 w-6" /></button>
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">{movies.map((_, i) => <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-brand-500" : "w-2 bg-white/40"}`} />)}</div>
    </div>
  );
}
