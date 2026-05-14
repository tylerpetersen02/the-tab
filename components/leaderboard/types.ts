export type LeaderboardRankUser = {
  id: string;
  rank: number;
  name: string;
  initials: string;
  pintScore: number;
  beerCount: number;
  totalOunces: number;
  verifiedRate: number;
  bonusDrinks: number;
  trend?: "up" | "down" | "same";
};
