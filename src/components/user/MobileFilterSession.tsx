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
import { RefObject } from "react";

interface MobileFilterSessionProps {
  applyFilter: () => void;
  clearFilter: () => void;
  disableClearFilter: () => boolean;
  disableApplyFilter: () => boolean;
  filterData: {
    sort: "NewestToOldest" | "OldestToNewest";
    selectedProfessions: string[];
    selectedRating: number;
  };
  setFilterData: React.Dispatch<
    React.SetStateAction<{
      sort: "NewestToOldest" | "OldestToNewest";
      selectedProfessions: string[];
      selectedRating: number;
    }>
  >;
  professions: string[];
  fetchDataFlag: RefObject<boolean>;
}

const MobileFilterSession = ({
  applyFilter,
  clearFilter,
  filterData,
  setFilterData,
  professions,
  fetchDataFlag,
  disableClearFilter,
  disableApplyFilter,
}: MobileFilterSessionProps) => {
  const handleSortChange = (value: "NewestToOldest" | "OldestToNewest") => {
    setFilterData((prev) => ({ ...prev, sort: value }));
    fetchDataFlag.current = true;
  };

  const handleProfessionChange = (profession: string) => {
    setFilterData((prev) => {
      const newProfessions = prev.selectedProfessions.includes(profession)
        ? prev.selectedProfessions.filter((p) => p !== profession)
        : [...prev.selectedProfessions, profession];
      return { ...prev, selectedProfessions: newProfessions };
    });
  };

  const handleRatingChange = (rating: number) => {
    setFilterData((prev) => ({
      ...prev,
      selectedRating: prev.selectedRating === rating ? 0 : rating,
    }));
  };

  return (
    <div className="mb-5 flex justify-center items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex justify-between items-center w-32 border h-full px-3 py-2 rounded-sm shadow-sm cursor-pointer">
            <span>Filter</span>
            <ListFilter strokeWidth={1.5} size={18} className="text-gray-500" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-1 w-[300px] max-h-[70vh] overflow-y-auto mr-4"
        >
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full p-4 space-y-6">
              <div>
                <h3 className="text-md font-semibold mb-2">Professions</h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                  {professions.map((profession) => (
                    <div
                      key={profession}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`mob-prof-${profession}`}
                        checked={filterData.selectedProfessions.includes(
                          profession
                        )}
                        onCheckedChange={() =>
                          handleProfessionChange(profession)
                        }
                      />
                      <Label
                        htmlFor={`mob-prof-${profession}`}
                        className="text-sm font-normal"
                      >
                        {profession}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={`mob-rating-${rating}`}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`mob-rating-${rating}`}
                        checked={filterData.selectedRating === rating}
                        onCheckedChange={() => handleRatingChange(rating)}
                      />
                      <Label
                        htmlFor={`mob-rating-${rating}`}
                        className="text-sm font-normal"
                      >
                        {rating === 5 ? "5 Stars" : `${rating} Stars & Above`}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 left-0 right-0 border-t bg-muted">
              <div className="flex justify-center gap-6 py-3">
                <button
                  onClick={clearFilter}
                  className="flex items-center gap-1 text-sm font-semibold text-red-600"
                  disabled={disableClearFilter()}
                >
                  <X strokeWidth={1.5} size={17} /> Clear Filters
                </button>
                <button
                  onClick={applyFilter}
                  className="flex items-center gap-1 text-sm font-semibold hover:text-purple-700"
                  disabled={disableApplyFilter()}
                >
                  <CheckCheck strokeWidth={1.5} size={17} /> Apply Filters
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Select value={filterData.sort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[140px] h-full px-3 py-2 focus:ring-0 focus:outline-none cursor-pointer">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="NewestToOldest">Newest to Oldest</SelectItem>
            <SelectItem value="OldestToNewest">Oldest to Newest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileFilterSession;
