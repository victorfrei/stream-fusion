"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href={"/"}
      className="left-slide-in top-40 left-20 z-40 px-6 py-2 bg-secondary hover:bg-secondary100 rounded-md flex gap-4 justify-center items-center group/back cursor-pointer"
    >
      <ArrowLeftIcon
        width={20}
        height={20}
        strokeWidth={2}
        className="group-hover/back:-translate-x-1 transition-transform"
      />
      <button>Voltar</button>
    </Link>
  );
}
