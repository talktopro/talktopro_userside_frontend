import SlotAllocationCalendar from "@/components/mentor/SlotAllocationCalendar";
import { Button } from "@/components/ui/button";
import useSlotAllocation from "@/hooks/useSlotAllocation";
import { IBookingSchedule } from "@/types/mentor";
import { useEffect, useState } from "react";

const SlotManagement: React.FC = () => {

  const [allocatedSlots, setAllocatedSlots] = useState<IBookingSchedule>({});
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { handleFetchSlotDetails, handleSaveSlots } = useSlotAllocation();

  const handleSave = () => {
    try {
      setIsSaving(true)
      handleSaveSlots(allocatedSlots, setAllocatedSlots);
    } finally {
      setIsSaving(false);
    };
  };

  useEffect(() => {
    handleFetchSlotDetails(setAllocatedSlots);
  }, []);

  useEffect(() => {
    const hasNewSlots = Object.values(allocatedSlots).some(slots =>
      Object.values(slots).some(slot => slot === "newAllocation")
    );
    setHasUnsavedChanges(hasNewSlots);
  }, [allocatedSlots]);

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
          <p className="text-center not-sm:text-xs m-0 mx-auto my-3 max-w-2xl">
            Choose your appointment date and time from the calendar. You can only allocate slots for the next 30 days. Allocated slots are automatically removed after the day is over.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-2 not-sm:gap-1">
            <div className="flex items-center gap-2 not-sm:gap-1">
              <div className="w-3 h-3 bg-background border border-gray-300 rounded" />
              <span className="text-sm not-sm:text-xs">Available</span>
            </div>
            <div className="flex items-center gap-2 not-sm:gap-1">
              <div className="w-3 h-3 bg-primary rounded ml-3" />
              <span className="text-sm not-sm:text-xs">Selected</span>
            </div>
            <div className="flex items-center gap-2 not-sm:gap-1">
              <div className="w-3 h-3 bg-teal-400 border border-teal-700 rounded ml-3" />
              <span className="text-sm not-sm:text-xs">Booked</span>
            </div>
            <div className="flex items-center gap-2 not-sm:gap-1">
              <div className="w-3 h-3 bg-gray-400 border border-gray-700 rounded ml-3" />
              <span className="text-sm not-sm:text-xs whitespace-nowrap">Not Available</span>
            </div>
          </div>
        </div>
        <div className="not-sm:hidden flex justify-end">
          <Button
            className="cursor-pointer px-10 min-w-48 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
        <SlotAllocationCalendar
          allocatedSlots={allocatedSlots}
          setAllocatedSlots={setAllocatedSlots}
        />
      </div>
      <div className="sm:hidden not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4 disabled:cursor-not-allowed">
        <Button
          className="cursor-pointer w-full"
          onClick={handleSave}
          disabled={!hasUnsavedChanges || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </>
  );
};

export default SlotManagement;
