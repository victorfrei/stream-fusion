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

const menuItems = [
  {
    link: "/",
    name: "Home",
  },
  // {
  //   link: "/categories",
  //   name: "Categorias",
  // },
  {
    link: "/movies",
    name: "Filmes",
  },
  {
    link: "/tvshows",
    name: "Séries",
  },
  {
    link: "/animes",
    name: "Animes",
  },
];

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
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite para pesquisar..." />
        <CommandList>
          <CommandEmpty>Nada encontrado.</CommandEmpty>
          <CommandGroup heading="Páginas">
            {menuItems.map((item) => (
              <a key={item.name} href={item.link}>
                <CommandItem>{item.name}</CommandItem>
              </a>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
