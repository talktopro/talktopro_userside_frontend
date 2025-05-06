import avatar from "@/assets/avatar/user.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";

const Sidebar_Footer: React.FC = () => {
  const { user } = useSelector(selectAuth);
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none "
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
            <img
              src={
                user?.profileImg
                  ? `https://${bucketName}.s3.amazonaws.com/${user.profileImg}`
                  : avatar
              }
              alt="Profile picture"
              className="w-full h-full object-cover cursor-pointer rounded-lg"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.uname}</span>
            <span className="truncate text-xs">{user?.email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default Sidebar_Footer;
