import { TrendIndicator } from "./TrendIndicator";
import type { LeaderboardRankUser } from "./types";
import { AppText } from "@/components/common/AppText";

interface LeaderboardRankRowProps {
  user: LeaderboardRankUser;
  isLast: boolean;
}

export function LeaderboardRankRow({
  user,
  isLast,
}: LeaderboardRankRowProps) {
  const mainValue = user.pintScore.toFixed(1);
  const mainLabel = "Score";

  return (
    <button
      className={[
        "flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-off-white",
        !isLast ? "border-b border-medium-gray" : "",
      ].join(" ")}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-off-white text-sm font-black text-ink">
        {user.rank}
      </div>

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-black text-white">
        {user.initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <AppText className="truncate" variant="cardTitle">
            {user.name}
          </AppText>
          <TrendIndicator trend={user.trend} />
        </div>

        <AppText className="mt-1 truncate" variant="meta">
          {user.beerCount} beers · {user.totalOunces} oz ·{" "}
          {user.verifiedRate}% verified
        </AppText>
      </div>

      <div className="text-right">
        <AppText as="span" variant="statValue">
          {mainValue}
        </AppText>
        <AppText as="span" variant="statLabel">
          {mainLabel}
        </AppText>
      </div>
    </button>
  );
}
