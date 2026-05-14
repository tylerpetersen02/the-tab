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
        className="rounded-full bg-off-white px-3 py-2 text-xs font-bold text-ink border border-medium-gray hover:bg-light-gray transition-colors"
      >
        {title}
      </button>

      {isLive && <StatusBadge label="Live" variant="live" icon={<Zap className="h-3 w-3" />} />}
    </div>
  );
}
