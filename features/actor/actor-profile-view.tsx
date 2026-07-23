"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Globe, Award, ExternalLink, Cake } from "lucide-react";
import { useActor } from "@/hooks/use-movies";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, calcAge } from "@/lib/format";

export function ActorProfileView({ id }: { id: string }) {
  const { data: actor, isLoading } = useActor(id);
  if (isLoading || !actor) {
    return (<div className="mx-auto max-w-5xl px-4 py-8 sm:px-8"><div className="flex gap-6"><Skeleton className="h-64 w-48 rounded-xl" /><div className="flex-1 space-y-3"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-4 w-1/3" /><Skeleton className="h-24 w-full" /></div></div></div>);
  }
  const age = calcAge(actor.birthday);
  return (
    <div className="pb-16">
      <div className="relative h-32 bg-gradient-to-b from-ink-800 to-ink-950 sm:h-48" />
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        <div className="-mt-24 flex flex-col gap-6 sm:flex-row sm:items-end">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-full border-4 border-ink-950 bg-ink-800 shadow-card sm:h-48 sm:w-48"><Image src={actor.profileUrl} alt={actor.name} fill priority sizes="192px" className="object-cover" /></motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1 pb-2">
            <h1 className="font-display text-4xl text-white sm:text-5xl">{actor.name}</h1>
            {actor.alsoKnownAs.length > 0 && <p className="mt-1 text-sm text-zinc-400">Also known as: {actor.alsoKnownAs.join(", ")}</p>}
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-300">
              <span className="flex items-center gap-1.5"><Cake className="h-4 w-4" />{formatDate(actor.birthday)} (age {age})</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{actor.placeOfBirth}</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4" />{actor.nationality}</span>
            </div>
            <div className="mt-3"><span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-400">{actor.knownForDepartment}</span></div>
          </motion.div>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section><h2 className="mb-3 font-display text-2xl text-white">Biography</h2><p className="text-sm leading-relaxed text-zinc-300 sm:text-base">{actor.biography}</p></section>
            <section><h2 className="mb-3 font-display text-2xl text-white">Filmography</h2><FilmographyTable items={actor.filmography} /></section>
            {actor.gallery.length > 0 && (<section><h2 className="mb-3 font-display text-2xl text-white">Gallery</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{actor.gallery.map((g, i) => <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(i * 0.05, 0.3) }} className="relative aspect-[2/3] overflow-hidden rounded-lg bg-ink-800"><Image src={g} alt={`${actor.name} gallery ${i + 1}`} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" loading="lazy" /></motion.div>)}</div></section>)}
            {actor.trivia.length > 0 && (<section><h2 className="mb-3 font-display text-2xl text-white">Trivia</h2><ul className="space-y-2">{actor.trivia.map((t, i) => <li key={i} className="flex gap-2 text-sm text-zinc-300"><span className="text-brand-400">•</span>{t}</li>)}</ul></section>)}
          </div>
          <div className="space-y-6">
            {actor.awards.length > 0 && (<div className="rounded-xl border border-ink-700 bg-ink-800 p-5"><h3 className="mb-3 flex items-center gap-2 font-display text-lg text-white"><Award className="h-5 w-5 text-brand-400" />Awards</h3><div className="space-y-2">{actor.awards.map((a, i) => <div key={i} className="text-sm"><span className={a.won ? "text-brand-400 font-semibold" : "text-zinc-300"}>{a.won ? "🏆 " : "🏅 "}{a.name}</span><span className="text-zinc-500"> ({a.year})</span><p className="text-xs text-zinc-400">{a.category}</p></div>)}</div></div>)}
            {actor.socialMedia.length > 0 && (<div className="rounded-xl border border-ink-700 bg-ink-800 p-5"><h3 className="mb-3 font-display text-lg text-white">Social Media</h3><div className="space-y-2">{actor.socialMedia.map((s) => <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg bg-ink-700 px-3 py-2 text-sm text-white transition-colors hover:bg-brand-500 hover:text-ink-950"><span>{s.platform}</span><span className="text-zinc-400">{s.handle}</span></a>)}</div></div>)}
            {actor.externalLinks.length > 0 && (<div className="rounded-xl border border-ink-700 bg-ink-800 p-5"><h3 className="mb-3 font-display text-lg text-white">External Links</h3><div className="space-y-2">{actor.externalLinks.map((l) => <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors"><ExternalLink className="h-4 w-4" />{l.label}</a>)}</div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilmographyTable({ items }: { items: { movieId: string; title: string; character?: string; year: number; posterUrl: string; rating: number }[] }) {
  const sorted = [...items].sort((a, b) => b.year - a.year);
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700">
      <table className="w-full text-sm">
        <thead className="bg-ink-800 text-zinc-400"><tr><th className="px-4 py-2 text-left font-medium">Year</th><th className="px-4 py-2 text-left font-medium">Title</th><th className="hidden px-4 py-2 text-left font-medium sm:table-cell">Character</th><th className="px-4 py-2 text-right font-medium">Rating</th></tr></thead>
        <tbody>{sorted.map((item, i) => <tr key={i} className="border-t border-ink-700 hover:bg-ink-800/50 transition-colors"><td className="px-4 py-3 text-zinc-400">{item.year}</td><td className="px-4 py-3"><Link href={`/movie/${item.movieId}`} className="font-medium text-white hover:text-brand-400 transition-colors">{item.title}</Link></td><td className="hidden px-4 py-3 text-zinc-300 sm:table-cell">{item.character ?? "—"}</td><td className="px-4 py-3 text-right font-semibold text-brand-400">{item.rating.toFixed(1)}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
