import { useActors } from "@/hooks/use-data";
import ActorCard from "@/components/actor-card";

export default function ActorsPage() {
  const { data: actors, isLoading } = useActors();
  return (
    <div className="container-page space-y-8 py-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Actors</h1>
        <p className="mt-2 text-ink-400">Browse profiles of your favorite actors.</p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-ink-800" />)}</div>
      ) : !actors || actors.length === 0 ? (
        <div className="card p-12 text-center text-ink-400">No actors found.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{actors.map((actor) => <ActorCard key={actor.id} actor={actor} />)}</div>
      )}
    </div>
  );
}
