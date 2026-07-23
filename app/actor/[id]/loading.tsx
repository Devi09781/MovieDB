import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (<div className="mx-auto max-w-5xl px-4 py-8 sm:px-8"><div className="flex gap-6"><Skeleton className="h-48 w-48 rounded-full" /><div className="flex-1 space-y-3"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-4 w-1/3" /><Skeleton className="h-24 w-full" /></div></div></div>);
}
