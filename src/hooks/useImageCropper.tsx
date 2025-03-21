import { useRef, useState } from "react";
import { toast } from "sonner";

const useImageCropper = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleInputTrigger = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        setSelectedImage(file);
        setIsCropperOpen(true);
      } else {
        toast.error("Only JPG/JPEG files are allowed.");
      }
    }
  };

  const handleCropComplete = (croppedAreaPixels: {
    width: number;
    height: number;
    x: number;
    y: number;
  }) => {
    console.log("Cropped Area Pixels:", croppedAreaPixels);
  };

  const handleSave = () => {
    setIsCropperOpen(false);
    console.log("Image saved");
  };

  const handleClose = () => {
    setIsCropperOpen(false);
  };

  return {
    inputRef,
    handleInputTrigger,
    handleImageChange,
    selectedImage,
    handleCropComplete,
    isCropperOpen,
    handleSave,
    handleClose,
  };
};

export default useImageCropper;
