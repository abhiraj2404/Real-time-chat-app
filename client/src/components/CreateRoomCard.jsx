import React, { useEffect } from "react";
import { AppContext } from "../context/appContext";

function CreateRoomCard() {
  const { room, setRoom, handlercreateroom, roomArray } =
    React.useContext(AppContext);
  let roomnamearray = [];
  for (let room of roomArray) {
    roomnamearray.push(room.roomname);
  }
  return (
    <>
      <div className="p-4 sm:ml-64 h-screen">
        <div className="p-4 rounded-lg mt-14 h-[90%] flex flex-col mx-40 justify-center items-center">
          <div className="w-full max-w-[22rem] p-4 py-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6 flex flex-col justify-center ">
              <h5 className="text-4xl font-medium text-gray-900 dark:text-white text-center mb-1 mx-5">
                Create a new room
              </h5>
              <p className=" mx-2 font-normal text-gray-700 dark:text-gray-400 italic">
                Form a personal space for you and your buddies to share some
                cool stuff without any one ever finding out about it.
              </p>

              <div className="">
                <label
                  htmlFor="roomname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter a unique room name
                </label>
                <input
                  type="roomname"
                  name="roomname"
                  id="roomname"
                  placeholder="eg. Study material"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
                {roomnamearray.includes(room) ? (
                  <p className="text-red-600 text-sm">room already exists</p>
                ) : null}
              </div>

              <button
                type="submit"
                onClick={
                  roomnamearray.includes(room)
                    ? (e) => e.preventDefault()
                    : handlercreateroom
                }
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRoomCard;
