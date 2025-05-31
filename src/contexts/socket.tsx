import { selectAuth } from "@/redux/slices/authSlice";
import { setMentorNotifications, setUserNotifications } from "@/redux/slices/notificationSlice";
import { RootState } from "@/redux/store";
import { ISocketResponse as IUserSocketResponse } from "@/types/user";
import { ISocketResponse as IMentorSocketResponse } from "@/types/mentor";
import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io as socket, Socket } from "socket.io-client";

type SocketProviderProps = {
  children: ReactNode;
};

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [io, setIo] = useState<Socket | null>(null);
  const { user } = useSelector(selectAuth);
  const { userNotifications, mentorNotifications } = useSelector((state: RootState) => state.notification)
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = socket(import.meta.env.VITE_SOCKET_BACKEND_URL as string);
    setIo(newSocket);

    newSocket.on("newBooking", (socketData: IUserSocketResponse | IMentorSocketResponse) => {
      if (socketData.role === "user" && socketData.data.recieverId === user?.id) {
        dispatch(setUserNotifications([...userNotifications, socketData.data.messageData]));
      };
      if (socketData.role === "mentor" && socketData.data.recieverId === user?.id) {
        dispatch(setMentorNotifications([...mentorNotifications, socketData.data.messageData]));
      };
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={io}>
      {children}
    </SocketContext.Provider>
  );
};