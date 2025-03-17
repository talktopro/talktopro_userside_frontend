import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

interface BookingsHeaderProps {
  showSelect?: boolean;
  onSortChange: (sort: "ascending" | "descending") => void;
}

const BookingsHeader: React.FC<BookingsHeaderProps> = ({
  showSelect = false,
  onSortChange,
}) => {
  return (
    <div className="flex justify-between items-start pb-10">
      <h2 className="text-2xl not-sm:text-lg font-bold">Booking History</h2>
      {showSelect && (
        <Select
          onValueChange={(value: "ascending" | "descending") =>
            onSortChange(value)
          }
        >
          <SelectTrigger className="w-[180px] not-sm:w-[120px] focus:ring-0 focus:outline-none cursor-pointer">
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ascending">Date Ascending</SelectItem>
              <SelectItem value="descending">Date Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default BookingsHeader;
