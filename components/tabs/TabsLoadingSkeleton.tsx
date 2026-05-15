export function TabsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-medium-gray bg-white p-4 animate-pulse"
        >
          <div className="h-4 bg-light-gray rounded w-1/3 mb-2" />
          <div className="h-3 bg-light-gray rounded w-2/3 mb-3" />
          <div className="flex gap-3">
            <div className="h-7 bg-light-gray rounded-full w-7" />
            <div className="h-7 bg-light-gray rounded-full w-7" />
            <div className="h-7 bg-light-gray rounded-full w-7" />
          </div>
        </div>
      ))}
    </div>
  );
}
