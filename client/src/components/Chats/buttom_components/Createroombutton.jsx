import React from "react";

function Createroombutton() {
  return (
    <>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg inline-flex items-cente ml-5 mt-8">
        <svg
          className="w-[20px] h-[20px] text-gray-800 mr-2"
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
            strokeWidth="3"
            d="M5 12h14m-7 7V5"
          />
        </svg>
        <span>Create a Room</span>
      </button>
    </>
  );
}

export default Createroombutton;
