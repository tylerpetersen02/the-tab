"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AppText } from "@/components/common/AppText";
import { UserAvatar } from "@/components/common/UserAvatar";
import { InfoPill } from "@/components/common/InfoPill";
import { TabMediaItem } from "./types";

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
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, open]);

  // Lock body scroll while viewer is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

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

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = touchStartX.current - endX;
    const deltaY = touchStartY.current - endY;

    // Require 50px minimum horizontal movement and more horizontal than vertical
    const isHorizontalSwipe =
      Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe) {
      if (deltaX > 0 && canGoNext) {
        handleNext();
      } else if (deltaX < 0 && canGoPrev) {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
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
    <div className="fixed inset-0 z-[80] flex h-dvh flex-col overflow-hidden bg-ink">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-ink/60 to-transparent">
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <div className="text-center flex-1">
          <AppText as="h1" variant="cardTitle" className="text-white truncate text-sm">
            {tabTitle}
          </AppText>
          <AppText variant="meta" className="text-white/90 text-xs">
            {currentIndex + 1} / {media.length}
          </AppText>
        </div>

        <div className="w-9" />
      </header>

      {/* Media Area */}
      <main
        className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 touch-none select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {current.type === "video" ? (
          <video
            src={current.url}
            controls
            playsInline
            className="max-h-full max-w-full rounded-[24px] object-contain"
          />
        ) : (
          <img
            src={current.url}
            alt={`Memory ${currentIndex + 1}`}
            className="max-h-full max-w-full rounded-[24px] object-contain"
          />
        )}
      </main>

      {/* Bottom Metadata Sheet */}
      <section className="shrink-0 rounded-t-[28px] bg-white shadow-lg p-5 space-y-4">
        {/* User & Drink Info */}
        <div className="flex items-center gap-3">
          <UserAvatar
            initials={current.userInitials}
            size="sm"
            avatarUrl={current.userAvatarUrl}
          />
          <div className="flex-1 min-w-0">
            <AppText variant="cardTitle" className="truncate text-sm">
              {current.userName}
            </AppText>
            <AppText variant="meta" className="text-dark-gray truncate text-xs">
              {current.drinkNumber
                ? `${drinkLabel} #${current.drinkNumber}`
                : drinkLabel}
            </AppText>
          </div>
        </div>

        {/* Drink Details */}
        <div className="flex gap-2 flex-wrap">
          {current.ounces && <InfoPill label={`${current.ounces} oz`} />}
          <InfoPill
            label={new Date(current.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </div>

        {/* Caption */}
        {current.caption && (
          <AppText variant="body" className="text-ink text-sm">
            "{current.caption}"
          </AppText>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`p-2 rounded-full transition-colors ${
              canGoPrev
                ? "hover:bg-light-gray text-ink"
                : "text-medium-gray cursor-not-allowed"
            }`}
            aria-label="Previous memory"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-1">
            {media.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-teal w-6" : "bg-medium-gray w-2"
                }`}
                aria-label={`Go to memory ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`p-2 rounded-full transition-colors ${
              canGoNext
                ? "hover:bg-light-gray text-ink"
                : "text-medium-gray cursor-not-allowed"
            }`}
            aria-label="Next memory"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
