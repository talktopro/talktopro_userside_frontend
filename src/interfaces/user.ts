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

export interface IBookingQueryDetails {
   page: number;
   sort: "NewestToOldest" | "OldestToNewest";
   search?: string;
   limit: number;
};

export interface INotificationApiReponse {
   notifications: INotification[];
};

export interface INotification {
   _id: string;
   messages: string;
   isRead: {
      user_is_read: boolean
   };
   createdAt: string;
};


export interface WebinarData {
  id: string
  title: string
  presenter: {
    name: string
    avatar: string
    title: string
  }
  date: string
  duration: string
  image: string
  description: string
  attendancePercentage?: number
  totalRegistrations: number
  actualAttendees?: number
  rating?: number
  totalRatings?: number
  status: "completed" | "live" | "upcoming"
  keyTakeaways?: string[]
  recordingViews?: number
  availableSlots?: number
  totalSlots?: number
}