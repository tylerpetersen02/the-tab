import { MoreHorizontal, Trophy } from "lucide-react";
import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { UserAvatar } from "@/components/common/UserAvatar";
import { SessionChip } from "@/components/common/SessionChip";
import { InfoPill } from "@/components/common/InfoPill";
import { ReactionBar } from "@/components/common/ReactionBar";

interface DrinkFeedPostProps {
  id: string;
  user: {
    name: string;
    initials: string;
  };
  session: {
    title: string;
    isLive: boolean;
  };
  createdAtLabel: string;
  drinkNumber: number;
  drinkName: string;
  drinkType: string;
  drinkSizeOz: number;
  validationTier: string;
  location: string;
  caption?: string;
  likes: number;
  comments: number;
  mediaGradient?: string;
  badge?: {
    title: string;
    description: string;
  };
}

export function DrinkFeedPost({
  id,
  user,
  session,
  createdAtLabel,
  drinkNumber,
  drinkName,
  drinkType,
  drinkSizeOz,
  validationTier,
  location,
  caption,
  likes,
  comments,
  mediaGradient = "from-[#15616d] via-[#9bc8e8] to-[#f4a261]",
  badge,
}: DrinkFeedPostProps) {
  return (
    <CardShell variant="feed" className="p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserAvatar initials={user.initials} />
          <div>
            <AppText variant="cardTitle">{user.name}</AppText>
            <AppText variant="meta" className="mt-1">
              {createdAtLabel}
            </AppText>
          </div>
        </div>

        <AppButton variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </AppButton>
      </div>

      {/* Session chip */}
      <div className="mt-4">
        <SessionChip title={session.title} isLive={session.isLive} />
      </div>

      {/* Drink title */}
      <div className="mt-4">
        <AppText as="h3" variant="cardTitle" className="text-[22px]">
          Beer #{drinkNumber}
        </AppText>

        <AppText variant="meta" className="mt-1">
          {location}
        </AppText>

        <div className="mt-3 flex flex-wrap gap-2">
          <InfoPill label={`${drinkSizeOz} oz`} />
          <InfoPill label={drinkType} />
          <InfoPill label={validationTier} tone="teal" />
        </div>
      </div>

      {/* Media */}
      <div className="mt-5 overflow-hidden rounded-[26px]">
        <div
          className={`aspect-[4/3] bg-gradient-to-br ${mediaGradient}`}
        />
      </div>

      {/* Caption */}
      {caption && (
        <AppText variant="body" className="mt-4">
          {caption}
        </AppText>
      )}

      {/* Reactions */}
      <div className="mt-4">
        <ReactionBar likes={likes} comments={comments} />
      </div>

      {/* Badge/Award */}
      {badge && (
        <div className="mt-4 rounded-[24px] border border-orange/20 bg-orange/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <Trophy className="h-5 w-5 text-brandy" />
            </div>

            <div>
              <AppText variant="tinyLabel">
                {badge.title}
              </AppText>
              <AppText variant="body" className="mt-1">
                {badge.description}
              </AppText>
            </div>
          </div>
        </div>
      )}
    </CardShell>
  );
}
