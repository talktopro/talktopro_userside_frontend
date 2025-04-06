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
    profileImg: string | null;
    mentor_application_status: string;
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
}