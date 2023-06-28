import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../UserProvider/UserProvider";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    if (user?.email) {
      socket.emit("join", user?.email);
    }
  }, [socket, user]);
  useEffect(() => {
    socket?.on("notification-received", (announcement) => {
      console.log("you received announcement", announcement);
      setAnnouncements((prev) => [announcement, ...prev]);
    });
  }, [socket]);
  useEffect(() => {
    if (user?.email) {
      fetch(
        `http://localhost:5000/api/v1/notifications/announcement?email=${user?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          //   console.log("data: ", data);
          setAnnouncements(data);
        });
    }
  }, [user?.email]);
  const info = { announcements };
  return (
    <SocketContext.Provider value={info}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
