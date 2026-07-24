export interface CastMember {
  actor_id?: string;
  name: string;
  character: string;
  profile_url?: string;
  order?: number;
}

export interface CrewMember {
  name: string;
  role: string;
  department?: string;
}

export interface ProductionCompany {
  name: string;
  logo_url?: string;
  origin_country?: string;
}

export interface MovieAward {
  name: string;
  year: string;
  category: string;
  won: boolean;
}

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  poster_url: string;
  backdrop_url: string;
  release_date: string;
  year: number;
  runtime: number;
  rating: number;
  vote_count: number;
  genres: string[];
  languages: string[];
  budget: number | null;
  revenue: number | null;
  tagline: string | null;
  status: string;
  trailer_url: string | null;
  cast_members: CastMember[];
  crew: CrewMember[];
  production_companies: ProductionCompany[];
  streaming_providers: string[];
  awards: MovieAward[];
  recommendations: string[];
  similar_movies: string[];
  industry: string;
  created_at: string;
}

export interface FilmographyEntry {
  movieId?: string;
  title: string;
  character: string;
  year: string;
  posterUrl: string;
}

export interface ActorAward {
  name: string;
  year: string;
  category: string;
  won: boolean;
}

export interface SocialMedia {
  platform: string;
  handle: string;
  url: string;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export interface Actor {
  id: string;
  name: string;
  also_known_as: string[];
  biography: string;
  birthday: string;
  birthplace: string;
  profile_url: string;
  known_for_department: string;
  place_of_birth: string;
  nationality: string;
  filmography: FilmographyEntry[];
  awards: ActorAward[];
  social_media: SocialMedia[];
  gallery: string[];
  trivia: string[];
  external_links: ExternalLink[];
  created_at: string;
}

export interface Review {
  id: string;
  movie_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title: string;
  content: string;
  helpful_count: number;
  edited: boolean;
  created_at: string;
  updated_at: string;
}

export interface WatchlistItem {
  id: string;
  movie_id: string;
  user_id: string;
  status: string;
  deleted: boolean;
  created_at: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  movie_count: number;
}
