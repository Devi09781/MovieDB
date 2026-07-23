"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { WatchlistProvider } from "@/features/watchlist/watchlist-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 2, refetchOnWindowFocus: false } } }));
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider>
        <WatchlistProvider>{children}</WatchlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
