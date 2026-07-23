import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (<div className="pb-16"><Skeleton className="h-[50vh] w-full rounded-none" /><div className="mx-auto max-w-6xl px-4 py-8 sm:px-8"><Skeleton className="h-10 w-2/3" /><Skeleton className="mt-4 h-4 w-1/3" /><Skeleton className="mt-8 h-48 w-full rounded-xl" /></div></div>);
}
