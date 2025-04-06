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
import { Camera, MoreVertical } from "lucide-react";
import ImageCropper from "@/components/common/ImageCropper";
import useImageCropper from "@/hooks/useImageCropper";
import { toast } from "sonner";
import { useState } from "react";
import apiClient from "@/api/axiosInstance";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EditAccountDetailsProps {
  user: User | null;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name is too long.")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"),
});

const EditAccountDetails = ({ user }: EditAccountDetailsProps) => {
  const {
    inputRef,
    handleImageChange,
    handleInputTrigger,
    handleClose,
    handleCropComplete,
    handleSave,
    isCropperOpen,
    selectedImage,
  } = useImageCropper();

  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.uname,
      phone: user?.phone.toString(),
    },
  });

  const [loading, setLoading] = useState(false);

  const saveAccountDetails = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const updateResponse = await apiClient.post(`/update-profile`, {
        id: user?.id,
        name: values.name,
        phone: values.phone,
      });

      console.log("response is ", updateResponse);
      toast.success("Account details updated successfully");
    } catch (error) {
      toast.error("Failed to update account details");
      console.error("Error occur saveAccountDetails", error);
    } finally {
      setLoading(false);
    }
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

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(saveAccountDetails)}
                className="px-6 space-y-4 pt-3"
              >
                <div className="flex items-center flex-col">
                  <div className="w-auto h-32 rounded-md overflow-hidden aspect-[3.5/4] relative">
                    <img
                      src={
                        user?.profileImg
                          ? `https://${bucketName}.s3.amazonaws.com/${user.profileImg}`
                          : avatar
                      }
                      alt="Profile picture"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1">
                      <Camera
                        strokeWidth={1.5}
                        className="bg-background rounded-full p-1 w-6 h-6 cursor-pointer"
                        onClick={handleInputTrigger}
                      />
                    </div>
                  </div>

                  <input
                    type="file"
                    hidden
                    ref={inputRef}
                    accept=".jpg, .jpeg"
                    onChange={handleImageChange}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    value={user?.email || ""}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 sm:text-sm cursor-not-allowed"
                    placeholder="Enter your email"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pb-6 pt-4">
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      className="px-4 py-2 w-full border text-sm font-medium text-red-500 rounded-md hover:text-red-700"
                      type="button"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                  <Button
                    className="px-4 py-2 w-full text-sm font-medium bg-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>

      {selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={handleCropComplete}
          onSave={handleSave}
          onClose={handleClose}
          isOpen={isCropperOpen}
        />
      )}
    </>
  );
};

export default EditAccountDetails;
