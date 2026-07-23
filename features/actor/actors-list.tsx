"use client";

import { useTrendingActors } from "@/hooks/use-movies";
import { ActorCard } from "@/components/actor/actor-card";
import { ActorCardSkeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function ActorsList() {
  const { data, isLoading } = useTrendingActors();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 font-display text-4xl text-white sm:text-5xl">Popular Actors</motion.h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{isLoading || !data ? Array.from({ length: 6 }).map((_, i) => <ActorCardSkeleton key={i} />) : data.map((a, i) => <ActorCard key={a.id} actor={a} index={i} />)}</div>
    </div>
  );
}
