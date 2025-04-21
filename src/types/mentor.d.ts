//! `isBooked` indicates that the slot is already confirmed in the backend and stored in the database.
//! `"newAllocation"` indicates that the slot is newly selected on the frontend and not yet saved in the backend or database.

type SlotStatus = { isBooked: boolean } | "newAllocation";

export interface IBookingSchedule {
   [date: string]: {
      [timeSlot: string]: SlotStatus;
   };
}

interface ApiReponseSlotSchema {
   booked: boolean;
   userId: string | null;
   bookingId: string | null;
   time: string;
}

export interface ApiReponseAllocatedSlotsSchema {
   _id: string;
   date: string;
   mentorId: string;
   __v: number;
   slots: ApiReponseSlotSchema[];
}

export interface ISlotAllocationApiReponse {
   body: ApiReponseAllocatedSlotsSchema[];
   message: string;
   success: boolean;
}

export interface TimeSlotsProps {
   title: Date;
   allocatedSlots: IBookingSchedule;
   addNewTimeSlotToState: (date: string, time: string, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) => void;
   handleDeleteSlot: (date: string, time: string, allocatedSlots: IBookingSchedule, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) => void;
   setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>;
}

export interface SlotAllocationCalendarProps {
   allocatedSlots: IBookingSchedule;
   setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>;
}

export interface INewSlotAllocationReqObj {
   date: string;
   slots: string[];
}

export type INewSlotAllocationReqBody = INewSlotAllocationReqObj[]; 