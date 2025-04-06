import apiClient from "@/api/axiosInstance";
import { selectAuth } from "@/redux/slices/authSlice";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const useImageCropper = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const { user } = useSelector(selectAuth);

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

  const handleSave = async (): Promise<void> => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }

    try {
      // 1. Get presigned URL
      const presignedUrl: string | undefined = await getPresignedURL();
      if (!presignedUrl) return;

      // 2. Upload to S3
      const s3Response: Response = await uploadImageToS3(
        presignedUrl,
        selectedImage
      );
      if (!s3Response.ok) {
        throw new Error("S3 upload failed");
      }

      // 3. Update database
      await updateDatabase();
    } catch (error) {
      console.error("Error in handleSave:", error);
      toast.error("Failed to update profile image");
    } finally {
      handleClose();
    }
  };

  const handleClose = (): void => {
    setIsCropperOpen(false);
  };

  const getPresignedURL = async (): Promise<string | undefined> => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }
    try {
      const { data } = await apiClient.get<{ presignedUrl: string }>(
        `/get-presigned-url`,
        {
          params: {
            imageName: user?.id,
            imageType: selectedImage.type,
          },
        }
      );

      if (data.presignedUrl) {
        return data.presignedUrl;
      } else {
        throw new Error("Failed to get presigned url");
      }
    } catch (error) {
      console.error("Error in getPresignedURL", error);
      toast.error("Failed to get upload URL");
      return undefined;
    }
  };

  const uploadImageToS3 = async (
    url: string,
    file: File
  ): Promise<Response> => {
    try {
      const s3Response: Response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!s3Response.ok) {
        throw new Error(`S3 upload failed with status ${s3Response.status}`);
      }

      return s3Response;
    } catch (error) {
      console.error("Error in uploadImageToS3", error);
      throw error;
    }
  };

  const updateDatabase = async (): Promise<void> => {
    try {
      const dbResponse = await apiClient.post<{
        profileImg: string | null;
        uname: string;
        phone: number;
      }>(`/update-profile`, {
        id: user?.id,
        profileImg: user?.id,
      });
      console.log("dbResponse", dbResponse.data);
    } catch (error) {
      console.error("Error in updateDatabase", error);
      throw error;
    }
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
