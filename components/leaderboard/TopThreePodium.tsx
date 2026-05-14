import { shadows } from "@/lib/shadows";
import { PodiumUser } from "./PodiumUser";
import type { LeaderboardRankUser } from "./types";

interface TopThreePodiumProps {
  users: LeaderboardRankUser[];
}

export function TopThreePodium({ users }: TopThreePodiumProps) {
  const first = users.find((u) => u.rank === 1);
  const second = users.find((u) => u.rank === 2);
  const third = users.find((u) => u.rank === 3);

  if (!first || !second || !third) return null;

  return (
    <div className={`rounded-[30px] border border-medium-gray bg-white px-4 py-5 ${shadows.feed}`}>
        <div className="grid grid-cols-3 items-end gap-3">
          <PodiumUser user={second} size="secondary" />
          <PodiumUser user={first} size="primary" />
          <PodiumUser user={third} size="secondary" />
        </div>
      </div>
  );
}
