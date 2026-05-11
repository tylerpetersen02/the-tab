"use client";

import { Search } from "lucide-react";

interface TabsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TabsSearch({ value, onChange }: TabsSearchProps) {
  return (
    <div className="relative mt-5 h-12 flex items-center">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8680]" />
      <input
        type="text"
        placeholder="Search your tabs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#D4D0CC] bg-white pl-10 pr-4 py-3 text-sm leading-none placeholder:text-[#8B8680] focus:border-[#15616d] focus:outline-none focus:ring-2 focus:ring-[#15616d]/10"
      />
    </div>
  );
}
