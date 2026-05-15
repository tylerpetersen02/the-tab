export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export async function getCroppedImageBlob(
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(blob);
    }, "image/jpeg", 0.95);
  });
}

export async function getCroppedImageResult(
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<{ croppedImageUrl: string; croppedBlob: Blob }> {
  const croppedBlob = await getCroppedImageBlob(imageSrc, pixelCrop);
  const croppedImageUrl = URL.createObjectURL(croppedBlob);

  return {
    croppedImageUrl,
    croppedBlob,
  };
}
