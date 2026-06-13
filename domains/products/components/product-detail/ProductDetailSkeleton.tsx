export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-8 pt-28">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-[3/4] bg-zinc-100 rounded-xl animate-pulse" />
        <div className="space-y-6">
          <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse" />
          <div className="h-8 w-3/4 bg-zinc-100 rounded animate-pulse" />
          <div className="h-6 w-32 bg-zinc-100 rounded animate-pulse" />
          <div className="h-10 w-40 bg-zinc-100 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-zinc-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-zinc-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
