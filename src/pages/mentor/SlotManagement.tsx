import SlotAllocationCalendar from "@/components/mentor/SlotAllocationCalendar";
import { Button } from "@/components/ui/button";
import useSlotAllocation from "@/hooks/useSlotAllocation";
import { IBookingSchedule, ISocketResponse } from "@/types/mentor";
import { useEffect, useState } from "react";
import { selectAuth } from "@/redux/slices/authSlice";
import { ROUTES } from "@/routes/routes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "@/contexts/socket";
import useSocketHandler from "@/hooks/useSocketHandler";

const SlotManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectAuth);
  const [allocatedSlots, setAllocatedSlots] = useState<IBookingSchedule>({});
  const [isSaving, setIsSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { handleFetchSlotDetails, handleSaveSlots } = useSlotAllocation();
  const io = useSocket();
  const { handleNewBookingSlotChange } = useSocketHandler();

  useEffect(() => {
    if (io) {
      io.on("newBooking", (socketData: ISocketResponse) => {
        handleNewBookingSlotChange(socketData, setAllocatedSlots)
      });
    };

    return () => {
      if (io) {
        io.off("newBooking");
      }
    };
  }, [io]);

  const handleSave = () => {
    try {
      setIsSaving(true)
      handleSaveSlots(allocatedSlots, setAllocatedSlots);
    } finally {
      setIsSaving(false);
    };
  };

  useEffect(() => {
    if (!user?.mentorDetails?.fee) {
      return;
    }
    handleFetchSlotDetails(setAllocatedSlots);
  }, []);

  useEffect(() => {
    const hasNewSlots = Object.values(allocatedSlots).some(slots =>
      Object.values(slots).some(slot => slot === "newAllocation")
    );
    setHasUnsavedChanges(hasNewSlots);
  }, [allocatedSlots]);

  if (!user?.mentorDetails?.fee) {
    return (
      <div className="p-4 space-y-3">
        <h2 className="text-2xl not-sm:text-lg font-bold pb-10">
          Slot Management
        </h2>
        <div className="flex flex-col justify-center min-h-96">
          <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Set Your Session Price First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Before you can allocate time slots for mentoring sessions, you need
                to set your session price.
              </p>
            </div>
            <Button
              onClick={() => navigate(`${ROUTES.MENTOR.PRICING}`)}
              className="w-fit"
            >
              Go to Pricing Page
            </Button>
          </div>
        </div>
      </div>
    );
  };

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
              <div className="w-3 h-3 bg-amber-500 border border-amber-700 rounded ml-3" />
              <span className="text-sm not-sm:text-xs">On-Hold</span>
            </div>
            <div className="flex items-center gap-2 not-sm:gap-1">
              <div className="w-3 h-3 bg-gray-400 border border-gray-700 rounded ml-3" />
              <span className="text-sm not-sm:text-xs whitespace-nowrap">Not Available</span>
            </div>
          </div>
        </div>
        <div className="not-sm:hidden min-h-9 flex justify-end">
          <Button
            className="cursor-pointer px-10 min-w-48 disabled:cursor-not-allowed"
            onClick={handleSave}
            hidden={!hasUnsavedChanges}
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
      <div className={`sm:hidden not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:py-3 not-sm:border-t-1 not-sm:px-4 disabled:cursor-not-allowed ${!hasUnsavedChanges && "invisible"}`}>
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
