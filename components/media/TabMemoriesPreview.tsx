"use client";

import { ChevronRight } from "lucide-react";
import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";

interface TabMediaItem {
  id: string;
  drinkId: string;
  userId: string;
  userName: string;
  userInitials: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  drinkType: string;
  drinkNumber?: number;
  ounces?: number;
  createdAt: string;
}

interface TabMemoriesPreviewProps {
  media: TabMediaItem[];
  onViewAll: () => void;
  onThumbnailClick: (index: number) => void;
}

export function TabMemoriesPreview({
  media,
  onViewAll,
  onThumbnailClick,
}: TabMemoriesPreviewProps) {
  if (!media || media.length === 0) {
    return (
      <CardShell className="p-4">
        <div className="text-center space-y-2">
          <AppText variant="cardTitle">Tab Memories</AppText>
          <AppText variant="body" className="text-dark-gray">
            No memories yet. Add a photo or video with your next drink.
          </AppText>
        </div>
      </CardShell>
    );
  }

  const displayCount = 4;
  const visibleMedia = media.slice(0, displayCount);
  const overflow = Math.max(0, media.length - displayCount);

  return (
    <CardShell className="p-4">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <AppText variant="cardTitle">Tab Memories</AppText>
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-teal hover:text-teal/80 transition-colors"
          >
            <AppText variant="meta" className="text-teal">
              View All
            </AppText>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Thumbnail Row */}
        <div className="flex gap-2">
          {visibleMedia.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onThumbnailClick(idx)}
              className="flex-1 aspect-square rounded-[22px] overflow-hidden bg-light-gray hover:opacity-80 transition-opacity"
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt={`Memory ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          {/* Overflow Indicator */}
          {overflow > 0 && (
            <button
              onClick={onViewAll}
              className="flex-1 aspect-square rounded-[22px] bg-medium-gray hover:bg-dark-gray transition-colors flex items-center justify-center"
            >
              <AppText variant="cardTitle" className="text-white">
                +{overflow}
              </AppText>
            </button>
          )}
        </div>

        {/* Subtitle */}
        <AppText variant="meta" className="text-dark-gray">
          {media.length} moment{media.length !== 1 ? "s" : ""} from this tab
        </AppText>
      </div>
    </CardShell>
  );
}
