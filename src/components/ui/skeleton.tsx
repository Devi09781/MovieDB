export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />;
}
export function MovieCardSkeleton() {
  return (<div className="w-[160px] flex-shrink-0 sm:w-[200px]"><Skeleton className="aspect-[2/3] w-full rounded-xl" /><Skeleton className="mt-2 h-4 w-3/4" /><Skeleton className="mt-1 h-3 w-1/2" /></div>);
}
export function MovieRailSkeleton({ count = 6 }: { count?: number }) {
  return (<div className="flex gap-4 overflow-hidden">{Array.from({ length: count }).map((_, i) => <MovieCardSkeleton key={i} />)}</div>);
}
export function HeroSkeleton() { return (<div className="h-[60vh] w-full"><Skeleton className="h-full w-full rounded-none" /></div>); }
export function ActorCardSkeleton() { return (<div className="w-[140px] flex-shrink-0"><Skeleton className="aspect-square w-full rounded-full" /><Skeleton className="mx-auto mt-2 h-4 w-3/4" /></div>); }
