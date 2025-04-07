import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { IQueryDetails } from "@/interfaces/admin";

interface TableHeadingProps {
  heading: string;
  searchPlaceholder: string;
  handleSort: (sort: "NewestToOldest" | "OldestToNewest") => void;
  handleSearch: (search: string) => void;
  showSelect: boolean;
  queryDetails: IQueryDetails;
}
const AdminTableHeader: React.FC<TableHeadingProps> = ({
  heading,
  searchPlaceholder,
  handleSearch,
  handleSort,
  showSelect = false,
  queryDetails,
}) => {
  return (
    <div className="pb-7">
      <h2 className="text-2xl not-sm:text-lg font-bold mb-3">{heading}</h2>
      <div className="flex justify-between items-start gap-3">
        <Input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full max-w-md sm:max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {showSelect && (
          <Select
            value={queryDetails.sort}
            onValueChange={(value: "NewestToOldest" | "OldestToNewest") =>
              handleSort(value)
            }
          >
            <SelectTrigger className="w-[180px] not-sm:w-[120px] focus:ring-0 focus:outline-none cursor-pointer">
              <SelectValue placeholder="Sort by Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="NewestToOldest"
                  className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
                >
                  Newest to oldest
                </SelectItem>
                <SelectItem
                  value="OldestToNewest"
                  className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
                >
                  Oldest to newest
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default AdminTableHeader;
