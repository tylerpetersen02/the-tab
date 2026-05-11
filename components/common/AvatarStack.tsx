import { UserAvatar } from "@/components/common/UserAvatar";

interface AvatarStackProps {
  initials: string[];
  maxDisplay?: number;
  size?: "sm" | "md";
}

export function AvatarStack({
  initials,
  maxDisplay = 3,
  size = "sm",
}: AvatarStackProps) {
  const displayed = initials.slice(0, maxDisplay);
  const overflow = initials.length - maxDisplay;

  return (
    <div className="flex items-center -space-x-1">
      {displayed.map((initial, i) => (
        <UserAvatar key={`avatar-${i}`} initials={initial} size={size} />
      ))}
      {overflow > 0 && (
        <div
          className={`flex items-center justify-center rounded-full font-semibold text-[#8B8680] ${
            size === "sm"
              ? "h-7 w-7 text-xs"
              : "h-10 w-10 text-sm"
          } bg-[#F3F4F6]`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
