"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { UserAvatar } from "@/components/common/UserAvatar";
import { InfoPill } from "@/components/common/InfoPill";

interface TabMediaItem {
  id: string;
  drinkId: string;
  userId: string;
  userName: string;
  userInitials: string;
  userAvatarUrl?: string | null;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  drinkType: string;
  drinkNumber?: number;
  ounces?: number;
  createdAt: string;
}

interface TabMediaViewerProps {
  open: boolean;
  media: TabMediaItem[];
  startIndex?: number;
  tabTitle?: string;
  onClose: () => void;
}

export function TabMediaViewer({
  open,
  media,
  startIndex = 0,
  tabTitle = "Tab Memories",
  onClose,
}: TabMediaViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, open]);

  if (!open || !media || media.length === 0) return null;

  const current = media[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < media.length - 1;

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (canGoNext) setCurrentIndex(currentIndex + 1);
  };

  const drinkLabel =
    {
      beer: "Beer",
      wine: "Wine",
      seltzer: "Seltzer",
      shot: "Shot",
      cocktail: "Cocktail",
      cider: "Cider",
    }[current.drinkType] || current.drinkType;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-ink/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-light-gray">
          <button
            onClick={onClose}
            className="p-1 hover:bg-light-gray rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-dark-gray" />
          </button>

          <div className="text-center flex-1 mx-4">
            <AppText variant="cardTitle" className="truncate">
              {tabTitle}
            </AppText>
            <AppText variant="meta" className="text-dark-gray">
              {currentIndex + 1} / {media.length}
            </AppText>
          </div>

          <div className="w-6" />
        </div>

        {/* Media Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 overflow-hidden bg-off-white">
          <img
            src={current.url}
            alt={`Memory ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-[24px]"
          />
        </div>

        {/* Context & Navigation */}
        <div className="px-5 py-4 border-t border-light-gray space-y-4">
          {/* Metadata */}
          <div className="space-y-3">
            {/* User & Drink Info */}
            <div className="flex items-center gap-3">
              <UserAvatar
                initials={current.userInitials}
                size="sm"
                avatarUrl={current.userAvatarUrl}
              />
              <div className="flex-1 min-w-0">
                <AppText variant="cardTitle" className="truncate">
                  {current.userName}
                </AppText>
                <AppText variant="meta" className="text-dark-gray truncate">
                  {current.drinkNumber ? `${drinkLabel} #${current.drinkNumber}` : drinkLabel}
                </AppText>
              </div>
            </div>

            {/* Drink Details */}
            <div className="flex gap-2 flex-wrap">
              {current.ounces && <InfoPill label={`${current.ounces} oz`} />}
              <InfoPill label={new Date(current.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} />
            </div>

            {/* Caption */}
            {current.caption && (
              <div>
                <AppText variant="body" className="text-ink">
                  {current.caption}
                </AppText>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3 pt-2">
            <AppButton
              variant="secondary"
              size="md"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </AppButton>

            <AppButton
              variant="secondary"
              size="md"
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </AppButton>
          </div>
        </div>
      </div>
    </>
  );
}
