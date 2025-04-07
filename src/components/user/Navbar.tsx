import { JSX, useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import {
  // Heart,
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
import { INotification } from "@/interfaces/user";
import apiClient from "@/api/axiosInstance";
import Searchbar from "./Searchbar";
import CustomTooltip from "../common/CustomTooltip";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const dispatch = useDispatch();
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const { user } = useSelector(selectAuth);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotification = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiClient.get<INotification[]>(`url`);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error occurred while fetching Notifications!", error);
      toast.error("Failed to collect Notifications.");
    } finally {
      setIsLoading(false);
    }
  };

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
    {
      label: "Professional Dashboard",
      pathLocation: ROUTES.MENTOR.DASHBOARD,
      value: "service_provider_console",
      icon: <LayoutTemplate strokeWidth={1.5} size={18} />,
    },
    // {
    //   label: "Favourites",
    //   pathLocation: "",
    //   value: "favourites",
    //   icon: <Heart strokeWidth={1.5} size={18} />,
    // },
    {
      label: "Logout",
      pathLocation: "",
      value: "logout",
      icon: <LogOut strokeWidth={1.5} size={18} />,
    },
  ];

  const handleLogout = () => {
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
          <Notification notifications={notifications} loading={isLoading} />

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
                          ? `https://${bucketName}.s3.amazonaws.com/${user.profileImg}`
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
                    className={`flex items-center transition duration-300 pr-10 cursor-pointer hover:bg-muted ${
                      item.value === "logout" ? "text-red-600" : ""
                    }`}
                    onSelect={(e) => {
                      e.preventDefault();
                      if (item.value === "logout") {
                        handleLogout();
                      } else {
                        navigate(item.pathLocation);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
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
