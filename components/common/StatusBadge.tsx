interface StatusBadgeProps {
  label: string;
  variant?: "live" | "default";
  icon?: React.ReactNode;
}

export function StatusBadge({
  label,
  variant = "default",
  icon,
}: StatusBadgeProps) {
  const styles = {
    live: "bg-[#ff7d00] text-white",
    default: "bg-[#F3F4F6] text-[#001524]",
  };

  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${styles[variant]}`}
    >
      {icon && (
        <span className="flex h-3 w-3 flex-shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </div>
  );
}
