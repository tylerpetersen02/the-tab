"use client";

interface TabsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TabsSearch({ value, onChange }: TabsSearchProps) {
  return (
    <input
      type="text"
      placeholder="Search tabs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-[20px] border border-medium-gray bg-white px-4 py-3 text-ink placeholder:text-dark-gray focus:border-teal focus:outline-none focus:ring-1 focus:ring-teal/20"
    />
  );
}
