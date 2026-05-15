"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Beer,
  Camera,
  Check,
  Clipboard,
  Copy,
  Lock,
  MapPin,
  Plus,
  Shield,
  Users,
  Video,
  Wine,
  X,
} from "lucide-react";

import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { PageSection } from "@/components/common/PageSection";
import { CardShell } from "@/components/common/CardShell";
import { InfoPill } from "@/components/common/InfoPill";
import { StatusBadge } from "@/components/common/StatusBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { shadows } from "@/lib/shadows";
import { gradients } from "@/lib/gradients";
import { inputStyles, selectStyles, textareaStyles } from "@/lib/inputStyles";
import { TabMemoriesPreview } from "@/components/media/TabMemoriesPreview";
import { TabMediaViewer } from "@/components/media/TabMediaViewer";
import type { TabMediaItem } from "@/components/media/types";

type Screen = "gate" | "create_tab" | "join_tab" | "current_tab" | "add_drink";

type Visibility = "private" | "invite_only" | "open";

type DrinkType = "beer" | "shot" | "cocktail" | "wine" | "seltzer";

type BonusType = "shot" | "cocktail" | "wine";

type Member = {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string | null;
  contributionOz: number;
  beers: number;
  bonusDrinks: number;
  isCurrentUser?: boolean;
  leftAt?: string | null;
};

type ActivityItem = {
  id: string;
  type: "drink" | "bonus" | "join" | "leave";
  user: string;
  detail: string;
  time: string;
};

type ActiveTab = {
  id: string;
  title: string;
  visibility: Visibility;
  location?: string;
  joinCode: string;
  startedAtLabel: string;
  elapsed: string;
  ounceGoal?: number;
  currentOz: number;
  beers: number;
  wine: number;
  cider: number;
  seltzer: number;
  other: number;
  shots: number;
  cocktails: number;
  coverImageUrl?: string | null;
  members: Member[];
  activities: ActivityItem[];
  media: TabMediaItem[];
};

const MOCK_AVATARS = ["TP", "MK", "DN", "RY"];

const defaultMembers: Member[] = [
  {
    id: "u1",
    name: "Tyler",
    initials: "TP",
    contributionOz: 0,
    beers: 0,
    bonusDrinks: 0,
    isCurrentUser: true,
    leftAt: null,
  },
  {
    id: "u2",
    name: "Mike",
    initials: "MK",
    contributionOz: 32,
    beers: 2,
    bonusDrinks: 1,
    leftAt: null,
  },
  {
    id: "u3",
    name: "Dan",
    initials: "DN",
    contributionOz: 20,
    beers: 1,
    bonusDrinks: 0,
    leftAt: null,
  },
  {
    id: "u4",
    name: "Ryan",
    initials: "RY",
    contributionOz: 0,
    beers: 0,
    bonusDrinks: 0,
    leftAt: null,
  },
];

export default function AddDrinkPage() {
  const [screen, setScreen] = useState<Screen>("gate");
  const [activeTab, setActiveTab] = useState<ActiveTab | null>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaViewerStartIndex, setMediaViewerStartIndex] = useState(0);

  const [tabTitle, setTabTitle] = useState("Friday Night Alpha");
  const [tabCoverPreview, setTabCoverPreview] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<Visibility>("open");
  const [location, setLocation] = useState("San Diego, CA");
  const [ounceGoal, setOunceGoal] = useState("320");
  const [joinCode, setJoinCode] = useState("");

  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [selectedDrinkType, setSelectedDrinkType] = useState<DrinkType>("beer");
  const [selectedOunces, setSelectedOunces] = useState(16);
  const [liquorType, setLiquorType] = useState("Vodka");
  const [cocktailBase, setCocktailBase] = useState("Margarita");
  const [drinkLocation, setDrinkLocation] = useState("Finney's Crafthouse");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (screen === "add_drink") {
      setSelectedOunces(16);
    }
  }, [screen]);

  const goalPercent = useMemo(() => {
    if (!activeTab?.ounceGoal) return 0;
    return Math.min(Math.round((activeTab.currentOz / activeTab.ounceGoal) * 100), 100);
  }, [activeTab]);

  function createJoinCode(title: string) {
    const cleaned = title.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase();
    const suffix = Math.floor(100 + Math.random() * 900);
    return `${cleaned || "TAB"}${suffix}`;
  }

  function handleCreateTab() {
    const goal = Number(ounceGoal);

    const createdTab: ActiveTab = {
      id: `tab-${Date.now()}`,
      title: tabTitle.trim() || "Untitled Tab",
      visibility,
      location: location.trim(),
      joinCode: createJoinCode(tabTitle),
      startedAtLabel: "Started 7:42 PM",
      elapsed: "2h 14m",
      ounceGoal: Number.isFinite(goal) && goal > 0 ? goal : undefined,
      currentOz: 96,
      beers: 8,
      wine: 0,
      cider: 0,
      seltzer: 0,
      other: 0,
      shots: 3,
      cocktails: 2,
      coverImageUrl: tabCoverPreview,
      members: defaultMembers,
      activities: [
        {
          id: "a1",
          type: "join",
          user: "Ryan",
          detail: "joined the tab",
          time: "15m ago",
        },
        {
          id: "a2",
          type: "drink",
          user: "Dan",
          detail: "added Beer · 16 oz",
          time: "8m ago",
        },
        {
          id: "a3",
          type: "bonus",
          user: "Mike",
          detail: "added a Shot",
          time: "2m ago",
        },
      ],
      media: [
        {
          id: "m1",
          drinkId: "d1",
          userId: "u1",
          userName: "Tyler",
          userInitials: "TP",
          type: "image",
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%2315616d' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EBeer #1%3C/text%3E%3C/svg%3E",
          caption: "First beer of the night!",
          drinkType: "beer",
          drinkNumber: 1,
          ounces: 16,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "m2",
          drinkId: "d2",
          userId: "u2",
          userName: "Mike",
          userInitials: "MK",
          type: "image",
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%239bc8e8' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EBeer #2%3C/text%3E%3C/svg%3E",
          caption: "Mike's round",
          drinkType: "beer",
          drinkNumber: 2,
          ounces: 16,
          createdAt: new Date(Date.now() - 100 * 60 * 1000).toISOString(),
        },
        {
          id: "m3",
          drinkId: "d3",
          userId: "u3",
          userName: "Dan",
          userInitials: "DN",
          type: "image",
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f4a261' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EShot%3C/text%3E%3C/svg%3E",
          drinkType: "shot",
          createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
        },
        {
          id: "m4",
          drinkId: "d4",
          userId: "u1",
          userName: "Tyler",
          userInitials: "TP",
          type: "image",
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%2315616d' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='white' text-anchor='middle' dominant-baseline='middle'%3EBeer #3%3C/text%3E%3C/svg%3E",
          caption: "Round 2!",
          drinkType: "beer",
          drinkNumber: 3,
          ounces: 16,
          createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        },
      ],
    };

    setActiveTab(createdTab);
    setScreen("current_tab");
  }

  function handleJoinTab() {
    const joinedTab: ActiveTab = {
      id: `tab-${Date.now()}`,
      title: "Joined Tab",
      visibility: "invite_only",
      location: "San Diego, CA",
      joinCode: joinCode.trim().toUpperCase() || "ALPHA8",
      startedAtLabel: "Started 18m ago",
      elapsed: "18m",
      ounceGoal: 240,
      currentOz: 48,
      beers: 3,
      wine: 0,
      cider: 0,
      seltzer: 0,
      other: 0,
      shots: 0,
      cocktails: 1,
      members: defaultMembers,
      activities: [
        {
          id: "a1",
          type: "join",
          user: "You",
          detail: "joined the tab",
          time: "just now",
        },
      ],
    };

    setActiveTab(joinedTab);
    setScreen("current_tab");
  }

  function handlePostDrink() {
    if (!activeTab) return;

    const isBonus = selectedDrinkType === "shot" || selectedDrinkType === "cocktail";
    const drinkCountKey =
      selectedDrinkType === "beer"
        ? "beers"
        : selectedDrinkType === "wine"
          ? "wine"
          : selectedDrinkType === "seltzer"
            ? "seltzer"
            : selectedDrinkType === "shot"
              ? "shots"
              : selectedDrinkType === "cocktail"
                ? "cocktails"
                : "other";

    const drinkLabel =
      selectedDrinkType === "shot"
        ? liquorType
        : selectedDrinkType === "cocktail"
          ? cocktailBase
          : selectedDrinkType;

    setActiveTab((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        currentOz: isBonus ? prev.currentOz : prev.currentOz + selectedOunces,
        [drinkCountKey]: prev[drinkCountKey] + 1,
        members: prev.members.map((member) =>
          member.isCurrentUser
            ? {
                ...member,
                contributionOz: isBonus ? member.contributionOz : member.contributionOz + selectedOunces,
                beers: selectedDrinkType === "beer" ? member.beers + 1 : member.beers,
                bonusDrinks: isBonus ? member.bonusDrinks + 1 : member.bonusDrinks,
              }
            : member
        ),
        activities: [
          {
            id: `activity-${Date.now()}`,
            type: isBonus ? "bonus" : "drink",
            user: "Tyler",
            detail: isBonus
              ? `added a ${selectedDrinkType === "shot" ? "Shot" : "Cocktail"}`
              : `added ${selectedDrinkType} · ${selectedOunces} oz`,
            time: "just now",
          },
          ...prev.activities,
        ],
      };
    });

    setMediaPreview(null);
    setCaption("");
    setScreen("current_tab");
  }

  function handleLeaveTab() {
    if (!activeTab) return;

    setActiveTab((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        members: prev.members.map((member) =>
          member.isCurrentUser
            ? {
                ...member,
                leftAt: "left just now",
              }
            : member
        ),
        activities: [
          {
            id: `leave-${Date.now()}`,
            type: "leave",
            user: "Tyler",
            detail: "left the tab",
            time: "just now",
          },
          ...prev.activities,
        ],
      };
    });
  }

  function resetTab() {
    setActiveTab(null);
    setScreen("gate");
  }

  if (screen === "gate") {
    return (
      <AppPage>
        <AppHeader title="The Tab" />

        <PageSection>
          <div className="flex min-h-[70dvh] flex-col items-center justify-center text-center">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] bg-orange/10">
              <Beer className="h-12 w-12 text-orange" />
            </div>

            <AppText as="h1" variant="pageTitle">
              No active tab
            </AppText>

            <AppText variant="body" className="mt-3 max-w-[260px] text-dark-gray">
              Open a tab or join one to start logging drinks.
            </AppText>

            <div className="mt-10 w-full space-y-3">
              <AppButton size="lg" fullWidth onClick={() => setScreen("create_tab")}>
                <Plus className="h-5 w-5" />
                Open Tab
              </AppButton>

              <AppButton
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => setScreen("join_tab")}
              >
                <Clipboard className="h-5 w-5" />
                Join with Code
              </AppButton>
            </div>

            <div className="mt-10 w-full rounded-[24px] border border-orange/20 bg-orange/5 p-4 text-left">
              <div className="flex gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                <AppText variant="meta">
                  Your progress is saved to each tab even if you leave.
                </AppText>
              </div>
            </div>
          </div>
        </PageSection>
      </AppPage>
    );
  }

  if (screen === "create_tab") {
    return (
      <AppPage>
        <SubFlowHeader title="Open Tab" onBack={() => setScreen("gate")} />

        <PageSection>
          <div className="space-y-5">
            <Field label="Tab Title">
              <input
                value={tabTitle}
                maxLength={30}
                onChange={(e) => setTabTitle(e.target.value)}
                className={inputStyles}
                placeholder="SD Crew"
              />
              <div className="mt-1 text-right">
                <AppText variant="meta">{tabTitle.length}/30</AppText>
              </div>
            </Field>

            <Field label="Cover Photo Optional">
              {tabCoverPreview ? (
                <div className="space-y-2">
                  <img
                    src={tabCoverPreview}
                    alt="Tab cover"
                    className="w-full h-32 rounded-[16px] object-cover"
                  />
                  <button
                    onClick={() => setTabCoverPreview(null)}
                    className="text-sm text-teal font-semibold"
                  >
                    Remove photo
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-3 rounded-[16px] border-2 border-dashed border-medium-gray bg-off-white p-6 cursor-pointer hover:bg-light-gray transition-colors">
                  <Camera className="h-6 w-6 text-dark-gray" />
                  <AppText variant="meta" className="text-center">
                    Tap to add cover photo
                  </AppText>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setTabCoverPreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </Field>

            <Field label="Visibility">
              <div className="grid grid-cols-3 gap-2">
                <ChoiceButton
                  active={visibility === "open"}
                  onClick={() => setVisibility("open")}
                  icon={<Check className="h-4 w-4" />}
                  label="Open"
                />
                <ChoiceButton
                  active={visibility === "invite_only"}
                  onClick={() => setVisibility("invite_only")}
                  icon={<Users className="h-4 w-4" />}
                  label="Invite"
                />
                <ChoiceButton
                  active={visibility === "private"}
                  onClick={() => setVisibility("private")}
                  icon={<Lock className="h-4 w-4" />}
                  label="Private"
                />
              </div>

              <div className="mt-3 rounded-[16px] bg-orange/5 p-3">
                <AppText variant="meta">
                  {visibility === "open" &&
                    "Anyone can join at any time, no request or code needed."}
                  {visibility === "invite_only" &&
                    "Public tab, but requires a request or join code to participate."}
                  {visibility === "private" &&
                    "Only people you specifically invite can see and join."}
                </AppText>
              </div>
            </Field>

            <Field label="Location Optional">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={inputStyles}
                placeholder="San Diego, CA"
              />
            </Field>

            <Field label="Ounce Goal Optional">
              <div className="relative">
                <input
                  value={ounceGoal}
                  inputMode="numeric"
                  onChange={(e) => setOunceGoal(e.target.value)}
                  className={`${inputStyles} pr-12`}
                  placeholder="320"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-dark-gray">
                  oz
                </span>
              </div>
              <AppText variant="meta" className="mt-2">
                You can change this later.
              </AppText>
            </Field>
          </div>
        </PageSection>

        <PageSection>
          <AppButton size="lg" fullWidth onClick={handleCreateTab}>
            Open Tab
          </AppButton>
        </PageSection>
      </AppPage>
    );
  }

  if (screen === "join_tab") {
    return (
      <AppPage>
        <SubFlowHeader title="Join Tab" onBack={() => setScreen("gate")} />

        <PageSection>
          <CardShell variant="default" className="p-5">
            <AppText as="h2" variant="cardTitle">
              Enter join code
            </AppText>
            <AppText variant="meta" className="mt-2">
              Ask a buddy for the code attached to their active tab.
            </AppText>

            <input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="ALPHA8"
              className={`${inputStyles} mt-5 text-center text-2xl font-black uppercase tracking-[0.16em] rounded-[18px]`}
            />

            <div className="mt-5">
              <AppButton size="lg" fullWidth onClick={handleJoinTab}>
                Join Tab
              </AppButton>
            </div>
          </CardShell>
        </PageSection>
      </AppPage>
    );
  }

  if (screen === "current_tab" && activeTab) {
    return (
      <AppPage>
        <AppHeader title="The Tab" />

        <PageSection>
          <div className="space-y-3">
            <CurrentTabHero activeTab={activeTab} />

            {activeTab.members.find((m) => m.isCurrentUser)?.leftAt ? (
              <AppButton size="lg" fullWidth variant="outline" onClick={resetTab}>
                Return to Tabs
              </AppButton>
            ) : (
              <AppButton size="lg" fullWidth onClick={() => setScreen("add_drink")}>
                <Plus className="h-5 w-5" />
                Add Drink
              </AppButton>
            )}

            <GoalProgress activeTab={activeTab} goalPercent={goalPercent} />
          </div>
        </PageSection>

        <PageSection>
          <YourContribution activeTab={activeTab} />
        </PageSection>

        <PageSection>
          <MembersCard activeTab={activeTab} />
        </PageSection>

        <PageSection>
          <DrinkBreakdown activeTab={activeTab} />
        </PageSection>

        <PageSection>
          <RecentActivity activeTab={activeTab} />
        </PageSection>

        <PageSection>
          <TabMemoriesPreview
            media={activeTab.media}
            onViewAll={() => {
              setMediaViewerStartIndex(0);
              setMediaViewerOpen(true);
            }}
            onThumbnailClick={(index) => {
              setMediaViewerStartIndex(index);
              setMediaViewerOpen(true);
            }}
          />
        </PageSection>

        <PageSection>
          <div className="grid grid-cols-4 gap-2">
            <ActionTile label="Invite" icon={<Users className="h-4 w-4" />} />
            <ActionTile label="Join Code" icon={<Copy className="h-4 w-4" />} />
            <ActionTile
              label="Change Photo"
              icon={<Camera className="h-4 w-4" />}
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setActiveTab((prev) =>
                        prev
                          ? {
                              ...prev,
                              coverImageUrl: reader.result as string,
                            }
                          : prev
                      );
                    };
                    reader.readAsDataURL(file);
                  }
                };
                input.click();
              }}
            />
            <ActionTile label="Leave Tab" icon={<X className="h-4 w-4" />} onClick={handleLeaveTab} />
          </div>
        </PageSection>

        <PageSection className="border-t border-light-gray pt-4">
          <AppButton
            variant="outline"
            size="md"
            fullWidth
            onClick={() => setShowCloseConfirm(true)}
            className="border-red-200 text-red-500 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Close Tab
          </AppButton>
        </PageSection>

        {showCloseConfirm && (
          <div className="fixed inset-0 bg-black/20 z-[60] flex items-end">
            <div className="w-full bg-white rounded-t-[28px] p-6 space-y-4">
              <div>
                <AppText as="h2" variant="cardTitle">
                  Close this tab?
                </AppText>
                <AppText variant="body" className="mt-3 text-dark-gray">
                  This will end the current session and move it into tab history. Drinks, stats, and media will still be saved.
                </AppText>
              </div>

              <div className="space-y-2 pt-4">
                <AppButton
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setActiveTab(null);
                    setShowCloseConfirm(false);
                    setScreen("gate");
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                >
                  Close Tab
                </AppButton>

                <AppButton
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => setShowCloseConfirm(false)}
                >
                  Cancel
                </AppButton>
              </div>
            </div>
          </div>
        )}

        <TabMediaViewer
          open={mediaViewerOpen}
          media={activeTab.media}
          startIndex={mediaViewerStartIndex}
          tabTitle={activeTab.title}
          onClose={() => setMediaViewerOpen(false)}
        />
      </AppPage>
    );
  }

  if (screen === "add_drink" && activeTab) {
    const currentUser = activeTab.members.find((m) => m.isCurrentUser);
    const nextDrinkNumber = (currentUser?.beers ?? 0) + 1;

    return (
      <AppPage>
        <SubFlowHeader title="Add Drink" onBack={() => setScreen("current_tab")} rightAction="close" />

        <PageSection>
          <CardShell variant="default" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <AppText variant="meta">You're logging</AppText>
                <AppText variant="pageTitle">Drink #{nextDrinkNumber}</AppText>
              </div>
              <InfoPill label="Auto-tracked" tone="teal" />
            </div>
          </CardShell>
        </PageSection>

        <PageSection>
          <Field label="Type">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { label: "Beer", value: "beer" },
                { label: "Shot", value: "shot" },
                { label: "Cocktail", value: "cocktail" },
                { label: "Wine", value: "wine" },
                { label: "Seltzer", value: "seltzer" },
              ].map((item) => (
                <AppButton
                  key={item.value}
                  size="sm"
                  variant={selectedDrinkType === item.value ? "secondary" : "muted"}
                  onClick={() => setSelectedDrinkType(item.value as DrinkType)}
                  className="shrink-0"
                >
                  {item.label}
                </AppButton>
              ))}
            </div>
          </Field>
        </PageSection>

        {(selectedDrinkType === "beer" ||
          selectedDrinkType === "wine" ||
          selectedDrinkType === "seltzer") && (
          <PageSection>
            <Field label="Size">
              <OunceWheel value={selectedOunces} onChange={setSelectedOunces} />
            </Field>
          </PageSection>
        )}

        {selectedDrinkType === "shot" && (
          <PageSection>
            <Field label="Liquor Type">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {[
                  "Vodka",
                  "Tequila",
                  "Whiskey",
                  "Rum",
                  "Gin",
                  "Other",
                ].map((type) => (
                  <AppButton
                    key={type}
                    size="sm"
                    variant={liquorType === type ? "secondary" : "muted"}
                    onClick={() => setLiquorType(type)}
                    className="shrink-0"
                  >
                    {type}
                  </AppButton>
                ))}
              </div>
            </Field>
          </PageSection>
        )}

        {selectedDrinkType === "cocktail" && (
          <PageSection>
            <Field label="Cocktail">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {[
                  "Margarita",
                  "Mojito",
                  "Daiquiri",
                  "Old Fashioned",
                  "Piña Colada",
                  "Other",
                ].map((type) => (
                  <AppButton
                    key={type}
                    size="sm"
                    variant={cocktailBase === type ? "secondary" : "muted"}
                    onClick={() => setCocktailBase(type)}
                    className="shrink-0"
                  >
                    {type}
                  </AppButton>
                ))}
              </div>
            </Field>
          </PageSection>
        )}

        <PageSection>
          <Field label="Location Optional">
            <input
              value={drinkLocation}
              onChange={(e) => setDrinkLocation(e.target.value)}
              className={inputStyles}
              placeholder="Finney's Crafthouse"
            />
          </Field>
        </PageSection>

        <PageSection>
          <Field label="Add a comment optional">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className={textareaStyles}
              placeholder="Post-round beer hit different 🍻"
            />
          </Field>
        </PageSection>

        <PageSection>
          <div className="grid grid-cols-[auto_auto_1fr] gap-3">
            <AppButton variant="muted" size="md">
              <Camera className="h-4 w-4" />
              Photo
            </AppButton>
            <AppButton variant="muted" size="md">
              <Video className="h-4 w-4" />
              Video
            </AppButton>
            <AppButton size="md" onClick={handlePostDrink}>
              Post Drink
            </AppButton>
          </div>
        </PageSection>
      </AppPage>
    );
  }

  return null;
}

function SubFlowHeader({
  title,
  onBack,
  rightAction,
}: {
  title: string;
  onBack: () => void;
  rightAction?: "close";
}) {
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-3">
      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <AppText as="h1" variant="cardTitle">
        {title}
      </AppText>

      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
      >
        {rightAction === "close" ? <X className="h-5 w-5" /> : <span />}
      </button>
    </header>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppText variant="meta" className="mb-2 text-ink">
        {label}
      </AppText>
      {children}
    </div>
  );
}

function ChoiceButton({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-12 items-center justify-center gap-2 rounded-[16px] border text-sm font-black transition-colors ${
        active
          ? "border-teal bg-teal text-white"
          : "border-medium-gray bg-white text-ink hover:bg-off-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function CurrentTabHero({ activeTab }: { activeTab: ActiveTab }) {
  return (
    <CardShell variant="feed" className="overflow-hidden p-0">
      <div className="relative h-44 bg-gradient-to-br from-gray-200 to-gray-300">
        {activeTab.coverImageUrl ? (
          <img
            src={activeTab.coverImageUrl}
            alt={activeTab.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradients.alpha}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-teal/70 via-teal/20 to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusBadge label="Live" variant="live" icon={null} />
        </div>

        <div className="absolute bottom-5 left-4 right-4">
          <AppText as="h1" variant="pageTitle" className="text-white">
            {activeTab.title}
          </AppText>
          <AppText variant="bodySmall" className="mt-1 text-white">
            {activeTab.location || "Current tab"} · {activeTab.elapsed}
          </AppText>
        </div>
      </div>
    </CardShell>
  );
}

function GoalProgress({
  activeTab,
  goalPercent,
}: {
  activeTab: ActiveTab;
  goalPercent: number;
}) {
  if (!activeTab.ounceGoal) return null;

  return (
    <CardShell variant="default" className="p-4">
      <div className="flex items-end justify-between">
        <div>
          <AppText variant="meta" className="text-ink">
            Ounce Goal
          </AppText>
          <div className="mt-2 flex items-end gap-1">
            <AppText variant="statValue">{activeTab.currentOz}</AppText>
            <AppText variant="cardTitle">/ {activeTab.ounceGoal} oz</AppText>
          </div>
        </div>

        <AppText variant="cardTitle">{goalPercent}%</AppText>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-light-gray">
        <div
          className="h-full rounded-full bg-teal transition-all"
          style={{ width: `${goalPercent}%` }}
        />
      </div>

      <AppText variant="meta" className="mt-2">
        {Math.max(activeTab.ounceGoal - activeTab.currentOz, 0)} oz to go
      </AppText>
    </CardShell>
  );
}

function YourContribution({ activeTab }: { activeTab: ActiveTab }) {
  const currentUser = activeTab.members.find((member) => member.isCurrentUser);

  if (!currentUser) return null;

  return (
    <CardShell variant="default" className="p-4">
      <AppText variant="cardTitle">Your Contribution</AppText>

      <div className="mt-4 grid grid-cols-3 divide-x divide-medium-gray">
        <MiniStat value={currentUser.beers} label="Beers" />
        <MiniStat value={`${currentUser.contributionOz} oz`} label="Total" />
        <MiniStat value={(currentUser.contributionOz / 16).toFixed(2)} label="Pint Score" />
      </div>

      {currentUser.leftAt && (
        <div className="mt-4">
          <InfoPill label={currentUser.leftAt} tone="orange" />
        </div>
      )}
    </CardShell>
  );
}

function MembersCard({ activeTab }: { activeTab: ActiveTab }) {
  return (
    <CardShell variant="default" className="p-4">
      <div className="flex items-center justify-between">
        <AppText variant="cardTitle">Members · {activeTab.members.length}</AppText>
        <AppText variant="meta" className="text-teal cursor-pointer">
          See All
        </AppText>
      </div>

      <div className="mt-3 grid grid-cols-6 gap-3">
        {activeTab.members.slice(0, 6).map((member, index) => {
          const overflowCount = activeTab.members.length - 6;
          const isOverflowAvatar = index === 5 && activeTab.members.length > 6;

          return (
            <div key={member.id} className="flex flex-col items-center text-center">
              <div className="relative">
                <UserAvatar initials={member.initials} size="md" avatarUrl={member.avatarUrl} />

                {isOverflowAvatar && (
                  <div className="absolute -bottom-1 -right-1 flex h-6 min-w-[24px] items-center justify-center rounded-full border-2 border-white bg-orange px-1">
                    <AppText
                      variant="tinyLabel"
                      className="text-white leading-none"
                    >
                      +{overflowCount}
                    </AppText>
                  </div>
                )}
              </div>

              <AppText variant="bodySmall" className="mt-2.5 truncate">
                {member.name}
              </AppText>

              <AppText variant="meta" className="mt-1">
                {member.contributionOz} oz
              </AppText>

              {member.isCurrentUser && (
                <div className="mt-2 flex w-full justify-center">
                  <InfoPill label="You" tone="teal" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

function DrinkBreakdown({ activeTab }: { activeTab: ActiveTab }) {
  return (
    <CardShell variant="default" className="p-4">
      <AppText variant="cardTitle">Drink Breakdown</AppText>

      <div className="mt-4 grid grid-cols-4 divide-x divide-medium-gray">
        <MiniStat value={activeTab.beers} label="Beers" />
        <MiniStat value={activeTab.wine} label="Wine" />
        <MiniStat value={activeTab.shots} label="Shots" />
        <MiniStat value={activeTab.cocktails} label="Cocktails" />
      </div>
    </CardShell>
  );
}

function RecentActivity({ activeTab }: { activeTab: ActiveTab }) {
  return (
    <CardShell variant="default" className="p-4">
      <div className="flex items-center justify-between">
        <AppText variant="cardTitle">Recent Activity</AppText>
        <AppText variant="meta" className="text-teal">
          View All
        </AppText>
      </div>

      <div className="mt-4 space-y-3">
        {activeTab.activities.slice(0, 4).map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <UserAvatar initials={activity.user.slice(0, 2).toUpperCase()} size="sm" />
            <div className="min-w-0 flex-1">
              <AppText variant="bodySmall">
                {activity.user} {activity.detail}
              </AppText>
              <AppText variant="meta">{activity.time}</AppText>
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function OunceWheel({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const ounceOptions = [4, 5, 6, 8, 10, 12, 16, 19, 20, 22, 24, 32];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const index = ounceOptions.indexOf(value);
    if (index !== -1 && buttonRefs.current[index]) {
      buttonRefs.current[index]?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }
  }, [value, ounceOptions]);

  return (
    <div className="relative -mx-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-off-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-off-white to-transparent z-10" />

      <div ref={scrollContainerRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 py-2 scrollbar-hide">
        {ounceOptions.map((oz, index) => {
          const active = value === oz;

          return (
            <button
              key={oz}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => onChange(oz)}
              className={[
                "snap-center shrink-0 rounded-full border px-5 py-3 transition-all",
                active
                  ? "scale-110 border-teal bg-teal text-white shadow-[0_6px_16px_rgba(21,97,109,0.18)]"
                  : "border-medium-gray bg-white text-ink",
              ].join(" ")}
            >
              <span className="text-lg font-black">{oz}</span>
              <span className="ml-1 text-xs font-bold">oz</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="px-2 text-center">
      <AppText variant="statValue" className="text-[22px]">
        {value}
      </AppText>
      <AppText variant="statLabel">{label}</AppText>
    </div>
  );
}

function ActionTile({
  label,
  icon,
  onClick,
  destructive,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[18px] border p-2 transition-colors ${
        destructive
          ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
          : "border-medium-gray bg-white text-ink hover:bg-off-white"
      }`}
    >
      {icon}
      <AppText variant="tinyLabel" className={`text-center ${destructive ? "text-red-500" : ""}`}>
        {label}
      </AppText>
    </button>
  );
}
