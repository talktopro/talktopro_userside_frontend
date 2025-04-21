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