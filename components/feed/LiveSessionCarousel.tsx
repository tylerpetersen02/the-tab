import { Flame } from "lucide-react";
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
    <section className="mt-5 px-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-[13px] font-black uppercase tracking-[0.08em] text-[#001524]">
          Live Now
        </h2>
        <Flame className="h-4 w-4 fill-current text-[#ff7d00]" />
      </div>

      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-hide">
        {sessions.map((session) => (
          <LiveSessionBubble
            key={session.id}
            {...session}
            onClick={() => onSessionClick?.(session.id)}
          />
        ))}
      </div>
    </section>
  );
}
