export function TabsLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-[#D4D0CC] bg-white p-4 animate-pulse"
        >
          <div className="h-4 bg-[#F3F4F6] rounded w-1/3 mb-2" />
          <div className="h-3 bg-[#F3F4F6] rounded w-2/3 mb-3" />
          <div className="flex gap-3">
            <div className="h-7 bg-[#F3F4F6] rounded-full w-7" />
            <div className="h-7 bg-[#F3F4F6] rounded-full w-7" />
            <div className="h-7 bg-[#F3F4F6] rounded-full w-7" />
          </div>
        </div>
      ))}
    </div>
  );
}
