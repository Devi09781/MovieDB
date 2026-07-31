/*import type {
  Movie,
  Actor,
  Genre,
  Collection,
  Director,
  Studio,
  Review,
  WatchlistItem,
} from "@/types";

export interface MovieRepository {
  getMovies(): Promise<Movie[]>;
  getMovie(id: string): Promise<Movie | null>;
  getTrending(): Promise<Movie[]>;
  getTopRated(): Promise<Movie[]>;
  getLatest(): Promise<Movie[]>;
  getComingSoon(): Promise<Movie[]>;
  getByGenre(slug: string): Promise<Movie[]>;
  getByIndustry(industry: string): Promise<Movie[]>;
  getRecommendations(id: string): Promise<Movie[]>;
  getSimilar(id: string): Promise<Movie[]>;
  search(query: string): Promise<Movie[]>;
}

export interface ActorRepository {
  getActors(): Promise<Actor[]>;
  getActor(id: string): Promise<Actor | null>;
  getActorsTrending(): Promise<Actor[]>;
  searchActors(query: string): Promise<Actor[]>;
}

export interface ReviewRepository {
  getByMovie(movieId: string): Promise<Review[]>;
  add(review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpfulCount" | "helpfulBy" | "edited">): Promise<Review>;
  update(id: string, updates: Partial<Review>): Promise<Review>;
  remove(id: string): Promise<void>;
  voteHelpful(id: string, userId: string): Promise<Review>;
}

export interface WatchlistRepository {
  getByUser(userId: string): Promise<WatchlistItem[]>;
  add(item: Omit<WatchlistItem, "id" | "addedAt" | "vectorClock">): Promise<WatchlistItem>;
  update(id: string, updates: Partial<WatchlistItem>): Promise<WatchlistItem>;
  remove(id: string): Promise<void>;
}

export interface DataRepository extends MovieRepository, ActorRepository {
  getGenres(): Promise<Genre[]>;
  getCollections(): Promise<Collection[]>;
  getDirectors(): Promise<Director[]>;
  getStudios(): Promise<Studio[]>;
  getTrendingSearches(): string[];
}
