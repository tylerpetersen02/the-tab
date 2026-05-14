import { DrinkFeedPost } from "./DrinkFeedPost";
import { BonusDrinkFeedPost } from "./BonusDrinkFeedPost";
import { BadgeFeedPost } from "./BadgeFeedPost";
import { RecapFeedPost } from "./RecapFeedPost";
import { SessionStartedFeedPost } from "./SessionStartedFeedPost";

export type FeedPostType =
  | "drink"
  | "bonus_drink"
  | "badge"
  | "recap"
  | "session_started";

export interface FeedPost {
  id: string;
  type: FeedPostType;
  user: {
    name: string;
    initials: string;
  };
  session: {
    title: string;
    isLive: boolean;
  };
  createdAtLabel: string;

  // Drink post specific
  drinkNumber?: number;
  drinkName?: string;
  drinkType?: string;
  drinkSizeOz?: number;
  validationTier?: string;
  location?: string;
  caption?: string;
  likes?: number;
  comments?: number;
  mediaGradient?: string;
  badge?: {
    title: string;
    description: string;
  };

  // Bonus drink specific
  bonusDrinkType?: "shot" | "cocktail";

  // Badge specific
  badgeTitle?: string;
  badgeDescription?: string;
  badgeIcon?: React.ReactNode;

  // Recap specific
  beersLogged?: number;
  pintScore?: number;
  mediaCount?: number;
}

interface FeedPostListProps {
  posts: FeedPost[];
  onPostAction?: (postId: string, action: string) => void;
}

export function FeedPostList({ posts, onPostAction }: FeedPostListProps) {
  return (
    <section className="space-y-6 pb-8">
      {posts.map((post) => {
        switch (post.type) {
          case "drink":
            return (
              <DrinkFeedPost
                key={post.id}
                id={post.id}
                user={post.user}
                session={post.session}
                createdAtLabel={post.createdAtLabel}
                drinkNumber={post.drinkNumber || 1}
                drinkName={post.drinkName || "Unknown Beer"}
                drinkType={post.drinkType || "Beer"}
                drinkSizeOz={post.drinkSizeOz || 12}
                validationTier={post.validationTier || "Unverified"}
                location={post.location || "Unknown"}
                caption={post.caption}
                likes={post.likes || 0}
                comments={post.comments || 0}
                mediaGradient={post.mediaGradient}
                badge={post.badge}
              />
            );

          case "bonus_drink":
            return (
              <BonusDrinkFeedPost
                key={post.id}
                id={post.id}
                user={post.user}
                session={post.session}
                createdAtLabel={post.createdAtLabel}
                drinkType={post.bonusDrinkType || "shot"}
                drinkName={post.drinkName || "Unknown"}
              />
            );

          case "badge":
            return (
              <BadgeFeedPost
                key={post.id}
                id={post.id}
                title={post.badgeTitle || "Achievement"}
                description={post.badgeDescription || "Unlocked!"}
                user={post.user.name}
                session={post.session.title}
                icon={post.badgeIcon}
              />
            );

          case "recap":
            return (
              <RecapFeedPost
                key={post.id}
                id={post.id}
                sessionTitle={post.session.title}
                beersLogged={post.beersLogged || 0}
                pintScore={post.pintScore || 0}
                mediaCount={post.mediaCount || 0}
                onViewReceipts={() =>
                  onPostAction?.(post.id, "view_receipts")
                }
              />
            );

          case "session_started":
            return (
              <SessionStartedFeedPost
                key={post.id}
                id={post.id}
                user={post.user.name}
                session={post.session.title}
                onJoin={() => onPostAction?.(post.id, "join")}
              />
            );

          default:
            return null;
        }
      })}
    </section>
  );
}
