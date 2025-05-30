import { JSX, useEffect } from "react";
import logo from "@/assets/svg/logo.svg";
import {
  LayoutTemplate,
  LogOut,
  NotebookText,
  UserRound,
  Moon,
  Sun,
  ChevronDown,
} from "lucide-react";
import { ROUTES } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import { TooltipProvider } from "../ui/tooltip";
import Notification from "../common/Notification";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "@/redux/slices/authSlice";
import { Button } from "../ui/button";
import Searchbar from "./Searchbar";
import CustomTooltip from "../common/CustomTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import useNotification from "@/hooks/useNotification";
import { resetNotificationState } from "@/redux/slices/notificationSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const { user } = useSelector(selectAuth);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const {
    notifications,
    isLoading,
    fetchNotification,
    deleteAllNotification,
    isDeleteAllLoading,
    isReadAllNotification,
    readAllNotification,
    handleNotificationClick
  } = useNotification("user");


  useEffect(() => {
    fetchNotification();
  }, []);

  interface MenuItem {
    label: string;
    value: string;
    pathLocation: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItem[] = [
    {
      label: "Account Details",
      pathLocation: ROUTES.ACCOUNT_SETTINGS,
      value: "account_details",
      icon: <UserRound strokeWidth={1.5} size={18} />,
    },
    {
      label: "Bookings",
      pathLocation: ROUTES.BOOKINGS,
      value: "bookings",
      icon: <NotebookText strokeWidth={1.5} size={18} />,
    },

    !user?.isMentor ?
      {
        label: "Register as Mentor",
        pathLocation: ROUTES.MENTOR.REGISTER,
        value: "registerMentor",
        icon: <LayoutTemplate strokeWidth={1.5} size={18} />,
      } : {
        label: "Professional Dashboard",
        pathLocation: ROUTES.MENTOR.DASHBOARD,
        value: "service_provider_console",
        icon: <LayoutTemplate strokeWidth={1.5} size={18} />,
      },
  ];

  const handleLogout = () => {
    dispatch(resetNotificationState());
    dispatch(logout());
  };

  return (
    <nav className="fixed w-full z-50 border-b-1 bg-background">
      <div className="container mx-auto sm:px-8 not-sm:px-4 flex items-center justify-between h-18 relative">
        <Link to={ROUTES.HOME}>
          <div className="flex items-center gap-2">
            <img src={logo} width={35} />
            <h3 className="text-2xl font-bold flex items-center gap-1">
              Talk<span>To</span> <span className="text-purple-500">Pro</span>
            </h3>
          </div>
        </Link>

        <Searchbar />

        <div className="flex items-center">
          {user?.id && (
            <Notification
              notifications={notifications}
              loading={isLoading}
              role="user"
              deleteAllNotification={deleteAllNotification}
              isDeleteAllLoading={isDeleteAllLoading}
              isReadAllNotification={isReadAllNotification}
              readAllNotification={readAllNotification}
              handleNotificationClick={handleNotificationClick}
            />
          )}

          <TooltipProvider>
            <div onClick={toggleTheme}>
              <CustomTooltip
                content="Theme"
                trigger={
                  theme === "light" ? (
                    <Sun strokeWidth={1.5} size={18} />
                  ) : (
                    <Moon strokeWidth={1.5} size={18} />
                  )
                }
              />
            </div>
          </TooltipProvider>

          {user?.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center cursor-pointer border rounded-full pr-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={
                        user.profileImg
                          ? `https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${user.profileImg}`
                          : logo
                      }
                    />
                  </Avatar>
                  <ChevronDown width={18} strokeWidth={1.5} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-4">
                {menuItems.map((item: MenuItem) => (
                  <DropdownMenuItem
                    key={item.value}
                    className="flex items-center transition duration-300 pr-10 cursor-pointer hover:bg-muted"
                    onSelect={() => {
                      navigate(item.pathLocation);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className="flex items-center transition duration-300 pr-10 cursor-pointer hover:bg-muted text-red-600 hover:text-red-600"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        <span><LogOut strokeWidth={1.5} size={18} /></span>
                        <span>Logout</span>
                      </div>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="w-sm p-6">
                    <DialogHeader>
                      <DialogTitle className="text-center mb-2">
                        Confirm Logout
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        You will be logged out of your account. Are you sure you want to continue?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center gap-1">
                      <DialogClose asChild>
                        <Button
                          variant="ghost"
                          className="w-1/2 border"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        className="w-1/2 text-white bg-red-600 hover:bg-red-700 hover:text-white"
                        variant="ghost"
                        onClick={handleLogout}
                      >
                        Yes, Logout
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="ml-1">
              <Link to={ROUTES.AUTH.LOGIN}>Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
