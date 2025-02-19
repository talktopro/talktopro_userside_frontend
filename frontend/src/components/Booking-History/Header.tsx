import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

const BookingsHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center pb-10">
      <h2 className="text-2xl not-sm:text-lg font-bold">Booking History</h2>
      <Select>
        <SelectTrigger className="w-[180px] not-sm:w-[140px] focus:ring-0 focus:outline-none cursor-pointer">
          <SelectValue placeholder="Sort by Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="asc"
              className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
            >
              Date Ascending
            </SelectItem>
            <SelectItem
              value="desc"
              className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
            >
              Date Descending
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingsHeader;
