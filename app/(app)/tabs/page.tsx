"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { PageSection } from "@/components/common/PageSection";
import { FilterPills } from "@/components/common/FilterPills";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TabsSearch } from "@/components/tabs/TabsSearch";
import { TabListCard } from "@/components/tabs/TabListCard";
import { TabsEmptyState } from "@/components/tabs/TabsEmptyState";

type FilterType = "all" | "live" | "recent" | "mine" | "archived";

interface Tab {
  id: string;
  title: string;
  description?: string;
  isLive: boolean;
  memberCount: number;
  createdTime: string;
  memberInitials: string[];
  category: "live" | "recent" | "mine" | "archived";
}

const mockTabs: Tab[] = [
  {
    id: "tab-1",
    title: "Friday Night Alpha",
    description: "The crew's weekly golf outing + drinks",
    isLive: true,
    memberCount: 6,
    createdTime: "2h ago",
    memberInitials: ["TP", "MK", "RY", "DN", "AM", "JR"],
    category: "live",
  },
  {
    id: "tab-2",
    title: "Post Golf Boys",
    description: "After 18 at Torrey Pines",
    isLive: true,
    memberCount: 4,
    createdTime: "3h ago",
    memberInitials: ["MK", "RY", "TP"],
    category: "live",
  },
  {
    id: "tab-3",
    title: "Brewery Crawl",
    description: "Downtown San Diego crawl",
    isLive: true,
    memberCount: 5,
    createdTime: "4h ago",
    memberInitials: ["AM", "JR", "DN"],
    category: "live",
  },
  {
    id: "tab-4",
    title: "Taco Tuesday",
    isLive: false,
    memberCount: 8,
    createdTime: "2 days ago",
    memberInitials: ["TP", "MK", "RY", "DN", "AM", "JR", "CH", "BR"],
    category: "recent",
  },
  {
    id: "tab-5",
    title: "Beach Day",
    isLive: false,
    memberCount: 12,
    createdTime: "1 week ago",
    memberInitials: ["TP", "MK", "RY", "DN"],
    category: "recent",
  },
  {
    id: "tab-6",
    title: "My Solo Tab",
    isLive: false,
    memberCount: 1,
    createdTime: "3 days ago",
    memberInitials: ["TP"],
    category: "mine",
  },
  {
    id: "tab-7",
    title: "Vegas Trip 2025",
    isLive: false,
    memberCount: 10,
    createdTime: "1 month ago",
    memberInitials: ["TP", "MK", "RY"],
    category: "archived",
  },
];

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Live", value: "live" },
  { label: "Recent", value: "recent" },
  { label: "Mine", value: "mine" },
  { label: "Archived", value: "archived" },
];

export default function TabsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredTabs = mockTabs.filter((tab) => {
    const matchesSearch = tab.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && tab.category === activeFilter;
  });

  const liveTabs = filteredTabs.filter((tab) => tab.isLive);
  const recentTabs = filteredTabs.filter((tab) => !tab.isLive);

  const handleTabClick = (tabId: string) => {
    console.log("Navigate to tab:", tabId);
    // TODO: Navigate to tab detail page
  };

  return (
    <AppPage>
      <AppHeader title="Tabs" subtitle="Manage your sessions." />

      <PageSection>
        <TabsSearch value={searchQuery} onChange={setSearchQuery} />
      </PageSection>

      <PageSection>
        <FilterPills
          options={filterOptions}
          value={activeFilter}
          onChange={(value) => setActiveFilter(value as FilterType)}
          variant="secondary"
        />
      </PageSection>

      {filteredTabs.length === 0 ? (
        <PageSection>
          <TabsEmptyState
            title="No tabs found"
            description="Try adjusting your filters or search"
          />
        </PageSection>
      ) : (
        <>
          {liveTabs.length > 0 && (
            <PageSection>
              <SectionHeader
                title="Live Now"
                icon={<Flame className="h-4 w-4 fill-orange text-orange" />}
              />
              <div className="mt-3 space-y-3">
                {liveTabs.map((tab) => (
                  <TabListCard
                    key={tab.id}
                    id={tab.id}
                    title={tab.title}
                    isLive={tab.isLive}
                    memberCount={tab.memberCount}
                    createdTime={tab.createdTime}
                    description={tab.description}
                    memberInitials={tab.memberInitials}
                    onClick={() => handleTabClick(tab.id)}
                  />
                ))}
              </div>
            </PageSection>
          )}

          {recentTabs.length > 0 && (
            <PageSection>
              <SectionHeader title="Recent Tabs" />
              <div className="mt-3 space-y-2">
                {recentTabs.map((tab) => (
                  <TabListCard
                    key={tab.id}
                    id={tab.id}
                    title={tab.title}
                    isLive={tab.isLive}
                    memberCount={tab.memberCount}
                    createdTime={tab.createdTime}
                    description={tab.description}
                    memberInitials={tab.memberInitials}
                    onClick={() => handleTabClick(tab.id)}
                  />
                ))}
              </div>
            </PageSection>
          )}
        </>
      )}
    </AppPage>
  );
}
