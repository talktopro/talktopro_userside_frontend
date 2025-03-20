export interface User {
    _id: string;
    uname: string;
    email: string;
    phone: number;
    isMentor: boolean;
    mentor_application_status: string;
    profileImage: string;
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