import { Heart, MessageCircle } from "lucide-react";
import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";

interface ReactionBarProps {
  likes: number;
  comments: number;
  onLike?: () => void;
  onComment?: () => void;
}

export function ReactionBar({
  likes,
  comments,
  onLike,
  onComment,
}: ReactionBarProps) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <button
          onClick={onLike}
          className="flex items-center gap-1.5 text-orange hover:opacity-80 transition-opacity"
        >
          <Heart className="h-5 w-5 fill-orange" />
          <AppText as="span" variant="bodySmall" className="text-orange">
            {likes}
          </AppText>
        </button>

        <button
          onClick={onComment}
          className="flex items-center gap-1.5 text-ink hover:opacity-70 transition-opacity"
        >
          <MessageCircle className="h-5 w-5" />
          <AppText as="span" variant="bodySmall" className="text-ink">
            {comments}
          </AppText>
        </button>
      </div>

      <AppButton variant="ghost" size="sm">
        Share
      </AppButton>
    </div>
  );
}
