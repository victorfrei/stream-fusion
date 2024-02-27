"use client";

import { useState } from "react";
import {
  BellAlertIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function ProfileButton() {
  const [selected, setSelect] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <button className="group/search">
      <div
        className={`flex justify-center items-center !bg-secondary !text-gray-400 rounded-full text-md font-medium overflow-hidden py-1 px-3`}
      >
        <UserIcon
          width={20}
          height={20}
          strokeWidth={2}
          className="text-gray-400"
        />
        <span
          className={`focus:w-32 focus:opacity-100 group-hover/search:w-32 group-hover/search:opacity-100 w-0 opacity-0 py-2 bg-secondary outline-0  transition-all ease-in-out duration-700`}
        >
          Perfil
        </span>
      </div>
    </button>
  );
}
