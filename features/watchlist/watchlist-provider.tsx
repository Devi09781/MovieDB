"use client";

import { createContext, useContext, useRef, useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { watchlistRepository } from "@/repositories";
import type { WatchlistItem } from "@/types";

const USER_ID = "local-user";
const STORAGE_KEY = "cinedb-watchlist";

interface WatchlistContextValue {
  items: WatchlistItem[];
  isInWatchlist: (movieId: string) => boolean;
  add: (movieId: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  undoRemove: () => Promise<void>;
  updateStatus: (id: string, status: WatchlistItem["status"]) => Promise<void>;
  lastAction: string | null;
}
const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();
  const lastRemoved = useRef<WatchlistItem | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const { data: items = [] } = useQuery({
    queryKey: ["watchlist", USER_ID],
    queryFn: async () => {
      const remote = await watchlistRepository.getByUser(USER_ID);
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as WatchlistItem[];
      const merged = [...remote];
      for (const l of local) if (!merged.find((m) => m.movieId === l.movieId)) merged.push(l);
      return merged;
    },
  });

  const addMutation = useMutation({
    mutationFn: (movieId: string) => watchlistRepository.add({ movieId, userId: USER_ID, status: "planned" }),
    onMutate: async (movieId) => {
      await qc.cancelQueries({ queryKey: ["watchlist", USER_ID] });
      const prev = qc.getQueryData<WatchlistItem[]>(["watchlist", USER_ID]) ?? [];
      const optimistic: WatchlistItem = { id: `temp-${movieId}`, movieId, userId: USER_ID, addedAt: Date.now(), status: "planned" };
      qc.setQueryData<WatchlistItem[]>(["watchlist", USER_ID], [optimistic, ...prev]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([optimistic, ...prev]));
      return { prev };
    },
    onError: (_e, _m, ctx) => qc.setQueryData(["watchlist", USER_ID], ctx?.prev ?? []),
    onSuccess: async () => { await qc.invalidateQueries({ queryKey: ["watchlist", USER_ID] }); setLastAction("Added to watchlist"); },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => watchlistRepository.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["watchlist", USER_ID] });
      const prev = qc.getQueryData<WatchlistItem[]>(["watchlist", USER_ID]) ?? [];
      const removed = prev.find((i) => i.id === id);
      if (removed) lastRemoved.current = removed;
      qc.setQueryData<WatchlistItem[]>(["watchlist", USER_ID], prev.filter((i) => i.id !== id));
      return { prev };
    },
    onError: (_e, _id, ctx) => qc.setQueryData(["watchlist", USER_ID], ctx?.prev ?? []),
    onSuccess: async () => { await qc.invalidateQueries({ queryKey: ["watchlist", USER_ID] }); setLastAction("Removed from watchlist"); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: WatchlistItem["status"] }) => watchlistRepository.update(id, { status }),
    onMutate: async ({ id, status }) => {
      const prev = qc.getQueryData<WatchlistItem[]>(["watchlist", USER_ID]) ?? [];
      qc.setQueryData<WatchlistItem[]>(["watchlist", USER_ID], prev.map((i) => (i.id === id ? { ...i, status } : i)));
      return { prev };
    },
    onSuccess: async () => { await qc.invalidateQueries({ queryKey: ["watchlist", USER_ID] }); setLastAction("Watchlist updated"); },
  });

  const add = useCallback(async (movieId: string) => { await addMutation.mutateAsync(movieId); }, [addMutation]);
  const remove = useCallback(async (id: string) => { await removeMutation.mutateAsync(id); }, [removeMutation]);
  const undoRemove = useCallback(async () => { if (lastRemoved.current) { await addMutation.mutateAsync(lastRemoved.current.movieId); lastRemoved.current = null; setLastAction("Undo: restored"); } }, [addMutation]);
  const updateStatus = useCallback(async (id: string, status: WatchlistItem["status"]) => { await updateMutation.mutateAsync({ id, status }); }, [updateMutation]);
  const isInWatchlist = useCallback((movieId: string) => items.some((i) => i.movieId === movieId && !i.deleted), [items]);

  return <WatchlistContext.Provider value={{ items, isInWatchlist, add, remove, undoRemove, updateStatus, lastAction }}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within WatchlistProvider");
  return ctx;
}
