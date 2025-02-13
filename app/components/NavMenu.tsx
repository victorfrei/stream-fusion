"use client"

import { useState } from "react";
import { SearchIcon, RocketIcon, SparklesIcon, TvIcon, PopcornIcon, ClapperboardIcon, SettingsIcon } from "lucide-react";

const MenuData = [
  {
    name: "Search",
    icon: SearchIcon,
    selected: false,
  },
  {
    name: "Trending",
    icon: RocketIcon,
    selected: true,
  },
  {
    name: "Recomended",
    icon: SparklesIcon,
    selected: false,
  },
  {
    name: "Live",
    icon: TvIcon,
    selected: false,
  },
  {
    name: "Movies",
    icon: PopcornIcon,
    selected: false,
  },
  {
    name: "TV Show",
    icon: ClapperboardIcon,
    selected: false,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    selected: false,
  }
]


export function NavMenu() {
  const [menu, setMenu] = useState(MenuData);


  return (
    <div className="fixed top-0 left-0 w-full transition-all h-full z-40 group hover:bg-black/80 pointer-events-none">

      <div className="fixed flex flex-col justify-center top-0 left-0 w-20 hover:w-80 transition-all h-full hover:bg-neutral-950 hover:border-r-2 border-neutral-900 z-50 pointer-events-auto overflow-hidden p-4">



        <nav className="flex flex-col justify-start items-start gap-8">
          {menu.map((nav) =>
            <button
              key={nav.name}
              className={`relative flex gap-4 justify-center group-hover:justify-start overflow-hidden items-center hover:bg-neutral-900 group-hover:w-full rounded-full w-10 h-10 text-neutral-400 hover:text-neutral-100 group-hover:px-4 ${nav.selected ? "text-neutral-50 bg-neutral-800" : ""} transition-all`}>
              {/* <div className="absolute top-0 -left-3.5 bg-gradient-to-r from-neutral-200 to-neutral-900"></div> */}
              <div className={`absolute top-0 -left-3.5 ${nav.selected ? "bg-neutral-200" : ""} w-1 h-full`}></div>
              <nav.icon size={20} />
              <span className="hidden group-hover:flex font-medium line-clamp-1 text-ellipsis">{nav.name}</span>
            </button>
          )}
        </nav>
      </div>
    </div >
  );
}
