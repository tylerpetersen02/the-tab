import { MoreHorizontal } from "lucide-react";
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
    <article className="rounded-[28px] border border-[#D4D0CC] bg-white p-4 shadow-[0_10px_30px_rgba(0,21,36,0.08)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <UserAvatar initials={user.initials} />
          <div>
            <p className="text-sm font-extrabold text-[#001524]">{user.name}</p>
            <p className="text-[11px] font-semibold text-[#8B8680]">
              {createdAtLabel}
            </p>
          </div>
        </div>

        <button className="text-[#8B8680] hover:text-[#001524] transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Session chip */}
      <div className="mt-4">
        <SessionChip title={session.title} isLive={session.isLive} />
      </div>

      {/* Drink title */}
      <div className="mt-4">
        <h3 className="text-[22px] font-black leading-tight text-[#001524]">
          Beer #{drinkNumber}
        </h3>

        <p className="mt-1 text-xs font-semibold text-[#8B8680]">{location}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <InfoPill label={`${drinkSizeOz} oz`} />
          <InfoPill label={drinkType} />
          <InfoPill label={validationTier} tone="teal" />
        </div>
      </div>

      {/* Media */}
      <div className="mt-5 overflow-hidden rounded-[26px] bg-[#E8DCC8] shadow-inner">
        <div
          className={`aspect-[4/3] bg-gradient-to-br ${mediaGradient}`}
        />
      </div>

      {/* Caption */}
      {caption && (
        <p className="mt-4 text-sm font-semibold leading-relaxed text-[#001524]">
          {caption}
        </p>
      )}

      {/* Reactions */}
      <div className="mt-4">
        <ReactionBar likes={likes} comments={comments} />
      </div>

      {/* Badge/Award */}
      {badge && (
        <div className="mt-4 rounded-[24px] border border-[#F2C14E]/60 bg-[#FFF4D6] p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm text-lg">
              🏆
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-wide text-[#78290f]">
                {badge.title}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#001524]">
                {badge.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
