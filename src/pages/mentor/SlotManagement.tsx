import SlotAllocationCalendar from "@/components/mentor/SlotAllocationCalendar";
import { Button } from "@/components/ui/button";

const SlotManagement: React.FC = () => {
  return (
    <>
      <div className="p-4 space-y-3">
        <h2 className="text-2xl not-sm:text-lg font-bold pb-10">
          Slot Management
        </h2>
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="text-md font-semibold text-center m-0">
            Select Date and Time
          </h2>
          <p className="text-center m-0">
            Choose your appointment date and time from the calendar.
          </p>
          <div className="flex justify-center items-center gap-2">
            <div className="w-3 h-3 bg-background border border-gray-300 rounded" />
            <span className="text-sm">Available</span>
            <div className="w-3 h-3 bg-primary rounded ml-3" />
            <span className="text-sm">Selected</span>
            <div className="w-3 h-3 bg-gray-400 border border-gray-700 rounded ml-3" />
            <span className="text-sm">Not Available</span>
          </div>
        </div>
        <div className="not-sm:hidden flex justify-end">
          <Button className="cursor-pointer px-10">Update Slot</Button>
        </div>
        <SlotAllocationCalendar />
      </div>
      <div className="sm:hidden not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4">
        <Button className="cursor-pointer w-full">Update Slot</Button>
      </div>
    </>
  );
};

export default SlotManagement;
