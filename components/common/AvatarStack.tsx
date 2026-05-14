import { UserAvatar } from "@/components/common/UserAvatar";

interface AvatarStackProps {
  initials: string[];
  maxDisplay?: number;
  size?: "sm" | "md";
  fillWidth?: boolean;
}

export function AvatarStack({
  initials,
  maxDisplay = 3,
  size = "sm",
  fillWidth = false,
}: AvatarStackProps) {
  const displayed = initials.slice(0, maxDisplay);
  const overflow = initials.length - maxDisplay;

  if (fillWidth) {
    return (
      <div className="flex items-center -space-x-1 w-full flex-wrap">
        {displayed.map((initial, i) => (
          <UserAvatar key={`avatar-${i}`} initials={initial} size={size} />
        ))}
        {overflow > 0 && (
          <div
            className={`flex items-center justify-center rounded-full font-semibold text-dark-gray ${
              size === "sm"
                ? "h-7 w-7 text-xs"
                : "h-10 w-10 text-sm"
            } bg-light-gray`}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center -space-x-1">
      {displayed.map((initial, i) => (
        <UserAvatar key={`avatar-${i}`} initials={initial} size={size} />
      ))}
      {overflow > 0 && (
        <div
          className={`flex items-center justify-center rounded-full font-semibold text-dark-gray ${
            size === "sm"
              ? "h-7 w-7 text-xs"
              : "h-10 w-10 text-sm"
          } bg-light-gray`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
