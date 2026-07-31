/*"use client";

import { useQuery } from "@tanstack/react-query";
import { movieRepository, actorRepository, dataRepository } from "@/repositories";

export function useTrendingMovies() { return useQuery({ queryKey: ["movies", "trending"], queryFn: () => movieRepository.getTrending() }); }
export function useTopRatedMovies() { return useQuery({ queryKey: ["movies", "top-rated"], queryFn: () => movieRepository.getTopRated() }); }
export function useLatestMovies() { return useQuery({ queryKey: ["movies", "latest"], queryFn: () => movieRepository.getLatest() }); }
export function useMovie(id: string) { return useQuery({ queryKey: ["movies", id], queryFn: () => movieRepository.getMovie(id), enabled: !!id }); }
export function useRecommendations(id: string) { return useQuery({ queryKey: ["movies", id, "recs"], queryFn: () => movieRepository.getRecommendations(id), enabled: !!id }); }
export function useSimilarMovies(id: string) { return useQuery({ queryKey: ["movies", id, "sim"], queryFn: () => movieRepository.getSimilar(id), enabled: !!id }); }
export function useMoviesByGenre(slug: string) { return useQuery({ queryKey: ["movies", "genre", slug], queryFn: () => movieRepository.getByGenre(slug), enabled: !!slug }); }
export function useTrendingActors() { return useQuery({ queryKey: ["actors", "trending"], queryFn: () => actorRepository.getActorsTrending() }); }
export function useActor(id: string) { return useQuery({ queryKey: ["actors", id], queryFn: () => actorRepository.getActor(id), enabled: !!id }); }
export function useGenres() { return useQuery({ queryKey: ["genres"], queryFn: () => dataRepository.getGenres() }); }
export function useCollections() { return useQuery({ queryKey: ["collections"], queryFn: () => dataRepository.getCollections() }); }
export function useDirectors() { return useQuery({ queryKey: ["directors"], queryFn: () => dataRepository.getDirectors() }); }
export function useSearch(query: string) { return useQuery({ queryKey: ["search", query], queryFn: () => movieRepository.search(query), enabled: query.length > 1 }); }
