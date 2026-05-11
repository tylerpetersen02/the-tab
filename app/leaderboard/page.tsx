"use client";

import { Page } from "@/components/layout/Page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<"week" | "month" | "all">("all");

  const leaderboard = [
    {
      id: 1,
      name: "Tyler Petersen",
      pints: 47.5,
      beers: 76,
      verification: 95,
      rank: 1,
    },
    {
      id: 2,
      name: "Michael Chen",
      pints: 42.3,
      beers: 68,
      verification: 88,
      rank: 2,
    },
    {
      id: 3,
      name: "Stephen Rodriguez",
      pints: 39.8,
      beers: 64,
      verification: 92,
      rank: 3,
    },
    {
      id: 4,
      name: "Erik Hansen",
      pints: 35.2,
      beers: 56,
      verification: 85,
      rank: 4,
    },
    {
      id: 5,
      name: "Alex Murphy",
      pints: 31.6,
      beers: 51,
      verification: 78,
      rank: 5,
    },
    {
      id: 6,
      name: "Jordan Lee",
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
    <Page title="Leaderboard">
      <div className="space-y-4">
        {/* Filter Buttons */}
        <div className="flex gap-2">
          {(["week", "month", "all"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setFilter(period)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === period
                  ? "bg-orange text-white"
                  : "bg-light-gray text-ink"
              }`}
            >
              {period === "week" ? "This Week" : period === "month" ? "This Month" : "All Time"}
            </button>
          ))}
        </div>

        {/* Leaderboard Cards */}
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMedalEmoji(user.rank) || `#${user.rank}`}</span>
                    <div>
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <CardDescription>{user.beers} beers logged</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-orange">{user.pints}</p>
                    <p className="text-xs text-dark-gray">pints</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-xs text-dark-gray">Verification</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-medium-gray rounded-full h-2">
                      <div
                        className="bg-orange h-2 rounded-full"
                        style={{ width: `${user.verification}%` }}
                      />
                    </div>
                    <p className="text-xs font-medium text-ink">{user.verification}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}
