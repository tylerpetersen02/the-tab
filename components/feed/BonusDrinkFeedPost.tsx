import { UserAvatar } from "@/components/common/UserAvatar";

interface BonusDrinkFeedPostProps {
  id: string;
  user: {
    name: string;
    initials: string;
  };
  session: {
    title: string;
  };
  createdAtLabel: string;
  drinkType: "shot" | "cocktail";
  drinkName: string;
}

const drinkEmoji = {
  shot: "🥃",
  cocktail: "🍸",
};

const drinkLabel = {
  shot: "Shot",
  cocktail: "Cocktail",
};

export function BonusDrinkFeedPost({
  id,
  user,
  session,
  createdAtLabel,
  drinkType,
  drinkName,
}: BonusDrinkFeedPostProps) {
  return (
    <article className="rounded-[22px] border border-[#D4D0CC] bg-white px-4 py-3 shadow-[0_5px_18px_rgba(0,21,36,0.04)]">
      <div className="flex items-center gap-3">
        <UserAvatar initials={user.initials} size="sm" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-black text-[#001524]">
              {user.name}
            </span>

            <span className="text-sm font-semibold text-[#8B8680]">
              added
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#ffecd1] px-2.5 py-1 text-xs font-black text-[#78290f] flex-shrink-0">
              + {drinkEmoji[drinkType]}
            </span>
          </div>

          <p className="mt-1 truncate text-xs font-semibold text-[#001524]">
            {drinkName} · {session.title} · {createdAtLabel}
          </p>
        </div>
      </div>
    </article>
  );
}
