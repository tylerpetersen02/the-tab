"use client";

import { AppPage } from "@/components/common/AppPage";
import { AppHeader } from "@/components/common/AppHeader";
import { FeedToggle } from "@/components/feed/FeedToggle";
import { LiveSessionCarousel } from "@/components/feed/LiveSessionCarousel";
import { FeedPostList, type FeedPost } from "@/components/feed/FeedPostList";

const liveSessions = [
  {
    id: "session-1",
    title: "Friday Night Alpha",
    gradient: "from-[#001524] via-[#15616d] to-[#ff7d00]",
    isLive: true,
    memberCount: 6,
  },
  {
    id: "session-2",
    title: "Post Golf Boys",
    gradient: "from-[#15616d] via-[#6FAFA5] to-[#F2C14E]",
    isLive: true,
    memberCount: 4,
  },
  {
    id: "session-3",
    title: "Brewery Crawl",
    gradient: "from-[#9bc8e8] via-[#6FAFA5] to-[#ffecd1]",
    isLive: true,
    memberCount: 5,
  },
];

const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    type: "drink",
    user: { name: "Tyler", initials: "TP" },
    session: { title: "Friday Night Alpha", isLive: true },
    createdAtLabel: "2m ago",
    drinkNumber: 4,
    drinkName: "Corona Extra",
    drinkType: "Lager",
    drinkSizeOz: 16,
    validationTier: "Verified",
    location: "Finney's Crafthouse · San Diego, CA",
    caption: "Post-round beer hit different 🍻",
    likes: 12,
    comments: 5,
    mediaGradient: "from-[#15616d] via-[#9bc8e8] to-[#f4a261]",
    badge: {
      title: "Personal Record",
      description: "Most beers in a single session",
    },
  },
  {
    id: "post-2",
    type: "session_started",
    user: { name: "Mike", initials: "MK" },
    session: { title: "Post Golf Boys", isLive: true },
    createdAtLabel: "5m ago",
  },
  {
    id: "post-3",
    type: "bonus_drink",
    user: { name: "Dan", initials: "DN" },
    session: { title: "Friday Night Alpha", isLive: true },
    createdAtLabel: "8m ago",
    bonusDrinkType: "shot",
    drinkName: "Jameson",
  },
  {
    id: "post-4",
    type: "drink",
    user: { name: "Ryan", initials: "RY" },
    session: { title: "Post Golf Boys", isLive: true },
    createdAtLabel: "12m ago",
    drinkNumber: 3,
    drinkName: "Modelo",
    drinkType: "Mexican Lager",
    drinkSizeOz: 12,
    validationTier: "Verified",
    location: "The Golf House · Torrey Pines, CA",
    caption: "18 holes and cold ones 🏌️",
    likes: 8,
    comments: 3,
    mediaGradient: "from-[#001524] via-[#15616d] to-[#6FAFA5]",
  },
  {
    id: "post-5",
    type: "badge",
    user: { name: "Tyler", initials: "TP" },
    session: { title: "Friday Night Alpha", isLive: true },
    createdAtLabel: "15m ago",
    badgeTitle: "Social Butterfly",
    badgeDescription: "Attended 10 different tabs",
  },
  {
    id: "post-6",
    type: "recap",
    user: { name: "System", initials: "SYS" },
    session: { title: "Brewery Crawl - May 1st", isLive: false },
    createdAtLabel: "1h ago",
    beersLogged: 15,
    pintScore: 12.5,
    mediaCount: 8,
  },
  {
    id: "post-7",
    type: "bonus_drink",
    user: { name: "Alex", initials: "AM" },
    session: { title: "Friday Night Alpha", isLive: true },
    createdAtLabel: "18m ago",
    bonusDrinkType: "cocktail",
    drinkName: "Margarita",
  },
  {
    id: "post-8",
    type: "drink",
    user: { name: "Mike", initials: "MK" },
    session: { title: "Post Golf Boys", isLive: true },
    createdAtLabel: "22m ago",
    drinkNumber: 2,
    drinkName: "Pacifico",
    drinkType: "Mexican Lager",
    drinkSizeOz: 12,
    validationTier: "Verified",
    location: "The Golf House · Torrey Pines, CA",
    likes: 6,
    comments: 2,
    mediaGradient: "from-[#15616d] via-[#f4a261] to-[#ffecd1]",
  },
];

export default function FeedPage() {
  const handleSessionClick = (sessionId: string) => {
    console.log("Navigating to session:", sessionId);
    // TODO: Navigate to session detail page
  };

  const handlePostAction = (postId: string, action: string) => {
    console.log("Post action:", postId, action);
    // TODO: Handle post actions
  };

  return (
    <AppPage>
      <AppHeader title="The Tab" />
      <FeedToggle />
      <LiveSessionCarousel
        sessions={liveSessions}
        onSessionClick={handleSessionClick}
      />
      <FeedPostList posts={feedPosts} onPostAction={handlePostAction} />
    </AppPage>
  );
}
