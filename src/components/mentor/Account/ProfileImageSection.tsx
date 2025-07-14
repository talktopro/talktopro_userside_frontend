import useImageCropper from "@/hooks/useImageCropper";
import { Camera, ImageUp } from "lucide-react";

const ProfileImageSection = () => {
  const { inputRef, handleImageChange, handleInputTrigger } = useImageCropper();

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex items-center flex-col">
        <div className="w-xs h-auto rounded-md overflow-hidden aspect-[3.5/4] relative mr-4 not-sm:mr-0 bg-background border">
          {false ? (
            <img
              src=""
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-muted-foreground cursor-pointer" onClick={handleInputTrigger}>
              <ImageUp strokeWidth={1.5} height={18} />
              <span className="text-xs text-center mt-2">Click to<br /> Upload<br />Profile image</span>
            </div>
          )}
          {false && (
            <div className="absolute bottom-1 right-1">
              <Camera
                strokeWidth={1.5}
                className="bg-background rounded-full p-1 w-6 h-6 cursor-pointer border"
                onClick={handleInputTrigger}
              />
            </div>
          )}
        </div>

        <input
          type="file"
          hidden
          ref={inputRef}
          accept=".jpg, .jpeg"
          onChange={handleImageChange}
        />
      </div>
    </div>
  )
}

export default ProfileImageSection;