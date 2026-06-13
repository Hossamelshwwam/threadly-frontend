export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-zinc-200 rounded-md animate-pulse" />

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-7 flex gap-4">
            <div className="hidden sm:flex flex-col gap-3 w-20">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] w-full bg-zinc-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
            <div className="flex-1 aspect-[4/5] sm:aspect-[3/4] bg-zinc-200 rounded-3xl animate-pulse" />
          </div>

          {/* Right Column Skeleton */}
          <div className="mt-10 lg:col-span-5 lg:mt-0">
            <div className="flex flex-col gap-8 rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-zinc-100">
              <div className="space-y-4">
                <div className="h-4 w-24 bg-zinc-200 rounded-md animate-pulse" />
                <div className="h-10 w-3/4 bg-zinc-200 rounded-lg animate-pulse" />
                <div className="h-6 w-32 bg-zinc-200 rounded-md animate-pulse" />
              </div>

              <div className="h-12 w-48 bg-zinc-200 rounded-xl animate-pulse" />

              <div className="space-y-3">
                <div className="h-4 w-full bg-zinc-200 rounded-md animate-pulse" />
                <div className="h-4 w-5/6 bg-zinc-200 rounded-md animate-pulse" />
                <div className="h-4 w-4/6 bg-zinc-200 rounded-md animate-pulse" />
              </div>

              <div className="h-14 w-full bg-zinc-200 rounded-xl animate-pulse mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
