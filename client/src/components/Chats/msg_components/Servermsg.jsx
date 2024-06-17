import React from "react";
import userImage from "../../../assets/userimage.jpg";

function Servermsg({ data }) {
  return (
    <>
      <div className=" flex items-start gap-2.5">
        <img
          className="w-8 h-8 rounded-full"
          src={userImage}
          alt="Jese image"
        />
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {data.userName}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {data.time}
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              {data.msg}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Servermsg;
