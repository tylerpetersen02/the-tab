import { Zap } from "lucide-react";
import { StatusBadge } from "@/components/common/StatusBadge";

interface SessionChipProps {
  title: string;
  isLive?: boolean;
  onClick?: () => void;
}

export function SessionChip({ title, isLive, onClick }: SessionChipProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onClick}
        className="rounded-full bg-[#FAFAF8] px-3 py-1.5 text-xs font-bold text-[#001524] border border-[#D4D0CC] hover:bg-[#f0f0ed] transition-colors"
      >
        {title}
      </button>

      {isLive && <StatusBadge label="Live" variant="live" icon={<Zap />} />}
    </div>
  );
}
