/*import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Globe, Award, ExternalLink, Film, Share2 } from "lucide-react";
import {useActors} from "@/hooks/use-data";
import { formatDate, initials } from "@/lib/utils";
import SmartImage from "@/components/smart-image";

export default function ActorPage() {
  const { id } = useParams<{ id: string }>();
  const { data: actor, isLoading } = useActor(id);

  if (isLoading) return <div className="container-page space-y-6 py-12"><div className="h-64 animate-pulse rounded-2xl bg-ink-800" /></div>;
  if (!actor) return <div className="container-page py-24 text-center"><p className="text-ink-400">Actor not found.</p><Link to="/actors" className="btn-primary mt-4">Browse Actors</Link></div>;

  return (
    <div className="container-page space-y-10 py-12">
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="h-56 w-40 shrink-0 overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-800 sm:h-72 sm:w-52">
          <SmartImage src={actor.profile_url} alt={actor.name} className="h-full w-full object-cover" fallbackText={initials(actor.name)} />
        </div>
        <div className="flex-1 space-y-3">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{actor.name}</h1>
          {actor.also_known_as && actor.also_known_as.length > 0 && <p className="text-sm text-ink-400">Also known as: {actor.also_known_as.join(", ")}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-ink-300">
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-ink-400" />{formatDate(actor.birthday)}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-ink-400" />{actor.place_of_birth || actor.birthplace}</span>
            <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-ink-400" />{actor.nationality}</span>
            <span className="flex items-center gap-1.5"><Film className="h-4 w-4 text-ink-400" />{actor.known_for_department}</span>
          </div>
          {actor.social_media && actor.social_media.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {actor.social_media.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="chip hover:border-brand-500 hover:text-brand-400 transition">
                  <Share2 className="h-3 w-3" />{s.platform} · {s.handle}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="section-title">Biography</h2>
        <p className="text-base leading-relaxed text-ink-200">{actor.biography}</p>
      </section>

      {actor.filmography && actor.filmography.length > 0 && (
        <section className="space-y-4">
          <h2 className="section-title">Filmography</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {actor.filmography.map((film, i) => {
              const content = (
                <div className="group block space-y-2">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-ink-700/60 bg-ink-800">
                    <SmartImage src={film.posterUrl} alt={film.title} className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105" fallbackText={film.title.slice(0, 2).toUpperCase()} />
                  </div>
                  <p className="truncate text-sm font-semibold text-ink-100 group-hover:text-brand-400">{film.title}</p>
                  <p className="text-xs text-ink-400">{film.year} · {film.character}</p>
                </div>
              );
              return film.movieId ? <Link key={i} to={`/movie/${film.movieId}`}>{content}</Link> : <div key={i}>{content}</div>;
            })}
          </div>
        </section>
      )}

      {actor.awards && actor.awards.length > 0 && (
        <section className="space-y-4">
          <h2 className="section-title">Awards</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {actor.awards.map((a, i) => (
              <div key={i} className="card flex items-center gap-3 p-4">
                <Award className={`h-5 w-5 ${a.won ? "text-warning-400" : "text-ink-400"}`} />
                <div><p className="text-sm font-semibold text-ink-100">{a.name}</p><p className="text-xs text-ink-400">{a.year} · {a.category}</p></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {actor.trivia && actor.trivia.length > 0 && (
        <section className="space-y-4">
          <h2 className="section-title">Trivia</h2>
          <ul className="space-y-2">{actor.trivia.map((t, i) => <li key={i} className="card p-4 text-sm text-ink-200">{t}</li>)}</ul>
        </section>
      )}

      {actor.external_links && actor.external_links.length > 0 && (
        <section className="space-y-4">
          <h2 className="section-title">External Links</h2>
          <div className="flex flex-wrap gap-3">
            {actor.external_links.map((link, i) => <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="btn-outline"><ExternalLink className="h-4 w-4" />{link.label}</a>)}
          </div>
        </section>
      )}
    </div>
  );
}

*/



import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Globe,
  Award,
  ExternalLink,
  Film,
  Share2,
} from "lucide-react";

import { useActors } from "@/hooks/use-data";
import { formatDate, initials } from "@/lib/utils";
import SmartImage from "@/components/smart-image";

export default function ActorPage() {
  const { id } = useParams<{ id: string }>();

  // useActors returns the complete actors array.
  const {
    data: actors = [],
    isLoading,
  } = useActors();

  // Find the required actor using the URL ID.
  const actor = actors.find(
    (currentActor) => currentActor.id === id
  );

  if (isLoading) {
    return (
      <div className="container-page space-y-6 py-12">
        <div className="h-64 animate-pulse rounded-2xl bg-ink-800" />
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-ink-400">
          Actor not found.
        </p>

        <Link
          to="/actors"
          className="btn-primary mt-4"
        >
          Browse Actors
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page space-y-10 py-12">
      {/* Actor profile */}
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="h-56 w-40 shrink-0 overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-800 sm:h-72 sm:w-52">
          <SmartImage
            src={actor.profile_url}
            alt={actor.name}
            className="h-full w-full object-cover"
            fallbackText={initials(actor.name)}
          />
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {actor.name}
          </h1>

          {actor.also_known_as &&
            actor.also_known_as.length > 0 && (
              <p className="text-sm text-ink-400">
                Also known as:{" "}
                {actor.also_known_as.join(", ")}
              </p>
            )}

          <div className="flex flex-wrap gap-4 text-sm text-ink-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-ink-400" />

              {actor.birthday
                ? formatDate(actor.birthday)
                : "Birthday unavailable"}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-ink-400" />

              {actor.place_of_birth ||
                actor.birthplace ||
                "Birthplace unavailable"}
            </span>

            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-ink-400" />

              {actor.nationality ||
                "Nationality unavailable"}
            </span>

            <span className="flex items-center gap-1.5">
              <Film className="h-4 w-4 text-ink-400" />

              {actor.known_for_department ||
                "Actor"}
            </span>
          </div>

          {actor.social_media &&
            actor.social_media.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {actor.social_media.map(
                  (social, index) => (
                    <a
                      key={
                        social.url ??
                        index
                      }
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip transition hover:border-brand-500 hover:text-brand-400"
                    >
                      <Share2 className="h-3 w-3" />

                      {social.platform}

                      {social.handle &&
                        ` · ${social.handle}`}
                    </a>
                  )
                )}
              </div>
            )}
        </div>
      </div>

      {/* Biography */}
      <section className="space-y-3">
        <h2 className="section-title">
          Biography
        </h2>

        <p className="text-base leading-relaxed text-ink-200">
          {actor.biography}
        </p>
      </section>

      {/* Filmography */}
      {actor.filmography &&
        actor.filmography.length > 0 && (
          <section className="space-y-4">
            <h2 className="section-title">
              Filmography
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {actor.filmography.map(
                (film, index) => {
                  const content = (
                    <div className="group block space-y-2">
                      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-ink-700/60 bg-ink-800">
                        <SmartImage
                          src={
                            film.posterUrl
                          }
                          alt={
                            film.title
                          }
                          className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
                          fallbackText={film.title
                            .slice(
                              0,
                              2
                            )
                            .toUpperCase()}
                        />
                      </div>

                      <p className="truncate text-sm font-semibold text-ink-100 group-hover:text-brand-400">
                        {film.title}
                      </p>

                      <p className="text-xs text-ink-400">
                        {film.year} ·{" "}
                        {
                          film.character
                        }
                      </p>
                    </div>
                  );

                  return film.movieId ? (
                    <Link
                      key={
                        film.movieId
                      }
                      to={`/movie/${film.movieId}`}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div
                      key={index}
                    >
                      {content}
                    </div>
                  );
                }
              )}
            </div>
          </section>
        )}

      {/* Awards */}
      {actor.awards &&
        actor.awards.length > 0 && (
          <section className="space-y-4">
            <h2 className="section-title">
              Awards
            </h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {actor.awards.map(
                (
                  award,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className="card flex items-center gap-3 p-4"
                  >
                    <Award
                      className={`h-5 w-5 ${
                        award.won
                          ? "text-warning-400"
                          : "text-ink-400"
                      }`}
                    />

                    <div>
                      <p className="text-sm font-semibold text-ink-100">
                        {
                          award.name
                        }
                      </p>

                      <p className="text-xs text-ink-400">
                        {
                          award.year
                        }{" "}
                        ·{" "}
                        {
                          award.category
                        }
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

      {/* Trivia */}
      {actor.trivia &&
        actor.trivia.length > 0 && (
          <section className="space-y-4">
            <h2 className="section-title">
              Trivia
            </h2>

            <ul className="space-y-2">
              {actor.trivia.map(
                (
                  trivia,
                  index
                ) => (
                  <li
                    key={
                      index
                    }
                    className="card p-4 text-sm text-ink-200"
                  >
                    {
                      trivia
                    }
                  </li>
                )
              )}
            </ul>
          </section>
        )}

      {/* External links */}
      {actor.external_links &&
        actor.external_links.length >
          0 && (
          <section className="space-y-4">
            <h2 className="section-title">
              External Links
            </h2>

            <div className="flex flex-wrap gap-3">
              {actor.external_links.map(
                (
                  externalLink,
                  index
                ) => (
                  <a
                    key={
                      externalLink.url ??
                      index
                    }
                    href={
                      externalLink.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <ExternalLink className="h-4 w-4" />

                    {
                      externalLink.label
                    }
                  </a>
                )
              )}
            </div>
          </section>
        )}
    </div>
  );
}

