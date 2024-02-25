"use client";

import { FireIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ResultType } from "../types/types";

export function ContentGrid({
  title,
  content,
}: {
  title?: string;
  content: ResultType[];
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-center items-center lg:items-start gap-20 px-20">
      {title && (
        <h2 className="flex gap-4 justify-center items-center font-semibold text-xl lg:text-3xl text-textSecondary">
          {/* <FireIcon width={30} height={30} strokeWidth={2} /> */}
          <p>{title}</p>
        </h2>
      )}
      <div className="w-full flex justify-center lg:justify-start flex-wrap gap-8">
        {content.map((e) => (
          <div
            id={e.id.toString()}
            key={e.id ?? e.name}
            className="w-[220px] flex flex-col group"
          >
            <Link
              href={`/details/${e.media_type}/${e.id}?r=${pathname}`}
              className="h-[330px] rounded-lg border-2 border-transparent hover:border-text cursor-pointer group-focus:!rounded-t-md group-focus:!rounded-b-none"
            >
              <Image
                key={e?.title ?? e.name ?? "Poster"}
                src={"https://image.tmdb.org/t/p/original/" + e.poster_path}
                alt={e?.title ?? e.name ?? "Poster"}
                width={600}
                height={600}
                quality={60}
                loading="lazy"
                className="w-full h-full bg-secondary100 rounded-lg "
              ></Image>
            </Link>

            <div className="w-full flex flex-col justify-center items-center pt-4 px-1 gap-2">
              <div className="text-lg w-full h-full line-clamp-1 font-semibold justify-between items-center group-focus:bg-secondary100">
                <span>{e.title || e.name}</span>
              </div>
              <div className="flex gap-2 justify-between items-center text-sm font-medium w-full h-full text-start text-gray-200/30 group-focus:bg-secondary100">
                <span>{e.media_type == "movie" ? "Filme" : "Série"}</span>
                <span>
                  {new Date(
                    e.release_date ?? e.first_air_date ?? ""
                  ).getFullYear()}
                </span>
              </div>
            </div>
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
