"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/components/common/AppButton";

type BackButtonProps = {
  label?: string;
  onBack?: () => void;
};

export function BackButton({ label = "Back", onBack }: BackButtonProps) {
  const router = useRouter();

  return (
    <AppButton
      variant="ghost"
      size="sm"
      onClick={onBack ?? (() => router.back())}
      className="px-0 text-dark-gray hover:text-ink"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </AppButton>
  );
}
