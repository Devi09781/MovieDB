"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Movie } from "@/types";
import { useActor } from "@/hooks/use-movies";

export function CastSection({ movie }: { movie: Movie }) {
  const cast = movie.cast.sort((a, b) => a.order - b.order).slice(0, 12);
  if (cast.length === 0) return (<div><h2 className="mb-4 font-display text-2xl text-white">Top Cast</h2><p className="text-sm text-zinc-400">No cast information available.</p></div>);
  return (
    <div>
      <h2 className="mb-4 font-display text-2xl text-white">Top Cast</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {cast.map((member, i) => <CastCard key={member.id} actorId={member.actorId} character={member.character} index={i} />)}
      </div>
    </div>
  );
}

function CastCard({ actorId, character, index }: { actorId: string; character: string; index: number }) {
  const { data: actor, isLoading } = useActor(actorId);
  if (isLoading || !actor) return <div className="skeleton aspect-square rounded-full" />;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(index * 0.04, 0.3) }} whileHover={{ y: -4 }}>
      <Link href={`/actor/${actor.id}`} className="block">
        <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-full bg-ink-800 sm:w-28"><Image src={actor.profileUrl} alt={actor.name} fill sizes="112px" className="object-cover" loading="lazy" /></div>
        <p className="mt-2 text-center text-sm font-medium text-white hover:text-brand-400 transition-colors">{actor.name}</p>
        <p className="text-center text-xs text-zinc-400">{character}</p>
      </Link>
    </motion.div>
  );
}
