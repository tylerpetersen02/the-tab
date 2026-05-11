"use client";

import { Page } from "@/components/layout/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ReceiptsPage() {
  const [filter, setFilter] = useState<"stats" | "badges">("stats");

  const stats = [
    {
      id: 1,
      label: "Total Beers Logged",
      value: "76",
      icon: "🍺",
      trend: "+3 this week",
    },
    {
      id: 2,
      label: "Pint Score",
      value: "47.5",
      icon: "📊",
      trend: "+2.1 this week",
    },
    {
      id: 3,
      label: "Favorite Beer",
      value: "IPA",
      icon: "⭐",
      trend: "15 logged",
    },
    {
      id: 4,
      label: "Highest Tab",
      value: "$542.30",
      icon: "💰",
      trend: "Paso Trip",
    },
  ];

  const badges = [
    {
      id: 1,
      name: "Century Club",
      description: "Logged 100 beers",
      earned: false,
      progress: 76,
    },
    {
      id: 2,
      name: "50 Pint Club",
      description: "Reached 50 pints",
      earned: false,
      progress: 95,
    },
    {
      id: 3,
      name: "Social Butterfly",
      description: "Participated in 10 tabs",
      earned: true,
      progress: 100,
    },
    {
      id: 4,
      name: "Night Owl",
      description: "Logged drinks after midnight",
      earned: true,
      progress: 100,
    },
    {
      id: 5,
      name: "Weekend Warrior",
      description: "10 drinks in one weekend",
      earned: true,
      progress: 100,
    },
    {
      id: 6,
      name: "Local Expert",
      description: "Tried 25 different beers",
      earned: false,
      progress: 68,
    },
  ];

  return (
    <Page title="Receipts">
      <div className="space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("stats")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === "stats" ? "bg-orange text-white" : "bg-light-gray text-ink"
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setFilter("badges")}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === "badges" ? "bg-orange text-white" : "bg-light-gray text-ink"
            }`}
          >
            Badges
          </button>
        </div>

        {/* Stats Section */}
        {filter === "stats" && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <Card key={stat.id}>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-3xl">{stat.icon}</p>
                    <div>
                      <p className="text-xs text-dark-gray">{stat.label}</p>
                      <p className="text-2xl font-bold text-ink mt-1">{stat.value}</p>
                      <p className="text-xs text-dark-gray mt-2">{stat.trend}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Badges Section */}
        {filter === "badges" && (
          <div className="space-y-4">
            {/* Earned Badges */}
            {badges.filter((b) => b.earned).length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-ink mb-3">Earned</h3>
                <div className="space-y-2">
                  {badges
                    .filter((b) => b.earned)
                    .map((badge) => (
                      <Card key={badge.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🏆</span>
                            <div>
                              <p className="font-semibold text-ink">{badge.name}</p>
                              <p className="text-sm text-dark-gray">{badge.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* In Progress Badges */}
            {badges.filter((b) => !b.earned).length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-ink mb-3">In Progress</h3>
                <div className="space-y-2">
                  {badges
                    .filter((b) => !b.earned)
                    .map((badge) => (
                      <Card key={badge.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl opacity-50">🔒</span>
                            <div className="flex-1">
                              <p className="font-semibold text-ink">{badge.name}</p>
                              <p className="text-sm text-dark-gray">{badge.description}</p>
                              <div className="mt-3">
                                <div className="flex-1 bg-medium-gray rounded-full h-2">
                                  <div
                                    className="bg-orange h-2 rounded-full"
                                    style={{ width: `${badge.progress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-dark-gray mt-1">
                                  {badge.progress}% Complete
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Page>
  );
}
