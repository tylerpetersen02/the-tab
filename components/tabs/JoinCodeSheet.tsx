"use client";

import { AppButton } from "@/components/common/AppButton";
import { AppText } from "@/components/common/AppText";

interface JoinCodeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export function JoinCodeSheet({
  isOpen,
  onClose,
  onSubmit,
}: JoinCodeSheetProps) {
  if (!isOpen) return null;

  // TODO: Implement full sheet with code input
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end">
      <div className="w-full bg-white rounded-t-2xl p-6">
        <AppText as="h2" variant="cardTitle">Join with Code</AppText>
        <AppText as="p" variant="meta" className="mt-1">Coming soon</AppText>
        <AppButton
          variant="muted"
          size="md"
          fullWidth
          onClick={onClose}
          className="mt-6"
        >
          Close
        </AppButton>
      </div>
    </div>
  );
}
