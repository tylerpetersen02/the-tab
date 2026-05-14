import { Flame } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { LiveSessionBubble } from "./LiveSessionBubble";

interface LiveSession {
  id: string;
  title: string;
  gradient: string;
  isLive: boolean;
  memberCount: number;
}

interface LiveSessionCarouselProps {
  sessions: LiveSession[];
  onSessionClick?: (sessionId: string) => void;
}

export function LiveSessionCarousel({
  sessions,
  onSessionClick,
}: LiveSessionCarouselProps) {
  if (sessions.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-3">
        <SectionHeader
          title="Live Now"
          icon={<Flame className="h-4 w-4 fill-orange text-orange" />}
        />
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {sessions.map((session) => (
          <LiveSessionBubble
            key={session.id}
            {...session}
            onClick={() => onSessionClick?.(session.id)}
          />
        ))}
      </div>
    </div>
  );
}
