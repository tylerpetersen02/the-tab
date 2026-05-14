"use client";

import { Users, Clock, Zap } from "lucide-react";
import { AvatarStack } from "@/components/common/AvatarStack";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AppText } from "@/components/common/AppText";

interface TabListCardProps {
  id: string;
  title: string;
  isLive: boolean;
  memberCount: number;
  createdTime: string;
  description?: string;
  memberInitials: string[];
  onClick: () => void;
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
}: TabListCardProps) {
  return (
    <div
      onClick={onClick}
      className="rounded-[24px] border border-medium-gray bg-white p-3 shadow-[0_5px_18px_rgba(0,21,36,0.04)] hover:bg-off-white transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <AppText as="h3" variant="cardTitle">
              {title}
            </AppText>
            {isLive && (
              <StatusBadge label="Live" variant="live" icon={<Zap className="h-3 w-3" />} />
            )}
          </div>

          {description && (
            <AppText variant="meta" className="mt-1">
              {description}
            </AppText>
          )}

          <div className="mt-2 flex flex-wrap gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-dark-gray" />
              <AppText as="span" variant="meta">
                {memberCount} members
              </AppText>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-dark-gray" />
              <AppText as="span" variant="meta">
                {createdTime}
              </AppText>
            </div>
          </div>
        </div>

      </div>

      {memberInitials.length > 0 && (
        <div className="mt-3 -mx-3 px-3">
          <AvatarStack initials={memberInitials} maxDisplay={12} size="sm" fillWidth />
        </div>
      )}
    </div>
  );
}
