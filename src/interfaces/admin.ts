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

export interface IQueryDetails {
   page: number;
   sort: "ascending" | "descending";
   search?: string;
};

export interface IMentorQueryDetails extends IQueryDetails {
   tab: "approved" | "requests"
};

export interface INotification {
   id: number;
   message: string;
   date: string;
   isRead: boolean;
}