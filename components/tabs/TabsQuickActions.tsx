"use client";

import { AppButton } from "@/components/common/AppButton";

interface TabsQuickActionsProps {
  onCreateTab: () => void;
  onJoinCode: () => void;
}

export function TabsQuickActions({
  onCreateTab,
  onJoinCode,
}: TabsQuickActionsProps) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <AppButton
        variant="secondary"
        size="md"
        onClick={onCreateTab}
      >
        Open Tab
      </AppButton>
      <AppButton
        variant="outline"
        size="md"
        onClick={onJoinCode}
      >
        Join with Code
      </AppButton>
    </div>
  );
}
