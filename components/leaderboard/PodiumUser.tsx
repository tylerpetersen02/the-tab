import { Crown } from "lucide-react";
import type { LeaderboardRankUser } from "./types";
import { AppText } from "@/components/common/AppText";

interface PodiumUserProps {
  user: LeaderboardRankUser;
  size: "primary" | "secondary";
}

export function PodiumUser({ user, size }: PodiumUserProps) {
  const isPrimary = size === "primary";

  const ringClass =
    user.rank === 1
      ? "ring-[#FFD700]"
      : user.rank === 2
        ? "ring-medium-gray"
        : "ring-brandy";

  const bgClass =
    user.rank === 1
      ? "bg-orange"
      : user.rank === 2
        ? "bg-teal"
        : "bg-ink";

  const sizeClass = isPrimary ? "h-20 w-20" : "h-16 w-16";
  const textClass = isPrimary ? "text-lg" : "text-base";
  const scoreClass = isPrimary ? "text-xl" : "text-lg";

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={[
          "relative flex items-center justify-center rounded-full ring-4",
          ringClass,
          bgClass,
          sizeClass,
        ].join(" ")}
      >
        <span className={["font-black text-white", textClass].join(" ")}>
          {user.initials}
        </span>

        <span
          className={[
            "absolute -top-2 flex items-center justify-center rounded-full font-black text-white shadow-md",
            user.rank === 1
              ? "bg-[#FFD700]"
              : user.rank === 2
                ? "bg-medium-gray"
                : "bg-brandy",
            isPrimary ? "h-7 w-7 text-xs" : "h-6 w-6 text-[10px]",
          ].join(" ")}
        >
          {user.rank}
        </span>
      </div>

      <AppText as="p" className="mt-3 flex items-center justify-center">
        <span className="font-black text-ink">{user.name}</span>
        {user.rank === 1 && (
          <Crown className="ml-1 h-3 w-3 fill-orange text-orange" />
        )}
      </AppText>

      <AppText as="p" variant="statValue" className="mt-1">
        {user.pintScore.toFixed(1)}
      </AppText>

      <AppText variant="statLabel" className="mt-1">
        Pint Score
      </AppText>
    </div>
  );
}
