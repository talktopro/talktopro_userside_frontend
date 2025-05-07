import { Mail, Phone } from "lucide-react";
import avatar from "@/assets/avatar/user.png";
import EditAccountDetails from "@/components/user/EditAccountDetails";
import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const { user } = useSelector(selectAuth);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 mt-5">
      <div
        className="w-full h-24 sm:h-32 rounded-lg accountDetails_bg"
      />
      <div className="px-4 sm:px-10 pb-4">
        <div className="flex justify-center relative">
          <div
            className="absolute transform -translate-y-1/2 left-1/2 -translate-x-1/2 h-24 sm:h-32 w-24 sm:w-28 rounded-md overflow-hidden bg-background top-0">
            <img
              src={
                user?.profileImg
                  ? `https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${user.profileImg}`
                  : avatar
              }
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-20 sm:mt-24">
          <div className="flex sm:flex-row justify-center items-center gap-2 sm:gap-1">
            <h1 className="text-xl sm:text-2xl font-semibold whitespace-nowrap capitalize text-center">
              {user?.uname || "User Name"}
            </h1>
            <EditAccountDetails user={user} />
          </div>

          <div className="mt-4 space-y-3 flex flex-col">
            <div className="flex justify-center items-center opacity-70">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm break-all text-center">{user?.email || "User email"}</span>
            </div>
            <div className="flex justify-center items-center opacity-70">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{user?.phone || "00000-00000"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;