import { JSX, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.svg";
import {
  Heart,
  LayoutTemplate,
  LogOut,
  NotebookText,
  User,
  UserRound,
  Moon,
  Sun,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { ROUTES } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Notification from "../common/Notification";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "@/redux/slices/authSlice";
import { Button } from "../ui/button";
import { INotification } from "@/interfaces/user";
import apiClient from "@/api/axiosInstance";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);
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
    {
      label: "Favourites",
      pathLocation: "",
      value: "favourites",
      icon: <Heart strokeWidth={1.5} size={18} />,
    },
    {
      label: "Logout",
      pathLocation: "",
      value: "logout",
      icon: <LogOut strokeWidth={1.5} size={18} />,
    },
  ];
  const handleLogout = async () => {
    await dispatch(logout());
  };
  return (
    <nav
      className={`fixed w-full z-10 border-b-1 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="container mx-auto sm:px-8 not-sm:px-4  flex items-center justify-between h-18">
        <Link to={ROUTES.HOME}>
          <div className="flex items-center gap-2">
            <img src={logo} width={35} />
            <h3 className="text-2xl font-bold flex items-center gap-1">
              Talk<span>To</span> <span className="text-purple-500">Pro</span>
            </h3>
          </div>
        </Link>

        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md sm:max-w-sm not-md:hidden"
        />

        <div className="flex items-center">
          <Notification notifications={notifications} loading={isLoading} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  className="bg-transparent p-2 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? (
                    <Sun strokeWidth={1.5} size={18} />
                  ) : (
                    <Moon strokeWidth={1.5} size={18} />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white border-1 border-gray-200 text-black">
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {accessToken ? (
            <div className="bg-transparent px-2 py-1 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer">
              <Select
                onValueChange={(value) => {
                  const selectedItem = menuItems.find(
                    (item) => item.value === value
                  );
                  if (selectedItem) {
                    if (selectedItem.value === "logout") {
                      handleLogout();
                    } else {
                      navigate(selectedItem.pathLocation);
                    }
                  }
                }}
              >
                <SelectTrigger className="shadow-none border-none focus:ring-0 focus:outline-none p-0 h-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <User strokeWidth={1.5} width={18} />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border-1 border-gray-200 text-black mt-1.5">
                        <p>Profile & More</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SelectTrigger>
                <SelectContent>
                  {menuItems.map((item: MenuItem) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className={`flex items-center transition duration-300 cursor-pointer hover:bg-muted ${
                        item.value === "logout" ? "text-red-600" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
