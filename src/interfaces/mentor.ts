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
   limit: number;
   sort: "NewestToOldest" | "OldestToNewest";
};

export interface INotificationApiReponse {
   notifications: INotification[];
};

export interface INotification {
   _id: string;
   messages: string;
   isRead: {
      mentor_is_read: boolean
   };
   createdAt: string;
};