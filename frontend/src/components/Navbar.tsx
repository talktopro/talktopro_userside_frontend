import { JSX } from "react";
import { Input } from "@/components/ui/input";
import logo from "../assets/logo.svg";
import {
  CreditCard,
  Heart,
  LayoutTemplate,
  LogOut,
  NotebookText,
  Settings,
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
import { ROUTES } from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Notification from "./Notification";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  1;
  const navigate = useNavigate();

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
      label: "Transactions",
      pathLocation: "",
      value: "transactions",
      icon: <CreditCard strokeWidth={1.5} size={18} />,
    },
    {
      label: "Service Provider Console",
      pathLocation: ROUTES.MENTOR.DASHBOARD,
      value: "service_provider_console",
      icon: <LayoutTemplate strokeWidth={1.5} size={18} />,
    },
    {
      label: "Favorite",
      pathLocation: "",
      value: "favorite",
      icon: <Heart strokeWidth={1.5} size={18} />,
    },
    {
      label: "Settings",
      pathLocation: "",
      value: "settings",
      icon: <Settings strokeWidth={1.5} size={18} />,
    },
    {
      label: "Logout",
      pathLocation: "",
      value: "logout",
      icon: <LogOut strokeWidth={1.5} size={18} />,
    },
  ];
  return (
    <nav
      className={`fixed w-full z-10 border-b-1 ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
    >
      <div className="container mx-auto px-8 flex items-center justify-between h-18">
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
          className="w-full max-w-md sm:max-w-sm not-sm:hidden"
        />

        <div className="flex items-center">
          <Notification />

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

          <div className="bg-transparent px-2 py-1 flex justify-center items-center rounded-sm hover:bg-muted transition duration-300 cursor-pointer">
            <Select
              onValueChange={(value) => {
                const selectedItem = menuItems.find(
                  (item) => item.value === value
                );
                if (selectedItem) navigate(selectedItem.pathLocation);
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
                      item.value === "logout" && "text-red-600"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
