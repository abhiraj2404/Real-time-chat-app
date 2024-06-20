import React from "react";
import { AppContext } from "../../../context/appContext";

function WorldChatButton() {
  const { setRoom, setcurrentroom } = React.useContext(AppContext);
  return (
    <>
      <li
        onClick={() => {
          setRoom("");
          setcurrentroom("World Chat");
        }}
      >
        <a
          href="#"
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
            />
          </svg>

          <span className="ms-3 text-lg">World Chat</span>
        </a>
      </li>
    </>
  );
}

export default WorldChatButton;
