import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full bg-black h-screen flex flex-col gap-4 items-center">
      <div className="mt-48 flex flex-col gap-4 items-center">
        <h1 className="font-bold text-white text-7xl">
          Welcome to <span className="text-blue-400">Deep-Chat</span>
        </h1>
        <h1 className="font-semibold text-white text-3xl mt-10">
          Select your Username
        </h1>

        <input
          type="text"
          id="first_name"
          class="mt-4 bg-gray-50 border dark:border-blue-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40%] p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="eg. Skekhar bhaiya"
          required
        />
        <Link to="/chats">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Enter the Chat
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
