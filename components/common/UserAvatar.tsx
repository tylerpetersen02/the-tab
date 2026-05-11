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
    "bg-[#15616d]",
    "bg-[#ff7d00]",
    "bg-[#001524]",
    "bg-[#6FAFA5]",
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
