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
      <div className="relative h-[80px] w-[80px] rounded-full p-[3px] bg-gradient-to-br from-[#ff7d00] to-[#15616d]">
        <div
          className={`h-full w-full rounded-full bg-gradient-to-br ${gradient} border-2 border-white shadow-[0_6px_18px_rgba(0,21,36,0.12)]`}
        />
        {isLive && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-[#ff7d00] px-2 py-0.5 text-[8px] font-black uppercase text-white">
            Live
          </span>
        )}
      </div>

      <div className="mt-2 h-8 flex items-center justify-center">
        <p className="line-clamp-2 text-center text-[10px] font-semibold leading-snug text-[#001524]">
          {title}
        </p>
      </div>
    </button>
  );
}
