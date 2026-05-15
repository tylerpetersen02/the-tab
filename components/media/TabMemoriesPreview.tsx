"use client";

import { ChevronRight, Play } from "lucide-react";
import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";
import { TabMediaItem } from "./types";

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
      <CardShell variant="default" className="p-4">
        <AppText variant="cardTitle" className="mb-1">
          Tab Memories
        </AppText>
        <AppText variant="meta" className="text-dark-gray">
          No memories yet. Add a photo or video with your next drink.
        </AppText>
      </CardShell>
    );
  }

  const maxTiles = 4;
  const hasOverflow = media.length > maxTiles;
  const visibleMedia = hasOverflow ? media.slice(0, maxTiles - 1) : media.slice(0, maxTiles);
  const overflow = media.length - (hasOverflow ? maxTiles - 1 : media.length);

  return (
    <CardShell variant="default" className="p-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <AppText variant="cardTitle">Tab Memories</AppText>
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <AppText variant="meta" className="text-teal">
              View All
            </AppText>
            <ChevronRight className="h-4 w-4 text-teal" />
          </button>
        </div>

        {/* Thumbnail Row */}
        <div className="flex gap-2">
          {visibleMedia.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onThumbnailClick(idx)}
              className="flex-1 aspect-square rounded-[20px] overflow-hidden bg-light-gray border border-medium-gray hover:opacity-90 transition-opacity relative group"
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt={`Memory ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/30 transition-colors">
                  <Play className="h-5 w-5 text-white fill-white" />
                </div>
              )}
            </button>
          ))}

          {/* Overflow Tile with Image Overlay */}
          {hasOverflow && (
            <button
              onClick={onViewAll}
              className="flex-1 aspect-square rounded-[20px] overflow-hidden border border-medium-gray relative group"
            >
              <img
                src={media[maxTiles - 1]?.thumbnailUrl || media[maxTiles - 1]?.url}
                alt="More memories"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/60 transition-colors flex items-center justify-center">
                <AppText variant="cardTitle" className="text-white">
                  +{overflow}
                </AppText>
              </div>
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
