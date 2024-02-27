"use client";

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  // navigator?.userAgent.toUpperCase().indexOf("MAC") !== -1;
  const isMac = false;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "o" && (e.altKey || e.metaKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <button
        onClick={() => setOpen((open) => !open)}
        className="flex gap-4 justify-between items-center text-sm font-semibold py-2 px-4 hover:bg-secondary rounded-lg"
      >
        <div className="flex gap-2">
          <MagnifyingGlassIcon strokeWidth={2} width={20} height={20} />
          Pesquisar
        </div>
        <div className="py-1 px-2 bg-background rounded-md">
          {isMac ? "⌘" : "Alt"} + O
        </div>
      </button>
      <form action={""}>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="Digite para pesquisar..."
          />
          <button>Pesquisar</button>
          <CommandList className="scrollbar-thin scrollbar-thumb-secondary100 scrollbar-track-transparent scrollbar-thumb-rounded-lg">
            {/* <CommandEmpty>Nada encontrado.</CommandEmpty> */}

            {/* <CommandGroup>
              <div className="flex flex-wrap gap-4 justify-start items-center px-5">
                <CommandItem className="bg-transparent ">
                  <div className="w-52 h-80 bg-secondary rounded-lg"></div>
                </CommandItem>
                <CommandItem className="bg-transparent ">
                  <div className="w-52 h-80 bg-secondary rounded-lg"></div>
                </CommandItem>
                <CommandItem className="bg-transparent ">
                  <div className="w-52 h-80 bg-secondary rounded-lg"></div>
                </CommandItem>
                <CommandItem className="bg-transparent ">
                  <div className="w-52 h-80 bg-secondary rounded-lg"></div>
                </CommandItem>
                <CommandItem className="bg-transparent ">
                  <div className="w-52 h-80 bg-secondary rounded-lg"></div>
                </CommandItem>
                <CommandItem className="bg-transparent ">
                  <div className="w-52 h-80 bg-secondary rounded-lg"></div>
                </CommandItem>
              </div>
            </CommandGroup> */}
          </CommandList>
        </CommandDialog>
      </form>
    </div>
  );
}
