import React from "react";
import { Sidebar } from "./Chats/Sidebar";
import Msgbox from "./Chats/MsgBox";
import { AppContext } from "../context/appContext";
import { Link, Outlet } from "react-router-dom";

function Chats() {
  const { userName } = React.useContext(AppContext);
  if (!userName) {
    return (
      <div className="w-full h-screen bg-black flex justify-center items-center flex-col gap-10">
        <h1 className="text-white font-bold text-5xl w-fit mx-auto">
          Please enter your username. The app wont work without it.
        </h1>
        <Link to="/">
          <button className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            GO BACK
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full h-screen bg-black">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Chats;
