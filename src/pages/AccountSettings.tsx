import { Mail, Phone, MoreVertical } from "lucide-react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/common/Footer";
import img from "../assets/sampleProfessionalImage.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { useRef } from "react";

const AccountSettings = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputTrigger = (): void => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full mx-auto pt-20 sm:px-10 not-sm:px-4">
        <div className="relative">
          <div className="w-full h-32 bg-muted rounded-lg" />
          <div className="px-10 pb-4">
            <div className="relative flex justify-center">
              <div className="absolute -top-16 w-auto h-32 rounded-md overflow-hidden">
                <img
                  src={img}
                  alt="Profile picture"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-20">
              <div className="flex justify-center items-center gap-1 ml-4">
                <h1 className="text-2xl font-semibold whitespace-nowrap">
                  Rhaenyra Targaryen
                </h1>

                <Drawer>
                  <DrawerTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="bg-transparent p-2 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer">
                            <MoreVertical strokeWidth={1.5} size={18} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white border-1 border-gray-200 text-black">
                          <p>Edit Profile</p>
                        </TooltipContent>
                      </Tooltip>
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
                          <div className="w-auto h-32 rounded-md overflow-hidden">
                            <img
                              src={img}
                              alt="Profile picture"
                              className="w-full h-full object-cover"
                              onClick={handleInputTrigger}
                            />
                            <input type="file" hidden ref={inputRef} />
                          </div>
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
              </div>
              <div className="mt-2 space-y-1 flex flex-col">
                <div className="flex justify-center items-center opacity-70">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">rhaenyra@gmail.com</span>
                </div>
                <div className="flex justify-center items-center opacity-70">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">(212) 445-7622</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountSettings;
