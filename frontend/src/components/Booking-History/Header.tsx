import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem, 
} from "@/components/ui/select";

const BookingsHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-start pb-10">
      <h2 className="text-2xl not-sm:text-lg font-bold">Booking History</h2>
      <Select>
        <SelectTrigger className="w-[180px] not-sm:w-[120px] focus:ring-0 focus:outline-none cursor-pointer">
          <SelectValue placeholder="Sort by Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="asc">Date Ascending</SelectItem>
            <SelectItem value="desc">Date Descending</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingsHeader;
