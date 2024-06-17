import React from "react";

function Leavemsg({ data }) {
  return (
    <>
      {" "}
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-fit mx-auto"
        role="alert"
      >
        <span className="font-medium mr-1">{data.userName}</span> left the chat
      </div>
    </>
  );
}

export default Leavemsg;
