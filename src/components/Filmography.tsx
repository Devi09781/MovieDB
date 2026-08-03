type Movie = {
  id: string;
  title: string;
  release_date?: string | null;
  rating?: number | null;
  poster_url?: string | null;
};

type FilmographyProps = {
  movies: Movie[];
};

export default function Filmography({
  movies,
}: FilmographyProps) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-2xl font-bold text-white">
        Filmography
      </h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg"
          >
            <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-800">
              <img
                src={
                  movie.poster_url ||
                  "https://placehold.co/400x600?text=No+Poster"
                }
                alt={movie.title}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "https://placehold.co/400x600?text=No+Poster";
                }}
              />
            </div>

            <div className="p-3">
              <h3 className="truncate font-semibold text-white">
                {movie.title}
              </h3>

              <div className="mt-1 flex justify-between text-sm text-zinc-400">
                <span>
                  {movie.release_date
                    ? new Date(
                        movie.release_date
                      ).getFullYear()
                    : "N/A"}
                </span>

                <span>
                  {movie.rating
                    ? `⭐ ${movie.rating}`
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}