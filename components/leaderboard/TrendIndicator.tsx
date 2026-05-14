import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface TrendIndicatorProps {
  trend?: "up" | "down" | "same";
}

export function TrendIndicator({ trend }: TrendIndicatorProps) {
  if (!trend || trend === "same") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FAFAF8]">
        <Minus className="h-3 w-3 text-[#8B8680]" />
      </span>
    );
  }

  if (trend === "up") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#DFF4F2]">
        <ArrowUp className="h-3 w-3 text-[#15616d]" />
      </span>
    );
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ffecd1]">
      <ArrowDown className="h-3 w-3 text-[#ff7d00]" />
    </span>
  );
}
