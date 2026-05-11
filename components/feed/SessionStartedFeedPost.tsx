interface SessionStartedFeedPostProps {
  id: string;
  user: string;
  session: string;
  onJoin?: () => void;
}

export function SessionStartedFeedPost({
  id,
  user,
  session,
  onJoin,
}: SessionStartedFeedPostProps) {
  return (
    <article className="rounded-[24px] border border-[#D4D0CC] bg-white p-4 shadow-[0_6px_20px_rgba(0,21,36,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-[#001524]">
            {user} started a tab
          </p>
          <p className="mt-1 text-sm font-semibold text-[#8B8680]">
            {session} · Live now
          </p>
        </div>

        <button
          onClick={onJoin}
          className="rounded-full bg-[#ff7d00] px-4 py-2 text-sm font-black text-white hover:bg-[#e67300] transition-colors shrink-0"
        >
          Join
        </button>
      </div>
    </article>
  );
}
