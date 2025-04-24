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
    onCropComplete: (croppedAreaPixels: {
        width: number;
        height: number;
        x: number;
        y: number;
    }) => void;
    onSave: () => void;
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
    price: number;
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

export interface IRazorpayOrder {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: "created" | "attempted" | "paid" | "failed";
    attempts: number;
    created_at: number;
};

export interface IRazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    image?: string;
    theme?: {
        color?: string;
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