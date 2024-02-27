"use client";

import { useState } from "react";
import {
  BellAlertIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function AlertButton() {
  const [hasNotification, setHasNotification] = useState(false);

  return (
    <button className="relative group/search">
      {/* <span className="absolute top-0 right-0"> */}
      {/* <span className="absolute top-0 right-0 p-1.5 bg-white rounded-full" /> */}
      {/* <span className="absolute top-0 right-0 p-1.5 animate-ping bg-white rounded-full duration-[10000ms]" /> */}
      {/* </span> */}
      <div
        className={`flex justify-center items-center !bg-secondary !text-gray-400 rounded-full text-md font-medium overflow-hidden py-1 px-3`}
      >
        {hasNotification && (
          <span className="absolute right-auto left-auto w-full h-full animate-ping opacity-100 bg-white/30 rounded-full transition-all -z-20 group-hover/search:opacity-0 group-hover/search:w-0 group-hover/search:h-0 group-hover/search:animate-none" />
        )}
        <BellIcon
          width={20}
          height={20}
          strokeWidth={2}
          className="text-gray-400"
        />
        <span
          className={`focus:w-32 focus:opacity-100 group-hover/search:w-32 group-hover/search:opacity-100 w-0 opacity-0 py-2 bg-secondary outline-0  transition-all ease-in-out duration-700`}
        >
          Notifications
        </span>
      </div>
    </button>
  );
}
