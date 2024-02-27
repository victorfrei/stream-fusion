"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput() {
  const [selected, setSelect] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="group/search">
      <div
        className={`flex justify-between items-center !bg-secondary !text-gray-400 rounded-xl text-md font-medium overflow-hidden px-2`}
      >
        <MagnifyingGlassIcon
          width={20}
          height={20}
          strokeWidth={2}
          className="text-gray-400"
        />
        <form>
          <input
            placeholder="Digite aqui para pesquisar"
            name="query"
            onChange={(e) => setValue(e.target.value)}
            onClick={() => {
              setSelect(true);
            }}
            onBlur={() => (value ? setSelect(true) : setSelect(false))}
            className={`${
              selected ? "w-52 opacity-100 translate-x-2" : "w-0 opacity-0"
            }  focus:w-52 focus:opacity-100 group-hover/search:w-52 group-hover/search:opacity-100 py-2 bg-secondary outline-0 group-hover/search:translate-x-2 transition-all ease-in-out duration-700`}
          ></input>
        </form>
      </div>
    </div>
  );
}
