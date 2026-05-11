"use client";

type FilterType = "all" | "live" | "recent" | "mine" | "archived";

interface TabsFilterPillsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "recent", label: "Recent" },
  { value: "mine", label: "Mine" },
  { value: "archived", label: "Archived" },
];

export function TabsFilterPills({
  activeFilter,
  onFilterChange,
}: TabsFilterPillsProps) {
  return (
    <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
            activeFilter === filter.value
              ? "bg-[#15616d] text-white"
              : "bg-[#F3F4F6] text-[#001524] hover:bg-[#E5E7EB]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
