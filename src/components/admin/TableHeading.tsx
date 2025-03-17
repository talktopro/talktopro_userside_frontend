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

interface TableHeadingProps {
  heading: string;
  searchPlaceholder: string;
  handleSort: (sort: "ascending" | "descending") => void;
  handleSearch: (search: string) => void;
  showSelect: boolean;
}
const AdminTableHeader: React.FC<TableHeadingProps> = ({
  heading,
  searchPlaceholder,
  handleSearch,
  handleSort,
  showSelect = false,
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
            onValueChange={(value: "ascending" | "descending") =>
              handleSort(value)
            }
          >
            <SelectTrigger className="w-[180px] not-sm:w-[120px] focus:ring-0 focus:outline-none cursor-pointer">
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
        )}
      </div>
    </div>
  );
};

export default AdminTableHeader;
