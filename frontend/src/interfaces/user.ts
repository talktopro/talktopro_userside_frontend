export type ITheme = 'light' | 'dark';
export interface ProfessionalData {
   name: string;
   department: string;
   rating: number;
   Specializations: string[];
   about: string;
   Languages: string[];
   Skills: string[];
}

export interface IBooking {
   bookingNo: number;
   mentorName: string;
   dateTime: string;
   status: "Time Scheduled" | "Complete" | "Cancelled";
   amount: string;
}