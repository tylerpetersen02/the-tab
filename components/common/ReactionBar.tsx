import { Heart, MessageCircle } from "lucide-react";

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
          className="flex items-center gap-1.5 text-[#ff7d00] hover:opacity-80 transition-opacity"
        >
          <Heart className="h-5 w-5 fill-[#ff7d00]" />
          <span className="text-sm font-black">{likes}</span>
        </button>

        <button
          onClick={onComment}
          className="flex items-center gap-1.5 text-[#001524] hover:opacity-70 transition-opacity"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-black">{comments}</span>
        </button>
      </div>

      <button className="text-xs font-semibold text-[#8B8680] hover:text-[#001524] transition-colors">
        Share
      </button>
    </div>
  );
}
