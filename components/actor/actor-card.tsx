/*"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Actor } from "@/types";

export function ActorCard({ actor, index = 0 }: { actor: Actor; index?: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }} whileHover={{ y: -6 }} className="group w-[140px] flex-shrink-0 sm:w-[160px]">
      <Link href={`/actor/${actor.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-full bg-ink-800 shadow-card">
          <Image src={actor.profileUrl} alt={actor.name} fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        </div>
        <h3 className="mt-3 text-center text-sm font-semibold text-white group-hover:text-brand-400 transition-colors">{actor.name}</h3>
        <p className="text-center text-xs text-zinc-400">{actor.filmography.length} credits</p>
      </Link>
    </motion.div>
  );
}
*/