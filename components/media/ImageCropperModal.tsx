"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Cropper from "react-easy-crop";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { getCroppedImageResult } from "./imageCropUtils";

export interface ImageCropperModalProps {
  open: boolean;
  imageSrc: string | null;
  title: string;
  aspect: number;
  cropShape?: "rect" | "round";
  onCancel: () => void;
  onSave: (result: {
    croppedImageUrl: string;
    croppedBlob: Blob;
  }) => void;
}

export function ImageCropperModal({
  open,
  imageSrc,
  title,
  aspect,
  cropShape = "rect",
  onCancel,
  onSave,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [saving, setSaving] = useState(false);
  const originalOverflow = useRef<string>("");

  useEffect(() => {
    if (open) {
      originalOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (originalOverflow.current !== undefined) {
        document.body.style.overflow = originalOverflow.current;
      }
    };
  }, [open]);

  const handleCropComplete = (
    _croppedArea: any,
    croppedAreaPixels: any
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setSaving(true);
    try {
      const result = await getCroppedImageResult(imageSrc, croppedAreaPixels);
      onSave(result);
      setSaving(false);
    } catch (error) {
      console.error("Error cropping image:", error);
      setSaving(false);
    }
  };

  if (!open || !imageSrc) return null;

  return (
    <div className="fixed inset-0 z-[100] flex h-dvh flex-col overflow-hidden bg-ink">
      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-ink/60 to-transparent">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Cancel"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <AppText as="h1" variant="cardTitle" className="text-white text-sm">
          {title}
        </AppText>

        <div className="w-9" />
      </header>

      {/* Crop Area */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape}
          showGrid
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      {/* Zoom Controls */}
      <div className="shrink-0 bg-ink/80 px-4 py-3 flex items-center gap-3">
        <AppText variant="meta" className="text-white/75 text-xs">
          Zoom
        </AppText>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, rgb(255,255,255,0.2) 0%, rgb(255,255,255,0.2) ${((zoom - 1) / 2) * 100}%, rgb(249,115,22,0.4) ${((zoom - 1) / 2) * 100}%, rgb(249,115,22,0.4) 100%)`,
          }}
        />
        <AppText variant="meta" className="text-white/75 text-xs w-8">
          {zoom.toFixed(1)}x
        </AppText>
      </div>

      {/* Action Buttons */}
      <div className="shrink-0 flex gap-3 px-4 py-4 bg-white rounded-t-[28px]">
        <AppButton
          variant="secondary"
          size="lg"
          fullWidth
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </AppButton>
        <AppButton
          size="lg"
          fullWidth
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Use Photo"}
        </AppButton>
      </div>
    </div>
  );
}
