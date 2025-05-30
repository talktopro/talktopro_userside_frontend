import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { io as socket, Socket } from "socket.io-client";

type SocketProviderProps = {
  children: ReactNode;
};

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [io, setIo] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = socket(import.meta.env.VITE_SOCKET_BACKEND_URL as string);
    setIo(newSocket);

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