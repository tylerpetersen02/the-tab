"use client";

import { useMemo, useState } from "react";
import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { PageSection } from "@/components/common/PageSection";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { StatCard } from "@/components/common/StatCard";
import { TopThreePodium } from "@/components/leaderboard/TopThreePodium";
import { LeaderboardRankList } from "@/components/leaderboard/LeaderboardRankList";
import { LeaderboardHighlights } from "@/components/leaderboard/LeaderboardHighlights";
import type { LeaderboardRankUser } from "@/components/leaderboard/types";

type TimeFilter = "week" | "month" | "year" | "all_time";

type LeaderboardUser = LeaderboardRankUser;

const mockUsers: LeaderboardUser[] = [
  {
    id: "u1",
    rank: 1,
    name: "Tyler",
    initials: "TP",
    pintScore: 28.4,
    beerCount: 31,
    totalOunces: 454,
    verifiedRate: 82,
    bonusDrinks: 6,
    trend: "up",
  },
  {
    id: "u2",
    rank: 2,
    name: "Mike",
    initials: "MK",
    pintScore: 25.1,
    beerCount: 27,
    totalOunces: 402,
    verifiedRate: 88,
    bonusDrinks: 4,
    trend: "same",
  },
  {
    id: "u3",
    rank: 3,
    name: "Dan",
    initials: "DN",
    pintScore: 22.7,
    beerCount: 25,
    totalOunces: 363,
    verifiedRate: 76,
    bonusDrinks: 8,
    trend: "down",
  },
  {
    id: "u4",
    rank: 4,
    name: "Ryan",
    initials: "RY",
    pintScore: 20.8,
    beerCount: 23,
    totalOunces: 333,
    verifiedRate: 69,
    bonusDrinks: 3,
    trend: "up",
  },
  {
    id: "u5",
    rank: 5,
    name: "Nick",
    initials: "NK",
    pintScore: 18.3,
    beerCount: 20,
    totalOunces: 293,
    verifiedRate: 74,
    bonusDrinks: 5,
    trend: "same",
  },
  {
    id: "u6",
    rank: 6,
    name: "Zach",
    initials: "ZA",
    pintScore: 16.0,
    beerCount: 18,
    totalOunces: 256,
    verifiedRate: 80,
    bonusDrinks: 2,
    trend: "up",
  },
];

export default function LeaderboardPage() {
  const [activeTime, setActiveTime] = useState<TimeFilter>("week");

  const sortedUsers = useMemo(() => {
    return [...mockUsers]
      .sort((a, b) => b.pintScore - a.pintScore)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  }, []);

  const timeOptions = [
    { label: "This Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
    { label: "All Time", value: "all_time" },
  ];

  return (
    <AppPage>
      <AppHeader title="Leaderboard" subtitle="Who's on top?" />

      <PageSection>
        <SegmentedControl
          options={timeOptions}
          value={activeTime}
          onChange={(val) => setActiveTime(val as TimeFilter)}
          variant="secondary"
        />
      </PageSection>

      <PageSection>
        <StatCard
          label="This Week"
          value="117.3 Pint Score"
          detail="6 buddies ranked · 124 beers logged"
        />
      </PageSection>

      <PageSection>
        <TopThreePodium users={sortedUsers.slice(0, 3)} />
      </PageSection>

      <PageSection>
        <LeaderboardRankList users={sortedUsers} />
      </PageSection>

      <PageSection>
        <LeaderboardHighlights />
      </PageSection>
    </AppPage>
  );
}
