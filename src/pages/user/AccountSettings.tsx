import { Mail, Phone } from "lucide-react";
import avatar from "@/assets/avatar/user.png";
import background from "@/assets/backgrounds/grainy.jpg";
import EditAccountDetails from "@/components/user/EditAccountDetails";
import { selectAuth } from "@/redux/slices/authSlice";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const { user } = useSelector(selectAuth);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-10 mt-5">
      <div className="relative">
        <div
          className="w-full h-24 sm:h-32 rounded-lg"
          style={{
            backgroundImage: `url('${background}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "15%",
          }}
        />
        <div className="px-4 sm:px-10 pb-4 relative">
          <div className="flex justify-center">
            <div className="absolute -top-12 sm:-top-16 h-24 sm:h-32 rounded-md overflow-hidden bg-background aspect-[3.5/4]">
              <img
                src={
                  user?.profileImg
                    ? `https://${bucketName}.s3.amazonaws.com/${user.profileImg}`
                    : avatar
                }
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <div className="flex sm:flex-row justify-center items-center gap-2 sm:gap-1">
              <h1 className="text-xl sm:text-2xl font-semibold whitespace-nowrap capitalize text-center">
                {user?.uname}
              </h1>
              <EditAccountDetails user={user} />
            </div>
            <div className="mt-2 space-y-2 flex flex-col">
              <div className="flex justify-center items-center opacity-70">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm break-all">{user?.email}</span>
              </div>
              <div className="flex justify-center items-center opacity-70">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{user?.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
