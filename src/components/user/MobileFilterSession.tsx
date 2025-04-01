import { CheckCheck, ListFilter, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const MobileFilterSession = () => {
  return (
    <div className="mb-5 flex justify-center items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex justify-between items-center w-32 border-1 h-full px-3 rounded-sm shadow-sm cursor-pointer">
            Filter <ListFilter strokeWidth={1.5} size={18} color="gray" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-1 w-100 not-sm:w-85 h-fit not-sm:mr-4"
        >
          <div className="flex flex-col w-full h-fit">
            <div className="flex justify-around w-full">
              <div className="w-full p-4 pb-5">
                <h3 className="text-md font-semibold mb-2">Professions</h3>
                <div className="space-y-2 max-h-[25vh] overflow-y-auto custom-scrollbar">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <Checkbox className="cursor-pointer" />
                      <Label className="text-sm font-normal line-clamp-1">
                        Option {item}
                      </Label>
                    </label>
                  ))}
                </div>
              </div>
              <div className="w-full p-4 pb-5">
                <h3 className="text-md font-semibold mb-2">Rating</h3>
                <div className="space-y-2">
                  {["5 Stars", "4 Stars & Above", "3 Stars & Below"].map(
                    (rating, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox className="cursor-pointer" />
                        <span className="text-sm font-normal line-clamp-1">
                          {rating}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 left-0 right-0 border-t bg-background">
              <div className="flex justify-center gap-6 py-3">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600">
                  <X strokeWidth={1.5} size={17} /> Clear Filters
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-700">
                  <CheckCheck strokeWidth={1.5} size={17} /> Apply Filters
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Select>
        <SelectTrigger className="w-[140px] not-sm:w-[120px] focus:ring-0 focus:outline-none cursor-pointer">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              value="NewestToOldest"
              className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
            >
              Newest to Oldest
            </SelectItem>
            <SelectItem
              value="OldestToNewest"
              className="flex items-center cursor-pointer px-2 py-1 focus:ring-0 focus:outline-none hover:bg-muted"
            >
              Oldest to Newest
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileFilterSession;
