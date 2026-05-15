export type TabMediaItem = {
  id: string;
  drinkId: string;
  userId: string;
  userName: string;
  userInitials: string;
  userAvatarUrl?: string | null;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  drinkType: string;
  drinkNumber?: number;
  ounces?: number;
  createdAt: string;
};
