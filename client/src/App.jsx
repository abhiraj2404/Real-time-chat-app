import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/Chats.jsx";
import Home from "./components/Home.jsx";
import CreateRoomCard from "./components/CreateRoomCard.jsx";
import Msgbox from "./components/Chats/Msgbox.jsx";
import ChatHome from "./components/ChatHome.jsx";
import { AppContext } from "./context/appContext";

function App() {
  const { messagearray, roomMsgArray } = useContext(AppContext);

  /* Storing user's device details in a variable*/
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;

  /* Using test() method to search regexp in details 
it returns boolean value*/
  let isMobileDevice = regexp.test(details);

  if (isMobileDevice) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center p-4">
        <h1 className="text-white font-bold text-2xl">
          This app is currently not supported for mobile devices. Please open it
          on a desktop or laptop browser.
        </h1>
        ;
      </div>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="chats" element={<Chats />}>
            <Route path="" element={<ChatHome />} />
            <Route path="createroom" element={<CreateRoomCard />} />
            <Route
              path="msgbox/worldchat"
              element={<Msgbox messagearray={messagearray} />}
            />
            <Route
              path="msgbox/roomchat"
              element={<Msgbox messagearray={roomMsgArray} />}
            />
          </Route>
        </Routes>
      </>
    );
  }
  {
    /* <div>
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
        <form onSubmit={handlercreateroom}>
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
      </div> */
  }
}

export default App;
