import { shadows } from "@/lib/shadows";

interface CardShellProps {
  children: React.ReactNode;
  variant?: "default" | "feed" | "compact" | "score";
  className?: string;
}

export function CardShell({
  children,
  variant = "default",
  className = "",
}: CardShellProps) {
  const variants = {
    default: `rounded-[28px] border border-medium-gray bg-white ${shadows.card}`,
    feed: `rounded-[28px] border border-medium-gray bg-white ${shadows.feed}`,
    compact: `rounded-[24px] border border-medium-gray bg-white ${shadows.compact}`,
    score: `rounded-[28px] border border-medium-gray bg-white ${shadows.card}`,
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
