import apiClient from "@/api/axiosInstance";
import { IBookingSchedule, INewSlotAllocationReqBody, ISlotAllocationApiReponse } from "@/types/mentor";
import convertTo24HourFormat from "@/utils/convertTo24HourFormat";
import generateTimeSlots from "@/utils/generateTimeSlots";
import SlotResponseConverter from "@/utils/slotResponseConverter";
import axios from "axios";
import { addMonths, addDays, startOfToday, format, isToday, parse, addMinutes, isAfter } from "date-fns";
import { useMemo } from "react";
import { toast } from "sonner";
import useErrorHandler from "./useErrorHandler";

const useSlotAllocation = () => {

  const { handleError } = useErrorHandler();
  const predefinedTimeSlots: string[] = useMemo(generateTimeSlots, []);
  const displayMonths = [0, 1].map((i) => addMonths(new Date(), i));
  const startDate = startOfToday();
  const endDate = addDays(startDate, 30);

  //! ================================================================= Function for fetch allocated slots =============================================================

  async function handleFetchSlotDetails(setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) {
    try {
      const { data } = await apiClient.get<ISlotAllocationApiReponse>('/mentor/slots');
      setAllocatedSlots(SlotResponseConverter(data.body));
    } catch (error) {
      handleError(error, "Failed to fetch slot details");
    }
  };

  //!======================================================== function for update newely allocation slot to DB ===============================================================

  async function handleSaveSlots(allocatedSlots: IBookingSchedule, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) {
    try {
      const unSavedSlots: INewSlotAllocationReqBody = createRequestObject(allocatedSlots);
      const { data } = await apiClient.post(`/mentor/slots`, unSavedSlots);
      setAllocatedSlots(SlotResponseConverter(data.body));
      toast.success("Your new slots have been successfully allocated.")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.message === "Time slots must be allocated at least 1 hour in advance.") {
        handleError(error, "You can only allocate new slots starting from 1 hour after the current time");
      } else {
        toast.error("Failed to save your changes.");
      }
    }
  };

  //!======================================================= remove slot funtion API for update DB ===================================================================================

  async function handleDeleteSlot(date: string, time: string, allocatedSlots: IBookingSchedule): Promise<boolean> {
    const time24 = convertTo24HourFormat(time);

    try {
      if (allocatedSlots[date] && allocatedSlots[date][time]) {

        // isBooking indicate this time slot already updated in database, if the slot contains isBooking false then only we need update backend 
        if (typeof allocatedSlots[date][time] === "object" && allocatedSlots[date][time].isBooked === "free") {
          await apiClient.delete(`/mentor/slots`, {
            data: { date: date, slots: [time24] }
          });
        }
      };
      return true;
    } catch (error) {
      handleError(error, "Oops! Failed to remove slots.");
      return false;
    }
  };

  //!======================================================= Delete time slot from frontend state ===================================================================================

  function deleteFrontendTimeSlot(date: string, time: string, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>): void {
    setAllocatedSlots((prev) => {
      const newState = { ...prev };
      if (!newState[date]) {
        return newState;
      };
      delete newState[date][time];
      if (Object.keys(newState[date]).length === 0) { // if the date object not contains any timeslots (object is empty), remove the date from the object
        delete newState[date];
      }
      return newState;
    });
  };

  //!========================================== only update frontend state to highlight the user selected slots for allocation/allocated =====================================

  function addNewTimeSlotToState(date: string, time: string, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) {
    setAllocatedSlots((prev) => {
      const newState = { ...prev };
      if (newState[date]) { // if the date is present then check time is present
        if (!newState[date][time]) { // if the time is not present then only we need to update the state
          newState[date] = { ...newState[date], [time]: "newAllocation" };
        }
      } else {
        newState[date] = { [time]: "newAllocation" }; // if the date is not present current data, add date and time
      }
      return newState;
    });
  };

  //!======================================================= collecting available date from current date to next 30 days =======================================================

  function availableDates(): Record<string, boolean> {
    const result: Record<string, boolean> = {};
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const dateStr = format(currentDate, "dd-MM-yyyy");
      result[dateStr] = currentDate >= startDate && currentDate <= endDate;
      currentDate = addDays(currentDate, 1);
    }
    return result;
  };

  function isSlotAvailable(slotDate: Date, slotString: string): boolean {
    if (!isToday(slotDate)) return true;
    const now = new Date();

    const startTimeStr = slotString.split(' - ')[0];                //* Parse the start time from the slot string (e.g., "10:00 AM - 11:00 AM")
    const slotStartTime = parse(startTimeStr, 'h:mm a', slotDate);
    const bufferTime = addMinutes(now, 60);                         //* Add a 1hour buffer to current time to prevent edge cases

    return isAfter(slotStartTime, bufferTime);
  };

  //!================================================================================= return functions =======================================================================

  return {
    handleFetchSlotDetails,
    handleSaveSlots,
    handleDeleteSlot,
    deleteFrontendTimeSlot,
    addNewTimeSlotToState,
    availableDates,
    isSlotAvailable,
    displayMonths,
    predefinedTimeSlots,
  };
};

export default useSlotAllocation;




//! Convert frontend schema to req object modal for send to backend
function createRequestObject(allocatedSlots: IBookingSchedule): INewSlotAllocationReqBody {
  const requestObject: INewSlotAllocationReqBody = [];

  for (const date in allocatedSlots) {
    const timeSlots = allocatedSlots[date];
    const newSlotsForDate: string[] = [];

    for (const time in timeSlots) {
      if (timeSlots[time] === "newAllocation") {
        const formattedTime = convertTo24HourFormat(time);
        newSlotsForDate.push(formattedTime);
      }
    }

    if (newSlotsForDate.length > 0) {
      requestObject.push({ date, slots: newSlotsForDate });
    }
  }
  return requestObject
};
