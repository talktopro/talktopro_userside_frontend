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
  onSortChange: (sort: "NewestToOldest" | "OldestToNewest") => void;
  sort: "NewestToOldest" | "OldestToNewest";
}

const BookingsHeader: React.FC<BookingsHeaderProps> = ({
  showSelect = false,
  onSortChange,
  sort
}) => {
  return (
    <div className="flex justify-between items-start pb-10">
      <h2 className="text-2xl not-sm:text-lg font-bold">Booking History</h2>
      {showSelect && (
        <Select
          value={sort}
          onValueChange={(value: "NewestToOldest" | "OldestToNewest") =>
            onSortChange(value)
          }
        >
          <SelectTrigger className="w-[180px] not-sm:w-[120px] focus:ring-0 focus:outline-none cursor-pointer">
            <SelectValue placeholder="Sort by Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="NewestToOldest">Newest to Oldest</SelectItem>
              <SelectItem value="OldestToNewest">Oldest to Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default BookingsHeader;
