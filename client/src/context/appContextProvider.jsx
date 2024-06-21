import { AppContext } from "./appContext";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const AppContextProvider = (props) => {
  const [message, setMessage] = useState("");
  const [connectionID, setConnectionID] = useState("");
  const [roomMsgArray, setRoomMsgArray] = useState([]);
  const [messagearray, setMessageArray] = useState([]);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [roomArray, setroomArray] = useState([]);
  const [currentroom, setcurrentroom] = useState("");

  const socket = useMemo(
    () => io("https://real-time-chat-app-server-weld.vercel.app"),
    []
  );

  const handlerEnterchat = () => {
    if (userName) {
      socket.emit("clientmessage", {
        msg: `${userName} has entered the chat`,
        type: "join",
        userName: userName,
      });
    }
  };

  const handlersubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("clientmessage", {
        msg: message,
        room: room,
        userName: userName,
        type: "message",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      });
      setMessage("");
    }
  };

  const handlerjoinroom = (roomid) => {
    socket.emit("joinroom", { userName: userName, room: roomid, type: "join" });
    setRoom(roomid);
  };

  const handlercreateroom = (e) => {
    e.preventDefault();
    if (room) {
      socket.emit("joinroom", { userName, room, type: "join" });
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
      setConnectionID(socket.id);
    });

    const socket_disconnection = () => {
      socket.emit("left", { userName });
    };

    return () => {
      socket_disconnection();
    };
  }, []);

  useEffect(() => {
    socket.on(
      "servermessage",
      ({
        msg,
        userName,
        room,
        type,
        time,
        serveruserArray,
        serverroomArray,
      }) => {
        setUserArray(serveruserArray);
        setroomArray(serverroomArray);
        if (room)
          setRoomMsgArray((prev) => [
            ...prev,
            { msg, userName, room, type, time },
          ]);
        else
          setMessageArray((prev) => [
            ...prev,
            { msg, userName, room, type, time },
          ]);
      }
    );
  }, [socket]);

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        message,
        setMessage,
        connectionID,
        setConnectionID,
        roomMsgArray,
        setRoomMsgArray,
        messagearray,
        setMessageArray,
        room,
        setRoom,
        handlersubmit,
        handlercreateroom,
        handlerEnterchat,
        userArray,
        setUserArray,
        roomArray,
        setroomArray,
        handlerjoinroom,
        currentroom,
        setcurrentroom,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
