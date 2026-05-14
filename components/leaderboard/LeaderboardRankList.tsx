import { LeaderboardRankRow } from "./LeaderboardRankRow";
import type { LeaderboardRankUser } from "./types";

interface LeaderboardRankListProps {
  users: LeaderboardRankUser[];
}

export function LeaderboardRankList({
  users,
}: LeaderboardRankListProps) {
  const remainingUsers = users.filter((u) => u.rank > 3);

  return (
    <div className="overflow-hidden rounded-[28px] border border-medium-gray bg-white shadow-[0_8px_26px_rgba(0,21,36,0.06)]">
        {remainingUsers.map((user, index) => (
          <LeaderboardRankRow
            key={user.id}
            user={user}
            isLast={index === remainingUsers.length - 1}
          />
        ))}
      </div>
  );
}
