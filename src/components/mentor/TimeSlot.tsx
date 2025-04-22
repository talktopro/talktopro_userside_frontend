import useSlotAllocation from "@/hooks/useSlotAllocation";
import { SlotStatus, TimeSlotsProps } from "@/types/mentor";
import { format } from "date-fns";
import { Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TimeSlots: React.FC<TimeSlotsProps> = ({
  title,
  addNewTimeSlotToState,
  selectedSlots,
  triggerHandleDeleteSlot,
  setAllocatedSlots,
}) => {
  const { predefinedTimeSlots } = useSlotAllocation();

  const dateStr = format(title, "dd-MM-yyyy");
  const [selectedTimes, setSelectedTimes] = useState<Record<string, SlotStatus>>(selectedSlots || {});
  const newSlotsRef = useRef<string[]>([]);

  const handleAddNewSlot = (slot: string) => {
    setSelectedTimes((prev) => ({ ...prev, [slot]: "newAllocation" }));
    newSlotsRef.current = [...newSlotsRef.current, slot];
  }

  const handleRemoveSlot = (slot: string) => {
    triggerHandleDeleteSlot(dateStr, slot);
    setSelectedTimes((prev) => {
      const newSlots = { ...prev };
      delete newSlots[slot];
      return newSlots;
    });
    newSlotsRef.current = newSlotsRef.current.filter((s: string) => s !== slot);
  }

  useEffect(() => {
    return () => {
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
            className={`py-2 px-3 text-center text-xs rounded-md border cursor-pointer transition-colors relative
              ${(typeof selectedTimes[slot] === "object" && selectedTimes[slot].isBooked === false) || selectedTimes[slot] === "newAllocation"
                ? "border-purple-500 bg-purple-500/10 text-purple-500 font-semibold"
                : typeof selectedTimes[slot] === "object" && selectedTimes[slot].isBooked
                  ? "border-teal-500 bg-teal-500/10 text-teal-500 font-semibold"
                  : "hover:border-gray-300"
              }`}
            onClick={() => {
              if (!selectedTimes[slot]) {
                handleAddNewSlot(slot);
              }
            }}
          >
            {slot}
            {((typeof selectedTimes[slot] === "object" && selectedTimes[slot].isBooked === false) || selectedTimes[slot] === "newAllocation") && (
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