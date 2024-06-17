import React from "react";

function Joinmsg({ data }) {
  return (
    <>
      <div
        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 w-fit mx-auto"
        role="alert"
      >
        <span className="font-medium mr-1">{data.userName}</span>joined the chat
      </div>
    </>
  );
}

export default Joinmsg;
