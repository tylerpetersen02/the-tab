import { Inbox } from "lucide-react";

interface TabsEmptyStateProps {
  title: string;
  description: string;
}

export function TabsEmptyState({
  title,
  description,
}: TabsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Inbox className="h-12 w-12 text-[#D4D0CC] mb-3" />
      <h3 className="text-sm font-semibold text-[#001524]">{title}</h3>
      <p className="mt-1 text-xs text-[#8B8680]">{description}</p>
    </div>
  );
}
