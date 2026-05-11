interface CardShellProps {
  children: React.ReactNode;
  variant?: "feed" | "tabs";
  className?: string;
}

export function CardShell({
  children,
  variant = "tabs",
  className = "",
}: CardShellProps) {
  const baseStyles =
    "rounded-[28px] border border-[#D4D0CC] bg-white";
  const variantStyles = {
    feed: "shadow-[0_10px_30px_rgba(0,21,36,0.08)] p-4",
    tabs: "shadow-[0_6px_18px_rgba(0,21,36,0.05)] p-3",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
