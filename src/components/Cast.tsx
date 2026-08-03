type CastMember = {
  id: string;
  name: string;
  character?: string;
  profile_url?: string | null;
};

type CastProps = {
  cast: CastMember[];
};

export default function Cast({ cast }: CastProps) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Cast
      </h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg"
          >
            <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-800">
              <img
                src={
                  actor.profile_url ||
                  "https://placehold.co/400x600?text=No+Image"
                }
                alt={actor.name}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://placehold.co/400x600?text=No+Image";
                }}
              />
            </div>

            <div className="p-3">
              <h3 className="truncate font-semibold text-white">
                {actor.name}
              </h3>

              {actor.character && (
                <p className="mt-1 truncate text-sm text-zinc-400">
                  {actor.character}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}