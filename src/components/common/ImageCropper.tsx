import { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageCropperProps } from "@/types/user";

const ImageCropper = ({
  image,
  onCropComplete,
  onSave,
  onClose,
  isOpen,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 125, // Adjusted for 4:5 aspect ratio (width:height = 4:5)
  });
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const isImageLoaded = useRef(false);

  // Reset the crop state and image loaded state when the dialog is opened or closed
  useEffect(() => {
    if (isOpen) {
      isImageLoaded.current = false; // Reset the image loaded state
      setCrop({
        unit: "px",
        x: 0,
        y: 0,
        width: 100,
        height: 125, // Adjusted for 4:5 aspect ratio
      });
    }
  }, [isOpen]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (isImageLoaded.current) return; // Skip if the image is already loaded

    const { width, height } = e.currentTarget;

    // Calculate the initial crop size to maintain a 4:5 aspect ratio
    const aspectRatio = 4 / 5; // Desired aspect ratio
    let cropWidth, cropHeight;

    if (width / height > aspectRatio) {
      // Image is wider than the desired aspect ratio
      cropHeight = height;
      cropWidth = cropHeight * aspectRatio;
    } else {
      // Image is taller than the desired aspect ratio
      cropWidth = width;
      cropHeight = cropWidth / aspectRatio;
    }

    // Center the crop area
    const cropX = (width - cropWidth) / 2;
    const cropY = (height - cropHeight) / 2;

    setCrop({
      unit: "px",
      x: cropX,
      y: cropY,
      width: cropWidth,
      height: cropHeight,
    });

    setImageRef(e.currentTarget);
    isImageLoaded.current = true; // Mark the image as loaded
  };

  const handleCropComplete = (crop: Crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedAreaPixels = {
        x: crop.x || 0,
        y: crop.y || 0,
        width: crop.width,
        height: crop.height,
      };
      onCropComplete(croppedAreaPixels);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize Your Image</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <ReactCrop
            crop={crop}
            onChange={(newCrop: Crop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
            aspect={4 / 5} // Enforce 4:5 aspect ratio
          >
            <img
              key={image.name}
              src={URL.createObjectURL(image)}
              alt="Crop me"
              onLoad={handleImageLoad}
              style={{ maxHeight: "50vh", maxWidth: "100%" }}
            />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-red-500 rounded-md hover:text-red-700"
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 text-sm font-medium bg-primary min-w-20"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropper;
