"use client";

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
    <main className="min-h-screen bg-[#FAFAF8] text-[#001524]">
      <div className="mx-auto w-full max-w-md pb-36">
        <div className="px-4">
          <div className="pt-4 pb-3">
            <h1 className="text-[32px] font-black italic tracking-tight text-[#001524]">
              Receipts
            </h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setFilter("stats")}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                filter === "stats"
                  ? "bg-[#ff7d00] text-white"
                  : "bg-[#F3F4F6] text-[#001524] hover:bg-[#E5E7EB]"
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setFilter("badges")}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                filter === "badges"
                  ? "bg-[#ff7d00] text-white"
                  : "bg-[#F3F4F6] text-[#001524] hover:bg-[#E5E7EB]"
              }`}
            >
              Badges
            </button>
          </div>

          {/* Stats Section */}
          {filter === "stats" && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="rounded-lg border border-[#D4D0CC] bg-white p-4"
                >
                  <div className="space-y-2">
                    <p className="text-3xl">{stat.icon}</p>
                    <div>
                      <p className="text-xs text-[#8B8680]">{stat.label}</p>
                      <p className="text-2xl font-bold text-[#001524] mt-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#8B8680] mt-2">{stat.trend}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Badges Section */}
          {filter === "badges" && (
            <div className="mt-6 space-y-6">
              {/* Earned Badges */}
              {badges.filter((b) => b.earned).length > 0 && (
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.08em] text-[#001524] mb-3">
                    Earned
                  </h3>
                  <div className="space-y-3">
                    {badges
                      .filter((b) => b.earned)
                      .map((badge) => (
                        <div
                          key={badge.id}
                          className="rounded-lg border border-[#D4D0CC] bg-white p-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🏆</span>
                            <div>
                              <p className="font-semibold text-[#001524]">
                                {badge.name}
                              </p>
                              <p className="text-sm text-[#8B8680]">
                                {badge.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* In Progress Badges */}
              {badges.filter((b) => !b.earned).length > 0 && (
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[0.08em] text-[#001524] mb-3">
                    In Progress
                  </h3>
                  <div className="space-y-3">
                    {badges
                      .filter((b) => !b.earned)
                      .map((badge) => (
                        <div
                          key={badge.id}
                          className="rounded-lg border border-[#D4D0CC] bg-white p-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl opacity-50">🔒</span>
                            <div className="flex-1">
                              <p className="font-semibold text-[#001524]">
                                {badge.name}
                              </p>
                              <p className="text-sm text-[#8B8680]">
                                {badge.description}
                              </p>
                              <div className="mt-3">
                                <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#ff7d00] rounded-full transition-all"
                                    style={{ width: `${badge.progress}%` }}
                                  />
                                </div>
                                <p className="text-xs text-[#8B8680] mt-1">
                                  {badge.progress}% Complete
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
