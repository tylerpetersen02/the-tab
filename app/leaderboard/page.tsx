"use client";

import { useState } from "react";
import { UserAvatar } from "@/components/common/UserAvatar";

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<"week" | "month" | "all">("all");

  const leaderboard = [
    {
      id: 1,
      name: "Tyler Petersen",
      initials: "TP",
      pints: 47.5,
      beers: 76,
      verification: 95,
      rank: 1,
    },
    {
      id: 2,
      name: "Michael Chen",
      initials: "MC",
      pints: 42.3,
      beers: 68,
      verification: 88,
      rank: 2,
    },
    {
      id: 3,
      name: "Stephen Rodriguez",
      initials: "SR",
      pints: 39.8,
      beers: 64,
      verification: 92,
      rank: 3,
    },
    {
      id: 4,
      name: "Erik Hansen",
      initials: "EH",
      pints: 35.2,
      beers: 56,
      verification: 85,
      rank: 4,
    },
    {
      id: 5,
      name: "Alex Murphy",
      initials: "AM",
      pints: 31.6,
      beers: 51,
      verification: 78,
      rank: 5,
    },
    {
      id: 6,
      name: "Jordan Lee",
      initials: "JL",
      pints: 28.9,
      beers: 46,
      verification: 82,
      rank: 6,
    },
  ];

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#001524]">
      <div className="mx-auto w-full max-w-md pb-36">
        <div className="px-4">
          <div className="pt-4 pb-3">
            <h1 className="text-[32px] font-black italic tracking-tight text-[#001524]">
              Leaderboard
            </h1>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mt-5">
            {(["week", "month", "all"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setFilter(period)}
                className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  filter === period
                    ? "bg-[#ff7d00] text-white"
                    : "bg-[#F3F4F6] text-[#001524] hover:bg-[#E5E7EB]"
                }`}
              >
                {period === "week"
                  ? "This Week"
                  : period === "month"
                    ? "This Month"
                    : "All Time"}
              </button>
            ))}
          </div>

          {/* Leaderboard Cards */}
          <div className="mt-6 space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.id}
                className="rounded-lg border border-[#D4D0CC] bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">
                      {getMedalEmoji(user.rank) || `#${user.rank}`}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-extrabold text-[#001524]">
                        {user.name}
                      </h3>
                      <p className="text-xs text-[#8B8680]">
                        {user.beers} beers logged
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#ff7d00]">
                      {user.pints}
                    </p>
                    <p className="text-xs text-[#8B8680]">pints</p>
                  </div>
                </div>

                {/* Verification Progress Bar */}
                <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                  <p className="text-xs text-[#8B8680] mb-2">Verification</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#ff7d00] rounded-full transition-all"
                        style={{ width: `${user.verification}%` }}
                      />
                    </div>
                    <p className="text-xs font-medium text-[#001524]">
                      {user.verification}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
