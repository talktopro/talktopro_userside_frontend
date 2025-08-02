import apiClient from "@/api/axiosInstance";
import { selectAuth, updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useRef, useState } from "react";
import { Crop } from "react-image-crop";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useErrorHandler from "./useErrorHandler";

const useImageCropper = (onImageUploaded?: (url: string) => void) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const { user } = useSelector(selectAuth);
  const { handleError } = useErrorHandler();
  const dispatch = useDispatch<AppDispatch>();

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

  const createCroppedBlobImage = async (
    crop: Crop,
    imageRef: HTMLImageElement | null,
    quality = 0.8,
    maxWidth = 1200
  ): Promise<Blob | null> => {
    if (!imageRef || !crop.width || !crop.height) return null;

    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");

      const scale = Math.min(
        1,
        maxWidth / (crop.width * (imageRef.naturalWidth / imageRef.width))
      );
      canvas.width =
        crop.width * (imageRef.naturalWidth / imageRef.width) * scale;
      canvas.height =
        crop.height * (imageRef.naturalHeight / imageRef.height) * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.imageSmoothingQuality = "high";
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(
        imageRef,
        crop.x * (imageRef.naturalWidth / imageRef.width),
        crop.y * (imageRef.naturalHeight / imageRef.height),
        crop.width * (imageRef.naturalWidth / imageRef.width),
        crop.height * (imageRef.naturalHeight / imageRef.height),
        0,
        0,
        canvas.width,
        canvas.height
      );

      let finalQuality = quality;
      if (canvas.width > 1000 || canvas.height > 1000) {
        finalQuality = Math.max(0.6, quality);
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          if (blob.size > 500 * 1024) {
            const adjustedQuality = Math.max(0.5, finalQuality - 0.1);
            canvas.toBlob(
              (smallerBlob) => resolve(smallerBlob || blob),
              "image/jpeg",
              adjustedQuality
            );
          } else {
            resolve(blob);
          }
        },
        "image/jpeg",
        finalQuality
      );
    });
  };

  const handleSave = async (croppedImageBlob: Blob): Promise<void> => {
    if (!selectedImage) {
      toast.error("No image selected");
      return;
    }

    try {
      // 1. Get presigned URL
      const presignedUrl: string | undefined = await getPresignedURL();
      if (!presignedUrl) return;

      // 2. Create a File from the Blob
      const croppedImageFile = new File(
        [croppedImageBlob],
        selectedImage.name,
        {
          type: selectedImage.type,
          lastModified: Date.now(),
        }
      );

      // 3. Upload to S3
      const s3Response: Response = await uploadImageToS3(
        presignedUrl,
        croppedImageFile
      );
      if (!s3Response.ok) {
        throw new Error("S3 upload failed");
      }

      // 4. Update database
      await updateDatabase();
      
      // This is the updated profileImg key + cache-busting
      const uploadedUrl = `${user?.id}?${Date.now()}`;

      if (onImageUploaded) {
        onImageUploaded(uploadedUrl);
      }
    } catch (error) {
      handleError(error, "Failed to update profile image");
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
            imageName: `${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${
              user?.id
            }`,
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
      throw error;
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

      // Add timestamp to bust cache
      const updatedProfileImg = dbResponse.data.profileImg
        ? `${dbResponse.data.profileImg}?${Date.now()}`
        : null;

      dispatch(updateUser({ profileImg: updatedProfileImg }));
      toast.success("Profile image updated successfully");
    } catch (error) {
      throw error;
    }
  };

  return {
    inputRef,
    handleInputTrigger,
    handleImageChange,
    selectedImage,
    createCroppedBlobImage,
    isCropperOpen,
    handleSave,
    handleClose,
  };
};

export default useImageCropper;
