export interface IMentorRegisterDetails {
   firstName: string;
   secondName: string;
   email: string;
   phone: string;
   profession: string;
   about: string;
   skills: string[];
   languages: string[];
   termsAndConditions: boolean;
   privacyAndPolicy: boolean
}


export interface IBooking {
   bookingNo: number;
   mentorName: string;
   dateTime: string;
   status: "Time Scheduled" | "Complete" | "Cancelled";
   amount: string;
}

export interface SidebarFooterMentorDetails {
   name: string;
   email: string;
}

export interface IBookingQueryDetails {
   page: number;
   sort: "ascending" | "descending";
};

export interface INotification {
   id: number;
   message: string;
   date: string;
   isRead: boolean;
}