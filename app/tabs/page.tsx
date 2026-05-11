"use client";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function TabsPage() {
  const [filter, setFilter] = useState<"active" | "ended">("active");

  const tabs = [
    {
      id: 1,
      title: "Friday Night Alpha",
      location: "Las Vegas",
      members: 4,
      status: "active" as const,
      total: 145.75,
    },
    {
      id: 2,
      title: "Vegas Vibes 2",
      location: "Las Vegas",
      members: 6,
      status: "active" as const,
      total: 218.5,
    },
    {
      id: 3,
      title: "Paso Trip",
      location: "Paso Robles",
      members: 6,
      status: "ended" as const,
      total: 542.3,
    },
    {
      id: 4,
      title: "Weekend Kickoff",
      location: "San Francisco",
      members: 5,
      status: "ended" as const,
      total: 387.45,
    },
  ];

  const filteredTabs = tabs.filter((tab) => tab.status === filter);

  return (
    <Page title="Tabs">
      <div className="space-y-4">
        {/* Create New Tab Button */}
        <Button className="w-full gap-2">
          <Plus size={20} />
          Start New Tab
        </Button>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {(["active", "ended"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filter === status
                  ? "bg-orange text-white"
                  : "bg-light-gray text-ink"
              }`}
            >
              {status === "active" ? "Active" : "Ended"}
            </button>
          ))}
        </div>

        {/* Tab Cards */}
        <div className="space-y-3">
          {filteredTabs.length > 0 ? (
            filteredTabs.map((tab) => (
              <Card key={tab.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{tab.title}</CardTitle>
                      <CardDescription>
                        {tab.location} • {tab.members} members
                      </CardDescription>
                    </div>
                    <Badge
                      variant={tab.status === "active" ? "default" : "secondary"}
                    >
                      {tab.status === "active" ? "ACTIVE" : "ENDED"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="pt-2 border-t border-medium-gray">
                    <p className="text-xs text-dark-gray">Total</p>
                    <p className="text-2xl font-bold text-orange mt-1">
                      ${tab.total.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-dark-gray">
                {filter === "active" ? "No active tabs" : "No ended tabs"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
