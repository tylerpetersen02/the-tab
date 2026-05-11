interface RecapFeedPostProps {
  id: string;
  sessionTitle: string;
  beersLogged: number;
  pintScore: number;
  mediaCount: number;
  onViewReceipts?: () => void;
}

export function RecapFeedPost({
  id,
  sessionTitle,
  beersLogged,
  pintScore,
  mediaCount,
  onViewReceipts,
}: RecapFeedPostProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#D4D0CC] bg-white shadow-[0_8px_26px_rgba(0,21,36,0.07)]">
      <div className="h-32 bg-gradient-to-br from-[#15616d] to-[#ff7d00]" />

      <div className="p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#ff7d00]">
          Recap Ready
        </p>

        <h3 className="mt-1 text-xl font-black text-[#001524]">
          {sessionTitle}
        </h3>

        <p className="mt-1 text-sm font-semibold text-[#8B8680]">
          {beersLogged} beers · {pintScore} Pint Score · {mediaCount} media
        </p>

        <button
          onClick={onViewReceipts}
          className="mt-4 rounded-full bg-[#001524] px-4 py-2 text-sm font-black text-white hover:bg-[#1a1f28] transition-colors"
        >
          View Receipts
        </button>
      </div>
    </article>
  );
}
