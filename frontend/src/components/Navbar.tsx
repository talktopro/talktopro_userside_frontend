import { JSX } from "react";
import { Input } from "@/components/ui/input";
import logo from "../assets/logo.svg";
import {
  Bell,
  CreditCard,
  Heart,
  LayoutTemplate,
  LogOut,
  NotebookText,
  Settings,
  User,
  UserRound,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  interface MenuItem {
    label: string;
    value: string;
    pathLocation: string;
    icon: JSX.Element;
  }

  const menuItems: MenuItem[] = [
    {
      label: "Account Details",
      pathLocation: "",
      value: "account_details",
      icon: <UserRound strokeWidth={1.5} size={18} />,
    },
    {
      label: "Bookings",
      pathLocation: "",
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
      pathLocation: "",
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
    <nav className="bg-white fixed w-full z-10 border-b-1 border-b-gray-200">
      <div className="container mx-auto px-8 flex items-center justify-between h-18">
        <div className="flex items-center gap-2">
          <img src={logo} width={35} />
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-1">
            Talk<span>To</span> <span className="text-primary">Pro</span>
          </h3>
        </div>

        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md sm:max-w-sm not-sm:hidden"
        />

        <div className="flex items-center">
          <div
            className="bg-transparent px-2 py-1 flex justify-center items-center rounded-sm hover:bg-gray-100 transition duration-300 cursor-pointer sm:hidden"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <Search strokeWidth={1.5} width={18} />
          </div>

          <div className="bg-transparent px-2 py-1 flex justify-center items-center rounded-sm hover:bg-gray-100 transition duration-300 cursor-pointer">
            <Bell strokeWidth={1.5} width={18} />
          </div>

          <div className="bg-transparent px-2 py-1 flex justify-center items-center rounded-sm hover:bg-gray-100 transition duration-300 cursor-pointer">
            <Select>
              <SelectTrigger className="shadow-none border-none focus:ring-0 focus:outline-none p-0 h-auto [&>svg]:text-black">
                <User strokeWidth={1.5} width={18} />
              </SelectTrigger>
              <SelectContent>
                {menuItems.map((item: MenuItem) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className={`flex items-center transition duration-300 cursor-pointer ${
                      item.value === "logout"
                        ? "text-red-400 hover:bg-gradient-to-r from-[#ffeded] to-[#ffd5d5]"
                        : "text-gray-700 hover:text-black hover:bg-gradient-to-r from-[#FFF9F9] to-[#ebdfff]"
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
      {isSearchVisible && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 sm:hidden px-8 pb-2">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full p-2 focus:ring-0 focus:outline-none"
            autoFocus
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
