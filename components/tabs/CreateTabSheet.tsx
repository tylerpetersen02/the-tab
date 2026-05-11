"use client";

interface CreateTabSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tabData: { title: string; description?: string }) => void;
}

export function CreateTabSheet({
  isOpen,
  onClose,
  onSubmit,
}: CreateTabSheetProps) {
  if (!isOpen) return null;

  // TODO: Implement full sheet with form
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="w-full bg-white rounded-t-2xl p-6">
        <h2 className="text-lg font-semibold text-[#001524]">Create a Tab</h2>
        <p className="mt-1 text-sm text-[#8B8680]">Coming soon</p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#F3F4F6] py-3 text-sm font-semibold text-[#001524]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
