import { INotification as userNotification, INotificationApiReponse as userNotificationApiRes } from "@/interfaces/user";
import { INotification as mentorNotification, INotificationApiReponse as mentorNotificationApiRes } from "@/interfaces/mentor";
import { selectAuth } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiClient from "@/api/axiosInstance";
import { setMentorNotificationFetched, setMentorNotifications, setUserNotificationFetched, setUserNotifications } from "@/redux/slices/notificationSlice";
import useErrorHandler from "./useErrorHandler";

type INotificationType = userNotification | mentorNotification;
type INotificationApiReponse = userNotificationApiRes | mentorNotificationApiRes;

const useNotification = (role: "user" | "mentor") => {
  const [notifications, setNotifications] = useState<INotificationType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteAllLoading, setIsDeleteAllLoading] = useState<boolean>(false);
  const [isReadAllNotification, setIsReadAllNotification] = useState<boolean>(false);
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();

  let isNotificationFetched = false;
  let reduxNotifications: INotificationType[] = [];

  if (role === "user") {
    isNotificationFetched = useSelector((state: RootState) => state.notification.userNotificationFetched);
    reduxNotifications = useSelector((state: RootState) => state.notification.userNotifications);
  } else if (role === "mentor") {
    isNotificationFetched = useSelector((state: RootState) => state.notification.mentorNotificationFetched);
    reduxNotifications = useSelector((state: RootState) => state.notification.mentorNotifications);
  }


  const fetchNotification = async () => {
    try {
      if (!user?.id) {
        return;
      }
      if (isNotificationFetched) {
        setNotifications(reduxNotifications)
        return;
      }
      setIsLoading(true);
      const { data } = await apiClient.get<INotificationApiReponse>(`/notifications`, { params: { role } });
      setNotifications(Array.isArray(data.notifications) ? data.notifications : []);

      if (role === "user") {
        dispatch(setUserNotificationFetched(true));
        dispatch(setUserNotifications(data.notifications as userNotification[]));
      } else if (role === "mentor") {
        dispatch(setMentorNotificationFetched(true));
        dispatch(setMentorNotifications(data.notifications as mentorNotification[]));
      }

    } catch (error) {
      handleError(error, "Failed to delete Notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAllNotification = async () => {
    try {
      setIsDeleteAllLoading(true);

      await apiClient.delete(`/notifications/delete_all`, { params: { role } });
      setNotifications([]);

      if (role === "user") {
        dispatch(setUserNotifications([]));
      } else if (role === "mentor") {
        dispatch(setMentorNotifications([]));
      }
    } catch (error) {
      handleError(error, "Failed to collect Notifications.");
    } finally {
      setIsDeleteAllLoading(false);
    }
  };

  const readAllNotification = async () => {
    try {
      setIsReadAllNotification(true);

      await apiClient.patch(`/notifications/is_read_all`,
        role
      );

      const afterReadNotifications = notifications.map((n) => {
        if (role === "user") {
          return { ...n, isRead: { user_is_read: true } } as userNotification;
        } else {
          return { ...n, isRead: { mentor_is_read: true } } as mentorNotification;
        };
      });

      setNotifications(afterReadNotifications);

      if (role === "user") {
        dispatch(setUserNotifications(afterReadNotifications as userNotification[]));
      } else {
        dispatch(setMentorNotifications(afterReadNotifications as mentorNotification[]));
      }
    } catch (error) {
      handleError(error, "Failed to mark as read all notifications.");
    } finally {
      setIsReadAllNotification(false);
    }
  };

  const handleNotificationClick = async (id: string) => {
    try {
      const notificationToUpdate = notifications.find((n) => n._id === id);
      if (!notificationToUpdate) return;

      const isAlreadyRead = role === "user"
        ? (notificationToUpdate as userNotification).isRead.user_is_read
        : (notificationToUpdate as mentorNotification).isRead.mentor_is_read;

      if (isAlreadyRead) return;

      await apiClient.patch(`/notifications/is_read`, { role, id });

      const afterReadNotifications = notifications.map((n) => {
        if (n._id === id) {
          return role === "user"
            ? { ...n, isRead: { user_is_read: true } } as userNotification
            : { ...n, isRead: { mentor_is_read: true } } as mentorNotification;
        }
        return n;
      });

      setNotifications(afterReadNotifications);

      if (role === "user") {
        dispatch(setUserNotifications(afterReadNotifications as userNotification[]));
      } else {
        dispatch(setMentorNotifications(afterReadNotifications as mentorNotification[]));
      }
    } catch (error) {
      handleError(error, "Failed to mark as read notifications.");
    }
  };

  return {
    notifications,
    isLoading,
    isDeleteAllLoading,
    isReadAllNotification,
    fetchNotification,
    deleteAllNotification,
    readAllNotification,
    handleNotificationClick,
  };
};

export default useNotification;