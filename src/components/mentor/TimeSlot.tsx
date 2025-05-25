import useSlotAllocation from "@/hooks/useSlotAllocation";
import { SlotStatus, TimeSlotsProps } from "@/types/mentor";
import { format } from "date-fns";
import { Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TimeSlots: React.FC<TimeSlotsProps> = ({
  title,
  allocatedSlots,
  setAllocatedSlots,
  addNewTimeSlotToState,
  handleDeleteSlot,
  deleteFrontendTimeSlot,
}) => {
  const { predefinedTimeSlots, isSlotAvailable } = useSlotAllocation();

  const dateStr = format(title, "dd-MM-yyyy");
  const [selectedTimes, setSelectedTimes] = useState<Record<string, SlotStatus>>(allocatedSlots[dateStr] || {});
  const newSlotsRef = useRef<string[]>([]);
  const deletedSlotsRef = useRef<string[]>([]);

  const handleAddNewSlot = (slot: string) => {
    setSelectedTimes((prev) => ({ ...prev, [slot]: "newAllocation" }));
    newSlotsRef.current = [...newSlotsRef.current, slot];
  }

  const handleRemoveSlot = async (slot: string) => {
    let isSuccess = true;

    if (!newSlotsRef.current.includes(slot)) { //* only need to call api if the slot is already update in DB
      isSuccess = await handleDeleteSlot(dateStr, slot, allocatedSlots); // api for remove from db
    };

    if (isSuccess) {
      setSelectedTimes((prev) => { // remove from component local state
        const newSlots = { ...prev };
        delete newSlots[slot];
        return newSlots;
      });
      newSlotsRef.current = newSlotsRef.current.filter((s: string) => s !== slot); // tracking new slots for add to parent component once the popover is closed
      deletedSlotsRef.current.push(slot); // tracking deleted slots to remove from parent state once the popover is closed
    };
  };

  useEffect(() => {
    return () => {
      if (deletedSlotsRef.current.length > 0) {
        for (const time of deletedSlotsRef.current) {
          deleteFrontendTimeSlot(dateStr, time, setAllocatedSlots);
        }
      }
      if (newSlotsRef.current.length > 0) {
        for (const time of newSlotsRef.current) {
          addNewTimeSlotToState(dateStr, time, setAllocatedSlots);
        }
      }
    };
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <h3 className="text-sm font-semibold text-center m-0">{title.toDateString()}</h3>
      </div>
      <hr className="mb-3 mt-2" />
      <div className="grid grid-cols-2 mt-auto gap-3 h-fit">
        {predefinedTimeSlots.map((slot: string, index: number) => (
          <div
            key={index}
            className={`py-2 px-3 text-center text-xs rounded-md border transition-colors relative
              ${(typeof selectedTimes[slot] === "object" && selectedTimes[slot].isBooked === "free") || selectedTimes[slot] === "newAllocation"
                ? "border-purple-500 bg-purple-500/10 text-purple-500 font-semibold cursor-default"
                : typeof selectedTimes[slot] === "object" && selectedTimes[slot].isBooked === "booked"
                  ? "border-teal-500 bg-teal-500/10 text-teal-500 font-semibold cursor-default"
                  : isSlotAvailable(title, slot)
                    ? "hover:border-gray-300 hover:opacity-75 cursor-pointer"
                    : "text-muted-foreground opacity-50 hover:bg-transparent hover:text-muted-foreground cursor-not-allowed"
              }`}
            onClick={() => {
              if (!selectedTimes[slot] && isSlotAvailable(title, slot)) {
                handleAddNewSlot(slot);
              }
            }}
          >
            {slot}
            {((typeof selectedTimes[slot] === "object" && selectedTimes[slot].isBooked === "free") || selectedTimes[slot] === "newAllocation") && (
              <button
                className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 transition-colors duration-300 flex justify-center items-center rounded-full p-0.5 text-background"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSlot(slot)
                }}
              >
                <Minus size={10} strokeWidth={4} className="cursor-pointer" />
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TimeSlots;