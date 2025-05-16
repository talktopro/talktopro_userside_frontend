import { boolean, number, string } from "zod";
import { ApiReponseAllocatedSlotsSchema, IBookingSchedule } from "./mentor";

export interface User {
    id: string;
    uname: string;
    email: string;
    phone: number;
    isMentor: boolean;
    mentor_application_status?: string;
    profileImg: string | null;
}

export interface ImageCropperProps {
    image: File;
    createCroppedBlobImage: (crop: Crop, imageRef: HTMLImageElement | null) => Promise<Blob | null>;
    onSave: (croppedImageBlob: Blob) => Promise<void>;
    onClose: () => void;
    isOpen: boolean;
}

export interface Mentor {
    _id: string;
    uname: string;
    email: string;
    phone: number;
    isMentor: boolean;
    mentor_application_status?: string;
    profileImg: string | null;
    mentorDetails: MentorDetails;
}

export interface MentorDetails {
    first_name: string;
    last_name: string;
    profession: string;
    rating: number;
    about: string;
    skills: string[];
    languages: string[];
    _id: string;
    createdAt: Date;
    fee: number;
}

export interface IMentorProfileDetailsApiResponse {
    message: string;
    data: {
        _id: string;
        profileImg: string;
        mentorDetails: MentorDetails;
        slots: ApiReponseAllocatedSlotsSchema[];
    }
}

export interface IMentorDetailsWithSlots {
    _id: string;
    profileImg: string;
    mentorDetails: MentorDetails;
    slots: IBookingSchedule;
}

//Razorpay related types

export interface IRazorpayOrderResponse {
    success: boolean,
    body: IRazorpayOrder;
    message: string
};
export interface IRazorpayOrder {
    _id: string;
    order_id: string;
    amount: number;
    currency: string;
};

export interface IRazorpayError {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
    };
};

export interface IRazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    image: string;
    theme: {
        color: string;
    };
};

export interface IRazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

declare global {
    interface Window {
        Razorpay: {
            new(options: RazorpayOptions): {
                open: () => void;
            };
        };
    };
};

// All booking api repone

export interface IBookingHistoryApiResponse {
    body: {
        bookings: IBookingHistory[];
        total_pages: number;
    };
    message: string;
    success: boolean;
};

interface IRefundType {
    amount: number;
    date: Date;
    transaction_id: string;
};

export interface IBookingHistory {
    _id: string,
    payment_status: "success" | "pending" | "failed" | "refund_success" | "refund_pending",
    slot: {
        date: string,
        time: string,
        fee: number
    },
    cancel_reason?: string; // it will only shows if the booking is cancelled 
    refund_type?: "full" | "partial" // it will only shows if the booking is cancelled 
    refund_info?: IRefundType; // it will only shows if the booking is cancelled and payment status is refund_success
    status: "success" | "pending" | "failed" | "cancelled",
    session_status: "pending" | "complete" | "incomplete";
    mentor: {
        _id: string,
        first_name: string,
        last_name: string,
        profession: string
        profileImg: string
    };
};