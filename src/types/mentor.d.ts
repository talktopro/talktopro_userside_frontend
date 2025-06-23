//! `isBooked` indicates that the slot is already confirmed in the backend and stored in the database.
//! `"newAllocation"` indicates that the slot is newly selected on the frontend and not yet saved in the backend or database.

import { INotification } from "@/interfaces/mentor";
import { User } from "./user";

type SlotStatus = { isBooked: "booked" | "free" | "on_hold" } | "newAllocation";

export interface IBookingSchedule {
   [date: string]: {
      [timeSlot: string]: SlotStatus;
   };
}

interface ApiReponseSlotSchema {
   booked: "booked" | "free" | "on_hold";
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
   setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>;
   addNewTimeSlotToState: (date: string, time: string, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) => void;
   handleDeleteSlot: (date: string, time: string, allocatedSlots: IBookingSchedule) => Promise<boolean>;
   deleteFrontendTimeSlot: (date: string, time: string, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) => void
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

// Booking page 
export interface IMentorBookingHistoryApiResponse {
   body: {
      total_pages: number;
      bookings: IMentorBookingHistory[]
   };
   message: string;
   success: boolean;
};

interface IRefundType {
   amount: number;
   date: Date;
   transaction_id: string;
};

export interface IMentorBookingHistory {
   _id: string,
   payment_status: "success" | "pending" | "failed" | "refund_success" | "refund_pending",
   slot: {
      date: string,
      time: string,
      fee: number
   },
   status: "success" | "pending" | "failed" | "cancelled",
   session_status: "pending" | "complete" | "incomplete";
   user: User;
   refund_type?: "full" | "partial" // it will only shows if the booking is cancelled
   mentor_refund_info?: IRefundType; // it will only shows if the booking is cancelled and payment status is refund_success

   mentor_payment_transaction_id?: string // only show if the booking session is completed
   mentor_payment_transaction_at: string // only show if the booking session is completed

   incompletion_caused_by?: "user" | "mentor"; // it will only show if the booking is in-complete
   order_id: string;
   payment_id?: string // it means user booked mentor transaction id it and it will only show once the payment status success 
};

export interface ISocketResponse {
   role: "mentor";
   data: {
      recieverId: string,
      messageData: INotification,
      bookingDetails?: IMentorBookingHistory
   };
};