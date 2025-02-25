export interface ITableHeadings {
   label: string;
   className: string;
}

export interface IUser {
   SL: number;
   name: string;
   profileImage: string;
   email: string;
   phoneNumber: string;
   createdAt: string;
   status: "Active" | "Blocked";
}

export interface IMentor {
   SL: number;
   name: string;
   profileImage: string;
   email: string;
   phoneNumber: string;
   createdAt: string;
   status: "Active" | "Blocked";
}

export interface IBooking {
   bookingNo: number;
   mentorName: string;
   dateTime: string;
   status: "Time Scheduled" | "Complete" | "Cancelled";
   amount: string;
}