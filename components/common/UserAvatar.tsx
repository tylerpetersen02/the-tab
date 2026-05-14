interface UserAvatarProps {
  initials: string;
  size?: "sm" | "md";
}

export function UserAvatar({ initials, size = "md" }: UserAvatarProps) {
  const dimensions =
    size === "sm"
      ? "h-8 w-8 text-xs"
      : "h-10 w-10 text-sm";

  const colors = [
    "bg-teal",
    "bg-orange",
    "bg-ink",
    "bg-brandy",
  ];

  const colorIndex = initials.charCodeAt(0) % colors.length;

  return (
    <div
      className={`${dimensions} flex items-center justify-center rounded-full font-black text-white shadow-sm ${colors[colorIndex]}`}
    >
      {initials}
    </div>
  );
}
