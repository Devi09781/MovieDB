/*import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as repo from "@/lib/repository";

export function useMovies() {
  return useQuery({ queryKey: ["movies"], queryFn: repo.getMovies });
}
export function useMovie(id: string | undefined) {
  return useQuery({ queryKey: ["movie", id], queryFn: () => repo.getMovie(id), enabled: !!id });
}
export function useTrending() {
  return useQuery({ queryKey: ["trending"], queryFn: repo.getTrending });
}
export function usePopular() {
  return useQuery({ queryKey: ["popular"], queryFn: repo.getPopular });
}
export function useTopRated() {
  return useQuery({ queryKey: ["topRated"], queryFn: repo.getTopRated });
}
export function useLatest() {
  return useQuery({ queryKey: ["latest"], queryFn: repo.getLatest });
}
export function useBollywood() {
  return useQuery({ queryKey: ["bollywood"], queryFn: repo.getBollywood });
}
export function useTollywood() {
  return useQuery({ queryKey: ["tollywood"], queryFn: repo.getTollywood });
}
export function useHollywood() {
  return useQuery({ queryKey: ["hollywood"], queryFn: repo.getHollywood });
}
export function useSearch(query: string) {
  return useQuery({ queryKey: ["search", query], queryFn: () => repo.searchMovies(query), enabled: !!query.trim() });
}
export function useActors() {
  return useQuery({ queryKey: ["actors"], queryFn: repo.getActors });
}
export function useActor(id: string | undefined) {
  return useQuery({ queryKey: ["actor", id], queryFn: () => repo.getActor(id), enabled: !!id });
}
export function useReviews(movieId: string) {
  return useQuery({ queryKey: ["reviews", movieId], queryFn: () => repo.getReviews(movieId) });
}
export function useAddReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { movie_id: string; rating: number; title: string; content: string }) => repo.addReview(data),
    onSuccess: (_data, vars) => qc.invalidateQueries({ queryKey: ["reviews", vars.movie_id] }),
  });
}
export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.deleteReview,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reviews"] }),
  });
}
export function useVoteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, helpfulCount }: { id: string; helpfulCount: number; movieId: string }) => repo.voteReview(id, helpfulCount),
    onSuccess: (_data, vars) => qc.invalidateQueries({ queryKey: ["reviews", vars.movieId] }),
  });
}
export function useWatchlist() {
  return useQuery({ queryKey: ["watchlist"], queryFn: repo.getWatchlist });
}
export function useAddToWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ movieId, status }: { movieId: string; status: string }) => repo.addToWatchlist(movieId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}
export function useRemoveFromWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.removeFromWatchlist,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}
export function useUpdateWatchlistStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => repo.updateWatchlistStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["watchlist"] }),
  });
}
export function useGenres() {
  return useQuery({ queryKey: ["genres"], queryFn: repo.getGenres });
}
export function useTrendingSearches() {
  return useQuery({ queryKey: ["trendingSearches"], queryFn: repo.getTrendingSearches });
}
*/





import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import * as repo from "@/lib/repository";

export function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: repo.getMovies,
  });
}

export function useMovie(
  id: string | undefined
) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => repo.getMovie(id),
    enabled: !!id,
  });
}

export function useTrending() {
  return useQuery({
    queryKey: ["trending"],
    queryFn: repo.getTrending,
  });
}

export function usePopular() {
  return useQuery({
    queryKey: ["popular"],
    queryFn: repo.getPopular,
  });
}

export function useTopRated() {
  return useQuery({
    queryKey: ["topRated"],
    queryFn: repo.getTopRated,
  });
}

export function useLatest() {
  return useQuery({
    queryKey: ["latest"],
    queryFn: repo.getLatest,
  });
}

export function useBollywood() {
  return useQuery({
    queryKey: ["bollywood"],
    queryFn: repo.getBollywood,
  });
}

export function useTollywood() {
  return useQuery({
    queryKey: ["tollywood"],
    queryFn: repo.getTollywood,
  });
}

export function useHollywood() {
  return useQuery({
    queryKey: ["hollywood"],
    queryFn: repo.getHollywood,
  });
}

export function useSearch(
  query: string
) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () =>
      repo.searchMovies(query),
    enabled: !!query.trim(),
  });
}

export function useActors() {
  return useQuery({
    queryKey: ["actors"],
    queryFn: repo.getActors,
  });
}

export function useActor(
  id: string | undefined
) {
  return useQuery({
    queryKey: ["actor", id],
    queryFn: () =>
      repo.getActor(id),
    enabled: !!id,
  });
}

export function useReviews(
  movieId: string
) {
  return useQuery({
    queryKey: [
      "reviews",
      movieId,
    ],
    queryFn: () =>
      repo.getReviews(
        movieId
      ),
  });
}

export function useAddReview() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: {
        movie_id: string;
        rating: number;
        title: string;
        content: string;
      }
    ) =>
      repo.addReview(
        data
      ),

    onSuccess: (
      _data,
      vars
    ) =>
      qc.invalidateQueries({
        queryKey: [
          "reviews",
          vars.movie_id,
        ],
      }),
  });
}

/*
  Added hook:
  This is required by
  ReviewsSection.tsx.
*/
export function useUpdateReview() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: {
        rating: number;
        title: string;
        content: string;
      };
    }) =>
      repo.updateReview(
        id,
        updates
      ),

    onSuccess: () => {
      /*
        The movie ID is not
        available in the mutation
        variables, so invalidate
        all review queries.
      */
      qc.invalidateQueries({
        queryKey: [
          "reviews",
        ],
      });
    },
  });
}

export function useDeleteReview() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn:
      repo.deleteReview,

    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [
          "reviews",
        ],
      }),
  });
}

export function useVoteReview() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      helpfulCount,
    }: {
      id: string;
      helpfulCount: number;
      movieId: string;
    }) =>
      repo.voteReview(
        id,
        helpfulCount
      ),

    onSuccess: (
      _data,
      vars
    ) =>
      qc.invalidateQueries({
        queryKey: [
          "reviews",
          vars.movieId,
        ],
      }),
  });
}

export function useWatchlist() {
  return useQuery({
    queryKey: [
      "watchlist",
    ],
    queryFn:
      repo.getWatchlist,
  });
}

export function useAddToWatchlist() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      movieId,
      status,
    }: {
      movieId: string;
      status: string;
    }) =>
      repo.addToWatchlist(
        movieId,
        status
      ),

    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [
          "watchlist",
        ],
      }),
  });
}

export function useRemoveFromWatchlist() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn:
      repo.removeFromWatchlist,

    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [
          "watchlist",
        ],
      }),
  });
}

export function useUpdateWatchlistStatus() {
  const qc =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) =>
      repo.updateWatchlistStatus(
        id,
        status
      ),

    onSuccess: () =>
      qc.invalidateQueries({
        queryKey: [
          "watchlist",
        ],
      }),
  });
}

export function useGenres() {
  return useQuery({
    queryKey: [
      "genres",
    ],
    queryFn:
      repo.getGenres,
  });
}

export function useTrendingSearches() {
  return useQuery({
    queryKey: [
      "trendingSearches",
    ],
    queryFn:
      repo.getTrendingSearches,
  });
}

