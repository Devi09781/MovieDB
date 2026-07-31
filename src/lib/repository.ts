/*import { supabase } from "./supabase";
import type { Movie, Actor, Review, WatchlistItem, Genre } from "@/types";

export async function getMovies(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").order("rating", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getMovie(id: string | undefined): Promise<Movie | null> {
  if (!id) return null;
  const { data, error } = await supabase.from("movies").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Movie | null;
}

export async function getTrending(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").order("vote_count", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getPopular(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").gte("rating", 7.0).order("release_date", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getTopRated(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").order("rating", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getLatest(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").order("release_date", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getBollywood(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").eq("industry", "Bollywood").order("rating", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getTollywood(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").eq("industry", "Tollywood").order("rating", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getHollywood(): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").eq("industry", "Hollywood").order("rating", { ascending: false }).limit(10);
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const { data, error } = await supabase.from("movies").select("*").ilike("title", `%${query}%`).order("rating", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Movie[];
}

export async function getActors(): Promise<Actor[]> {
  const { data, error } = await supabase.from("actors").select("*").order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Actor[];
}

export async function getActor(id: string | undefined): Promise<Actor | null> {
  if (!id) return null;
  const { data, error } = await supabase.from("actors").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Actor | null;
}

export async function getReviews(movieId: string): Promise<Review[]> {
  const { data, error } = await supabase.from("reviews").select("*").eq("movie_id", movieId).order("helpful_count", { ascending: false }).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Review[];
}

export async function addReview(review: { movie_id: string; rating: number; title: string; content: string }): Promise<Review> {
  const payload = { ...review, user_id: "guest", user_name: "Guest User", helpful_count: 0, edited: false };
  const { data, error } = await supabase.from("reviews").insert(payload).select().single();
  if (error) throw error;
  return data as Review;
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
}

export async function voteReview(id: string, helpfulCount: number): Promise<void> {
  const { error } = await supabase.from("reviews").update({ helpful_count: helpfulCount }).eq("id", id);
  if (error) throw error;
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
  const { data, error } = await supabase.from("watchlist").select("*").eq("deleted", false).order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as WatchlistItem[];
}

export async function addToWatchlist(movieId: string, status: string): Promise<WatchlistItem> {
  const { data, error } = await supabase.from("watchlist").insert({ movie_id: movieId, user_id: "guest", status, deleted: false }).select().single();
  if (error) throw error;
  return data as WatchlistItem;
}

export async function removeFromWatchlist(id: string): Promise<void> {
  const { error } = await supabase.from("watchlist").delete().eq("id", id);
  if (error) throw error;
}

export async function updateWatchlistStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase.from("watchlist").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function getGenres(): Promise<Genre[]> {
  const { data, error } = await supabase.from("genres").select("*").order("name", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Genre[];
}

export async function getTrendingSearches(): Promise<string[]> {
  const movies = await getTrending();
  return movies.map((m) => m.title).slice(0, 8);
}










export async function updateReview(
  id: string,
  updates: {
    rating: number;
    title: string;
    content: string;
  }
) {
  const reviews = await getAllReviews();

  const review = reviews.find(
    (item) => item.id === id
  );

  if (!review) {
    throw new Error("Review not found");
  }

  const updatedReview = {
    ...review,
    ...updates,
    edited: true,
  };

  return updatedReview;
}
*/






import { supabase } from "./supabase";
import type {
  Movie,
  Actor,
  Review,
  WatchlistItem,
  Genre,
} from "@/types";

// =========================
// MOVIES
// =========================

export async function getMovies(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("rating", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getMovie(
  id: string | undefined
): Promise<Movie | null> {
  if (!id) return null;

  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data as Movie | null;
}

export async function getTrending(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("vote_count", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getPopular(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .gte("rating", 7.0)
    .order("release_date", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getTopRated(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("rating", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getLatest(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("release_date", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getBollywood(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("industry", "Bollywood")
    .order("rating", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getTollywood(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("industry", "Tollywood")
    .order("rating", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function getHollywood(): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("industry", "Hollywood")
    .order("rating", {
      ascending: false,
    })
    .limit(10);

  if (error) throw error;

  return (data ?? []) as Movie[];
}

export async function searchMovies(
  query: string
): Promise<Movie[]> {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .ilike("title", `%${query}%`)
    .order("rating", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Movie[];
}

// =========================
// ACTORS
// =========================

export async function getActors(): Promise<Actor[]> {
  const { data, error } = await supabase
    .from("actors")
    .select("*")
    .order("name", {
      ascending: true,
    });

  if (error) throw error;

  return (data ?? []) as Actor[];
}

export async function getActor(
  id: string | undefined
): Promise<Actor | null> {
  if (!id) return null;

  const { data, error } = await supabase
    .from("actors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data as Actor | null;
}

// =========================
// REVIEWS
// =========================

export async function getReviews(
  movieId: string
): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("movie_id", movieId)
    .order("helpful_count", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Review[];
}

export async function addReview(
  review: {
    movie_id: string;
    rating: number;
    title: string;
    content: string;
  }
): Promise<Review> {
  const payload = {
    ...review,
    user_id: "guest",
    user_name: "Guest User",
    helpful_count: 0,
    edited: false,
  };

  const { data, error } = await supabase
    .from("reviews")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data as Review;
}

export async function updateReview(
  id: string,
  updates: {
    rating: number;
    title: string;
    content: string;
  }
): Promise<Review> {
  const { data, error } = await supabase
    .from("reviews")
    .update({
      rating: updates.rating,
      title: updates.title,
      content: updates.content,
      edited: true,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Review;
}

export async function deleteReview(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function voteReview(
  id: string,
  helpfulCount: number
): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .update({
      helpful_count: helpfulCount,
    })
    .eq("id", id);

  if (error) throw error;
}

// =========================
// WATCHLIST
// =========================

export async function getWatchlist(): Promise<
  WatchlistItem[]
> {
  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("deleted", false)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as WatchlistItem[];
}

export async function addToWatchlist(
  movieId: string,
  status: string
): Promise<WatchlistItem> {
  const { data, error } = await supabase
    .from("watchlist")
    .insert({
      movie_id: movieId,
      user_id: "guest",
      status,
      deleted: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data as WatchlistItem;
}

export async function removeFromWatchlist(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateWatchlistStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from("watchlist")
    .update({
      status,
    })
    .eq("id", id);

  if (error) throw error;
}

// =========================
// GENRES
// =========================

export async function getGenres(): Promise<Genre[]> {
  const { data, error } = await supabase
    .from("genres")
    .select("*")
    .order("name", {
      ascending: true,
    });

  if (error) throw error;

  return (data ?? []) as Genre[];
}

// =========================
// TRENDING SEARCHES
// =========================

export async function getTrendingSearches(): Promise<
  string[]
> {
  const movies = await getTrending();

  return movies
    .map((movie) => movie.title)
    .slice(0, 8);
}

