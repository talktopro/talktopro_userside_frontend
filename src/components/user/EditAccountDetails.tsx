import { User } from "@/types/user";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomTooltip from "@/components/common/CustomTooltip";
import { Camera, ImageUp, MoreVertical } from "lucide-react";
import ImageCropper from "@/components/common/ImageCropper";
import useImageCropper from "@/hooks/useImageCropper";
import { toast } from "sonner";
import { useState } from "react";
import apiClient from "@/api/axiosInstance";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateUser } from "@/redux/slices/authSlice";
import useErrorHandler from "@/hooks/useErrorHandler";

interface EditAccountDetailsProps {
  user: User;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name is too long.")
    .regex(/^[A-Za-z ]+$/, "Name can only contain letters and spaces"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{6,20}$/, "Enter a valid phone number."),
});

const EditAccountDetails = ({ user }: EditAccountDetailsProps) => {
  const { inputRef, handleImageChange, handleInputTrigger, handleClose, createCroppedBlobImage, handleSave, isCropperOpen, selectedImage } = useImageCropper();
  const dispatch = useDispatch<AppDispatch>();
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const { handleError } = useErrorHandler();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.uname,
      phone: user.phone == 0 ? "" : user.phone.toString(),
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
      dispatch(
        updateUser({
          uname: updateResponse?.data?.uname,
          phone: updateResponse?.data?.phone,
        })
      );
      toast.success("Account details updated successfully");
    } catch (error) {
      handleError(error, "Failed to update account details");
    } finally {
      setLoading(false);
    }
  };

  const disableButton: () => boolean = () => {
    const currentValue = form.getValues();
    return (
      currentValue.name.trim() === user?.uname.trim() &&
      currentValue.phone.trim() === user?.phone?.toString().trim()
    );
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
        <DrawerContent className="flex items-center justify-center">
          <div className="max-h-[90vh] overflow-scroll custom-scrollbar w-full lg:max-w-lg">
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
                  <div className="w-auto h-32 rounded-md overflow-hidden aspect-[3.5/4] relative mr-4 not-sm:mr-0 bg-background border">
                    {user?.profileImg ? (
                      <img
                        src={`https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${user.profileImg}`}
                        alt="Profile picture"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col justify-center items-center h-full text-muted-foreground cursor-pointer" onClick={handleInputTrigger}>
                        <ImageUp strokeWidth={1.5} height={18} />
                        <span className="text-xs text-center mt-2">Click to<br /> Upload<br />Profile image</span>
                      </div>
                    )}
                    {user?.profileImg && (
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
                    value={user.email}
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
                    disabled={loading || disableButton()}
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
          createCroppedBlobImage={createCroppedBlobImage}
          onSave={handleSave}
          onClose={handleClose}
          isOpen={isCropperOpen}
        />
      )}
    </>
  );
};

export default EditAccountDetails;
