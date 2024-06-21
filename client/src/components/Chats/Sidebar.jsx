import Createroombutton from "./buttom_components/Createroombutton";
import RoomButton from "./buttom_components/RoomButton";
import WorldChatButton from "./buttom_components/WorldChatButton";
import applogo from "../../assets/logo.svg";
import { AppContext } from "../../context/appContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Homebutton from "./buttom_components/homebutton";

export function Sidebar() {
  const { userName, userArray, roomArray } = useContext(AppContext);
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <div className="flex ms-2 md:me-24">
                <Link to="/chats" className="flex">
                  <img src={applogo} className="h-8 me-3" alt="FlowBite Logo" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    Deep-Chat
                  </span>
                </Link>
              </div>
            </div>
            <div className="text-2xl font-semibold text-white">
              Welcome , <span className="text-blue-400">{userName}</span>
            </div>
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto px-3 pb-4 bg-white dark:bg-gray-800 mx-2 flex flex-col justify-between">
          <div>
            <ul className="space-y-2 font-medium mb-4">
              <Link to="/chats/msgbox/worldchat">
                <WorldChatButton />
              </Link>
            </ul>
            <ul className="space-y-2 font-medium border-y border-gray-700 py-4">
              <li>
                <div
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group text-lg"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ms-3">Active Users</span>
                </div>
              </li>
              <Link to="/chats/msgbox/roomchat">
                {userArray.map((user) => (
                  <RoomButton
                    key={user.socket_id}
                    userName={user.userName}
                    socketid={user.socket_id}
                  />
                ))}
              </Link>
            </ul>
            <ul className="space-y-2 font-medium border-y border-gray-700 py-4">
              <li>
                <div
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group text-lg"
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="ms-3">Chat Rooms</span>
                </div>
              </li>
              <Link to="/chats/msgbox/roomchat">
                {roomArray.map((room) => (
                  <RoomButton
                    key={room.roomname}
                    userName={room.roomname}
                    socketid={room.roomname}
                  />
                ))}
              </Link>
            </ul>
            <Link to="/chats/createroom">
              <Createroombutton />
            </Link>
          </div>
          <div className="inline-block mt-auto h-fit text-xs">
            <div className="text-gray-500 dark:text-gray-400">
              Confused about how this app works? Read our
              <Link to="/chats">
                <div className="ml-1 inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Rules and Guidelines
                  <svg
                    className="w-4 h-4 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
