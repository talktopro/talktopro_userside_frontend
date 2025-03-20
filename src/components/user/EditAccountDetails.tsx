import { useRef, useState } from "react";
import avatar from "@/assets/avatar/user.png";
import { User } from "@/types/user";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomTooltip from "@/components/common/CustomTooltip";
import { MoreVertical } from "lucide-react";
import ImageCropper from "@/components/common/ImageCropper";

interface EditAccountDetailsProps {
  user: User | null;
}

const EditAccountDetails = ({ user }: EditAccountDetailsProps) => {
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
      setSelectedImage(file);
      setIsCropperOpen(true);
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

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <TooltipProvider>
            <CustomTooltip
              content="Edit Profile"
              trigger={<MoreVertical strokeWidth={1.5} size={18} />}
            />
          </TooltipProvider>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] flex items-center justify-center">
          <div className="w-full lg:max-w-lg">
            <DrawerHeader>
              <DrawerTitle className="text-center mt-5">
                Edit Profile Details
              </DrawerTitle>
              <DrawerDescription className="text-center">
                Update your personal information below.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-6 space-y-4 pt-3">
              <div className="flex items-center flex-col">
                <div
                  className={`w-auto h-32 rounded-md overflow-hidden cursor-pointer ${
                    user?.profileImage ? "p-2" : "p-5"
                  }`}
                >
                  <img
                    src={user?.profileImage ? user?.profileImage : avatar}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                    onClick={handleInputTrigger}
                  />
                </div>
                <input
                  type="file"
                  hidden
                  ref={inputRef}
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium opacity-70"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={user?.uname}
                  className="mt-1 block w-full px-3 py-2 sm:text-sm"
                  placeholder="Enter your name"
                />
                <span className="text-red-500 text-xs mt-1 block">
                  Name is required
                </span>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium opacity-70"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={user?.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 sm:text-sm cursor-not-allowed"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium opacity-70"
                >
                  Phone
                </label>
                <Input
                  type="tel"
                  id="phone"
                  value={user?.phone}
                  className="mt-1 block w-full px-3 py-2 sm:text-sm"
                  placeholder="Enter your phone number"
                />
                <span className="text-red-500 text-xs mt-1 block">
                  Phone number is required
                </span>
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-6">
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-sm font-medium text-red-500 rounded-md hover:text-red-700"
                >
                  Discard
                </Button>
              </DrawerClose>
              <Button className="px-4 py-2 text-sm font-medium bg-primary">
                Save Changes
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onSave={handleSave}
          onClose={() => setIsCropperOpen(false)}
          isOpen={isCropperOpen}
        />
      )}
    </>
  );
};

export default EditAccountDetails;
