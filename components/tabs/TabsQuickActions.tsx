"use client";

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
      <button
        onClick={onCreateTab}
        className="rounded-lg bg-[#15616d] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#0d3f47] transition-colors"
      >
        Create Tab
      </button>
      <button
        onClick={onJoinCode}
        className="rounded-lg border border-[#D4D0CC] bg-white px-4 py-3 text-center text-sm font-semibold text-[#001524] hover:bg-[#FAFAF8] transition-colors"
      >
        Join with Code
      </button>
    </div>
  );
}
