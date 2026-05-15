import { Bell } from "lucide-react";
import { AppText } from "@/components/common/AppText";

interface FeedHeaderProps {
  title?: string;
}

export function FeedHeader({ title = "The Tab" }: FeedHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <AppText as="h1" variant="brand">
        {title}
      </AppText>

      <div className="flex items-center gap-3">
        <button className="h-10 w-10 rounded-full bg-white border border-medium-gray shadow-[0_4px_14px_rgba(0,21,36,0.06)] flex items-center justify-center hover:shadow-[0_6px_16px_rgba(0,21,36,0.08)] transition-shadow">
          <Bell className="h-5 w-5 text-ink" />
        </button>

        <button className="relative h-10 w-10 rounded-full bg-white border border-medium-gray shadow-[0_4px_14px_rgba(0,21,36,0.06)] flex items-center justify-center text-sm font-black hover:shadow-[0_6px_16px_rgba(0,21,36,0.08)] transition-shadow">
          TP
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange border-2 border-white" />
        </button>
      </div>
    </header>
  );
}
