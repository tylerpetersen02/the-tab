"use client";

import { Users, Clock, Zap } from "lucide-react";
import { AvatarStack } from "@/components/common/AvatarStack";
import { StatusBadge } from "@/components/common/StatusBadge";

interface TabListCardProps {
  id: string;
  title: string;
  isLive: boolean;
  memberCount: number;
  createdTime: string;
  description?: string;
  memberInitials: string[];
  onClick: () => void;
  onJoinClick: (e: React.MouseEvent) => void;
}

export function TabListCard({
  id,
  title,
  isLive,
  memberCount,
  createdTime,
  description,
  memberInitials,
  onClick,
  onJoinClick,
}: TabListCardProps) {
  return (
    <div
      onClick={onClick}
      className="mb-2 rounded-lg border border-[#D4D0CC] bg-white p-3 shadow-[0_6px_18px_rgba(0,21,36,0.05)] hover:bg-[#FAFAF8] transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-[#001524]">{title}</h3>
            {isLive && (
              <StatusBadge label="Live" variant="live" icon={<Zap />} />
            )}
          </div>

          {description && (
            <p className="mt-1 text-[11px] text-[#8B8680]">{description}</p>
          )}

          <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-[#8B8680]">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{memberCount} members</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{createdTime}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onJoinClick}
          className="flex-shrink-0 rounded-lg bg-[#15616d]/12 px-3 py-2 text-xs font-bold text-[#15616d] hover:bg-[#15616d]/20 transition-colors"
        >
          Join
        </button>
      </div>

      {memberInitials.length > 0 && (
        <div className="mt-2">
          <AvatarStack initials={memberInitials} maxDisplay={3} size="sm" />
        </div>
      )}
    </div>
  );
}
