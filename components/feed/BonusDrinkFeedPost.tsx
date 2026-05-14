import { UserAvatar } from "@/components/common/UserAvatar";
import { InfoPill } from "@/components/common/InfoPill";
import { AppText } from "@/components/common/AppText";
import { CardShell } from "@/components/common/CardShell";

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
    <CardShell variant="compact" className="px-4 py-3">
      <div className="flex items-center gap-3">
        <UserAvatar initials={user.initials} size="sm" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <AppText as="span" variant="cardTitle">
              {user.name}
            </AppText>

            <AppText as="span" variant="meta">
              added
            </AppText>

            <InfoPill label={`+ ${drinkLabel[drinkType]}`} tone="orange" />
          </div>

          <AppText variant="meta" className="mt-1 truncate">
            {drinkName} · {session.title} · {createdAtLabel}
          </AppText>
        </div>
      </div>
    </CardShell>
  );
}
