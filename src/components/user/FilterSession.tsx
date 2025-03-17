import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { CheckCheck, X } from "lucide-react";

const FilterSession = () => {
  return (
    <div className="h-full w-[250px] min-w-[250px] bg-background border-1 rounded-lg p-4 space-y-10 relative not-md:hidden">
      <>
        <h3 className="text-md font-semibold mb-2">Sort by</h3>
        <div className="space-y-2">
          <RadioGroup defaultValue="NewestToOldest">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NewestToOldest" id="r1" />
              <Label className="text-sm font-normal">Newest to Oldest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="OldestToNewest" id="r2" />
              <Label className="text-sm font-normal">Oldest to Newest</Label>
            </div>
          </RadioGroup>
        </div>
      </>
      <>
        <h3 className="text-md font-semibold mb-2">Profession</h3>
        <div className="space-y-2 max-h-[20vh] overflow-y-auto custom-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <Checkbox className="cursor-pointer" />
              <Label className="text-sm font-normal">Option {item}</Label>
            </label>
          ))}
        </div>
      </>

      <>
        <h3 className="text-md font-semibold mb-2">Rating</h3>
        <div className="space-y-2">
          {["5 Stars", "4 Stars & Above", "3 Stars & Below"].map(
            (rating, index) => (
              <label key={index} className="flex items-center space-x-2">
                <Checkbox className="cursor-pointer" />
                <span className="text-sm font-normal">{rating}</span>
              </label>
            )
          )}
        </div>
      </>

      <div className="absolute bottom-0 left-0 right-0 border-t">
        <div className="flex justify-center gap-6 py-4">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600">
            <X strokeWidth={1.5} size={17} /> Clear Filters
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-700">
            <CheckCheck strokeWidth={1.5} size={17} /> Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSession;
