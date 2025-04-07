export interface ILoginResponse {
   message: string,
   accessToken: string,
   refreshToken: string
}

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

export interface IMentorsListResponse {
   message: string;
   mentors: ITableListMentor[];
   totalPage: number;
}

export interface ITableListMentor {
   id: string;
   email: string;
   phone: number;
   mentorDetails: {
      first_name: string;
      last_name: string;
      profession: string;
      rating: number;
      about: string;
      skills: string[];
      languages: string[]
   };
   profileImg: string;
   status: "Active" | "Block"
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
   sort: "NewestToOldest" | "OldestToNewest";
   search?: string;
   limit: number;
};

export interface IMentorQueryDetails extends IQueryDetails {
   type: "approved" | "requests"
};

export interface INotification {
   id: number;
   message: string;
   date: string;
   isRead: boolean;
}

export interface IUserListResponse {
   message: string;
   users: ITableUser[];
   totalPage: number;
}

export interface ITableUser {
   id: string;
   uname: string;
   phone: number;
   email: string;
   profileImg: string | null;
   status: "Active" | "Block"
}