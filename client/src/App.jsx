import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [connectionID, setConnectionID] = useState("");
  const [roomMsgArray, setRoomMsgArray] = useState([]);
  const [messagearray, setMessageArray] = useState([]);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const handlersubmit = (e) => {
    e.preventDefault();
    socket.emit("clientmessage", {
      msg: message,
      room: room,
      userName: userName,
    });
    setMessage("");
  };

  const handlerjoinroom = (e) => {
    e.preventDefault();
    socket.emit("joinroom", room);
    setRoom("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
      setConnectionID(socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("servermessage", ({ msg, userName, room }) => {
      console.log(msg, userName, room);
      if (room) setRoomMsgArray((prev) => [...prev, { msg, userName, room }]);
      else setMessageArray((prev) => [...prev, { msg, userName, room }]);
    });
  }, [socket]);

  return (
    <>
      <h1>WORLD CHAT</h1>
      <h1>My connection ID : {connectionID}</h1>

      <form onSubmit={handlersubmit}>
        <input
          type="text"
          className="border border-black rounded-xl p-2 m-2"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="border border-black rounded-xl p-2 m-2"
          placeholder="message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 py-2 px-3 text-white rounded-xl"
        >
          Send
        </button>
      </form>

      <h1>JOIN ROOM</h1>
      <form onSubmit={handlerjoinroom}>
        <input
          type="text"
          className="border border-black rounded-xl p-2 m-2"
          placeholder="room..."
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 py-2 px-3 text-white rounded-xl"
        >
          Join
        </button>
      </form>
      <h1>Messages</h1>
      <div className="w-full h-60 gap-2 p-2 flex flex-row">
        <div className="flex flex-col gap-2 border border-black w-1/2">
          <h1>WORLD CHAT</h1>
          {messagearray.map(({ msg, userName, room }, index) => (
            <div key={index}>
              {userName} : {msg}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 border border-black w-1/2">
          <h1>ROOM CHAT</h1>
          {room ? <h1>Joined Room: {room}</h1> : null}
          {roomMsgArray.map(({ msg, userName, room }, index) => (
            <div key={index}>
              {userName} : {msg}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
