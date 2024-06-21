import React, { useState } from "react";
import Usermsg from "./msg_components/Usermsg";
import Servermsg from "./msg_components/Servermsg";
import Joinmsg from "./msg_components/Joinmsg";
import LeaveMsg from "./msg_components/Leavemsg";
import { AppContext } from "../../context/appContext";
import { useContext } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";

function Msgbox({ messagearray }) {
  const { message, setMessage, userName, handlersubmit, currentroom, room } =
    useContext(AppContext);
  const [emojiopen, setemojiopen] = useState(false);

  if (room) {
    messagearray = messagearray.filter((data) => {
      return data.room === room;
    });
  }
  let displayArray = messagearray.map((data, index) => {
    if (data.type === "join") {
      return <Joinmsg key={index} data={data} />;
    } else if (data.type === "leave") {
      return <LeaveMsg key={index} data={data} />;
    } else if (data.type === "message") {
      if (data.userName === userName) {
        return <Usermsg key={index} data={data} />;
      } else {
        return <Servermsg key={index} data={data} />;
      }
    }
  });
  return (
    <>
      <div className="p-4 sm:ml-64 h-screen">
        <div className=" border-2 bg-gray-900 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 h-[90%] flex flex-col gap-3 mx-40">
          <h1 className=" text-blue-100 font-normal p-2 text-2xl w-full italic bg-gray-800 text-center">
            {currentroom}
          </h1>
          <div
            id="messages"
            className="flex-1 flex flex-col gap-4 overflow-y-scroll mx-4"
          >
            {displayArray}
          </div>

          <form onSubmit={handlersubmit} className="mx-4 mb-4 relative">
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <EmojiPicker
                className="absolute top-0 right-0 z-50"
                theme="dark"
                open={emojiopen}
                width={300}
                height={350}
                style={{
                  position: "absolute",
                  top: -355,
                  right: 650,
                  zIndex: "50",
                }}
                previewConfig={{ showPreview: false }}
                onEmojiClick={(emojiData) => {
                  console.log(emojiData.emoji);
                  setMessage(message + emojiData.emoji);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setemojiopen((prev) => !prev);
                }}
                className="relative p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              <textarea
                id="chat"
                rows="1"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-gray-500"
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Msgbox;
