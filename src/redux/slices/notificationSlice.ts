import { INotification as userNotificaion } from "@/interfaces/user";
import { INotification as mentorNotificaion } from "@/interfaces/mentor";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationState {
  userNotificationFetched: boolean;
  mentorNotificationFetched: boolean;
  userNotifications: userNotificaion[];
  mentorNotifications: mentorNotificaion[];
};

const initialState: INotificationState = {
  userNotificationFetched: false,
  mentorNotificationFetched: false,
  mentorNotifications: [],
  userNotifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUserNotifications: (state, action: PayloadAction<userNotificaion[]>) => {
      state.userNotifications = action.payload;
    },
    setMentorNotifications: (state, action: PayloadAction<mentorNotificaion[]>) => {
      state.mentorNotifications = action.payload;
    },
    setUserNotificationFetched: (state, action: PayloadAction<boolean>) => {
      state.userNotificationFetched = action.payload;
    },
    setMentorNotificationFetched: (state, action: PayloadAction<boolean>) => {
      state.mentorNotificationFetched = action.payload;
    }
  },
});

export const {
  setUserNotifications,
  setMentorNotifications,
  setUserNotificationFetched,
  setMentorNotificationFetched,
} = notificationSlice.actions;

export default notificationSlice.reducer;