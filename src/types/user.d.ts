export interface User {
    _id: string;
    uname: string;
    email: string;
    phone: number;
    isMentor: boolean;
    mentor_application_status: string;
}