import { Inbox } from "lucide-react";
import { AppText } from "@/components/common/AppText";

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
      <Inbox className="h-12 w-12 text-medium-gray mb-3" />
      <AppText as="h3" variant="body">{title}</AppText>
      <AppText as="p" variant="meta" className="mt-1">{description}</AppText>
    </div>
  );
}
