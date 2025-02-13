"use client";

import { FireIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ResultType } from "../types/types";
import type { Prisma } from "@prisma/client";


type Movie = Prisma.MovieGetPayload<{
  include: {
    age_rating: true,
    genres: true,
    directors: true,
    image_quality: true,
    rating: true
  };
}>;

type TvShow = Prisma.TvShowGetPayload<{
  include: {
    age_rating: true,
    genres: true,
    directors: true,
    image_quality: true,
    rating: true
  };
}>;


export function ContentGrid({
  title,
  content,
}: {
  title?: string;
  content: Movie[] | TvShow[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-center items-center lg:items-start gap-10 lg:px-40 z-50">
      {title && (
        <h2 className="flex gap-4 justify-center items-center font-semibold text-lg lg:text-xl text-neutral-400">
          {/* <FireIcon width={30} height={30} strokeWidth={2} /> */}
          <p>{title}</p>
        </h2>
      )}
      <div className="flex justify-center lg:justify-start flex-wrap gap-8">
        {content.map((e) => (
          <div
            id={e.id.toString()}
            key={e.id}
            className="flex flex-col group"
          >
            <Link
              href=""
              className="w-[350px] h-[200px] rounded-lg border-2 border-transparent hover:border-text cursor-pointer group-focus:!rounded-t-md group-focus:!rounded-b-none"
            >
              <Image
                src={e.coverUrl}
                alt={e?.title}
                width={600}
                height={600}
                quality={60}
                loading="lazy"
                className="w-full h-full bg-secondary100 rounded-lg object-cover object-top "
              ></Image>
            </Link>

            {/* <div className="w-full flex flex-col justify-center items-center pt-4 px-1 gap-2">
              <div className="text-lg w-full h-full line-clamp-1 font-semibold justify-between items-center group-focus:bg-secondary100">
                <span>{e.title}</span>
              </div>
              <div className="flex gap-2 justify-between items-center text-sm font-medium w-full h-full text-start text-gray-200/30 group-focus:bg-secondary100">
               
                <span>
                  {e.year}
                </span>
              </div>
            </div> */}
          </div>
        ))}

        {content.length == 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <span>Nada Encontrado</span>
          </div>
        )}
      </div>
    </div>
  );
}
