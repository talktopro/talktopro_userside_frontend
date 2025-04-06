import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { CheckCheck, X } from "lucide-react";

interface FilterSessionProps {
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
}

const FilterSession = ({
  applyFilter,
  clearFilter,
  filterData,
  setFilterData,
  professions,
  disableClearFilter,
  disableApplyFilter,
}: FilterSessionProps) => {
  const handleSortChange = (value: "NewestToOldest" | "OldestToNewest") => {
    setFilterData((prev) => ({ ...prev, sort: value }));
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
    <div className="h-full w-[250px] min-w-[250px] bg-background border rounded-lg p-4 space-y-8 relative hidden md:block">
      <div>
        <h3 className="text-md font-semibold mb-2">Sort by</h3>
        <RadioGroup value={filterData.sort} onValueChange={handleSortChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NewestToOldest" id="r1" />
            <Label htmlFor="r1" className="text-sm font-normal">
              Newest to Oldest
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="OldestToNewest" id="r2" />
            <Label htmlFor="r2" className="text-sm font-normal">
              Oldest to Newest
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Profession</h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
          {professions.map((profession) => (
            <div key={profession} className="flex items-center space-x-2">
              <Checkbox
                id={`prof-${profession}`}
                checked={filterData.selectedProfessions.includes(profession)}
                onCheckedChange={() => handleProfessionChange(profession)}
              />
              <Label
                htmlFor={`prof-${profession}`}
                className="text-sm font-normal line-clamp-1"
              >
                {profession}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-15">
        <h3 className="text-md font-semibold mb-2">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={`rating-${rating}`}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`rating-${rating}`}
                checked={filterData.selectedRating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal"
              >
                {rating === 5 ? "5 Stars" : `${rating} Stars & Above`}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t bg-muted rounded-b-lg">
        <div className="flex justify-center gap-6 py-4">
          <button
            onClick={clearFilter}
            className="flex items-center gap-1 text-sm font-semibold text-red-500"
            disabled={disableClearFilter()}
          >
            <X strokeWidth={1.5} size={17} /> Clear Filter
          </button>
          <button
            onClick={applyFilter}
            className="flex items-center gap-1 text-sm font-semibold hover:text-purple-700"
            disabled={disableApplyFilter()}
          >
            <CheckCheck strokeWidth={1.5} size={17} /> Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSession;
