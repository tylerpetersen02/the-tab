interface UserAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  avatarUrl?: string | null;
}

export function UserAvatar({ initials, size = "md", avatarUrl }: UserAvatarProps) {
  const dimensions =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : size === "lg"
      ? "h-16 w-16 text-lg"
      : "h-10 w-10 text-sm";

  const colors = [
    "bg-teal",
    "bg-orange",
    "bg-ink",
    "bg-brandy",
  ];

  const colorIndex = initials.charCodeAt(0) % colors.length;

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={initials}
        className={`${dimensions} rounded-full object-cover shadow-sm`}
      />
    );
  }

  return (
    <div
      className={`${dimensions} flex items-center justify-center rounded-full font-black text-white shadow-sm ${colors[colorIndex]}`}
    >
      {initials}
    </div>
  );
}
