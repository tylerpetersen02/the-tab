import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface TrendIndicatorProps {
  trend?: "up" | "down" | "same";
}

export function TrendIndicator({ trend }: TrendIndicatorProps) {
  if (!trend || trend === "same") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-off-white">
        <Minus className="h-3 w-3 text-dark-gray" />
      </span>
    );
  }

  if (trend === "up") {
    return (
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal/10">
        <ArrowUp className="h-3 w-3 text-teal" />
      </span>
    );
  }

  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-papaya">
      <ArrowDown className="h-3 w-3 text-orange" />
    </span>
  );
}
