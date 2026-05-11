"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TabsQuickActions } from "@/components/tabs/TabsQuickActions";
import { TabsSearch } from "@/components/tabs/TabsSearch";
import { TabsFilterPills } from "@/components/tabs/TabsFilterPills";
import { TabListCard } from "@/components/tabs/TabListCard";
import { TabsEmptyState } from "@/components/tabs/TabsEmptyState";
import { CreateTabSheet } from "@/components/tabs/CreateTabSheet";
import { JoinCodeSheet } from "@/components/tabs/JoinCodeSheet";

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

export default function TabsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [isJoinCodeSheetOpen, setIsJoinCodeSheetOpen] = useState(false);

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

  const handleJoinTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    console.log("Join tab:", tabId);
    // TODO: Handle join tab action
  };

  return (
    <AppPage>
      <AppHeader title="The Tab" subtitle="Manage your sessions." />

      <div className="px-4">
        <TabsQuickActions
          onCreateTab={() => setIsCreateSheetOpen(true)}
          onJoinCode={() => setIsJoinCodeSheetOpen(true)}
        />

        <TabsSearch value={searchQuery} onChange={setSearchQuery} />

        <TabsFilterPills
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {filteredTabs.length === 0 ? (
        <div className="mt-8 px-4">
          <TabsEmptyState
            title="No tabs found"
            description="Try adjusting your filters or search"
          />
        </div>
      ) : (
        <div className="mt-6 px-4">
          {liveTabs.length > 0 && (
            <div>
              <SectionHeader
                title="Live Now"
                icon={<Flame className="h-4 w-4 fill-current text-[#ff7d00]" />}
              />
              <div className="mt-3">
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
                    onJoinClick={(e) => handleJoinTab(e, tab.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {recentTabs.length > 0 && (
            <div className="mt-8">
              <SectionHeader title="Recent Tabs" />
              <div className="mt-3">
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
                    onJoinClick={(e) => handleJoinTab(e, tab.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <CreateTabSheet
        isOpen={isCreateSheetOpen}
        onClose={() => setIsCreateSheetOpen(false)}
        onSubmit={(data) => {
          console.log("Create tab:", data);
          setIsCreateSheetOpen(false);
        }}
      />

      <JoinCodeSheet
        isOpen={isJoinCodeSheetOpen}
        onClose={() => setIsJoinCodeSheetOpen(false)}
        onSubmit={(code) => {
          console.log("Join with code:", code);
          setIsJoinCodeSheetOpen(false);
        }}
      />
    </AppPage>
  );
}
