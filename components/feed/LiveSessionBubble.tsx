import { Zap } from "lucide-react";
import { shadows } from "@/lib/shadows";
import { AppText } from "@/components/common/AppText";
import { StatusBadge } from "@/components/common/StatusBadge";

interface LiveSessionBubbleProps {
  id: string;
  title: string;
  gradient: string;
  isLive: boolean;
  onClick?: () => void;
}

export function LiveSessionBubble({
  id,
  title,
  gradient,
  isLive,
  onClick,
}: LiveSessionBubbleProps) {
  return (
    <button
      onClick={onClick}
      className="w-[88px] shrink-0 text-left hover:opacity-90 transition-opacity"
    >
      <div className="relative h-[80px] w-[80px] rounded-full p-[3px] bg-gradient-to-br from-orange to-teal">
        <div
          className={`h-full w-full rounded-full bg-gradient-to-br ${gradient} border-2 border-white ${shadows.liveBubble}`}
        />
        {isLive && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <StatusBadge label="Live" variant="live" icon={<Zap className="h-3 w-3" />} />
          </div>
        )}
      </div>

      <div className="mt-2 h-8 flex items-center justify-center">
        <AppText
          as="p"
          variant="tinyLabel"
          className="line-clamp-2 text-center"
        >
          {title}
        </AppText>
      </div>
    </button>
  );
}
