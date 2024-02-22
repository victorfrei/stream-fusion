"use client";

import { FireIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export function ContentGrid({
  title,
  content,
}: {
  title?: string;
  content: any;
}) {
  return (
    <div className="flex flex-col justify-center items-start gap-20 px-20">
      {title && (
        <h2 className="flex gap-4 justify-center items-center font-semibold text-2xl text-textSecondary">
          <FireIcon width={30} height={30} strokeWidth={2} />
          <p>{title}</p>
        </h2>
      )}
      <div className="w-full flex justify-center flex-wrap gap-8">
        {content.map((e: any) => (
          <div className="w-[250px] flex flex-col group">
            <Link
              href={`/details/${e.media_type}/${e.id}`}
              className="w-full h-[360px] rounded-lg border-2 border-transparent hover:border-text cursor-pointer group-focus:!rounded-t-md group-focus:!rounded-b-none"
            >
              <Image
                key={e.title}
                src={"https://image.tmdb.org/t/p/original/" + e.poster_path}
                alt={e.title}
                width={600}
                height={600}
                quality={60}
                loading="lazy"
                className="w-full h-full bg-secondary100 rounded-lg "
              ></Image>
            </Link>

            <div className="w-full flex flex-col justify-center items-center pt-4 px-1 gap-2">
              <div className="text-lg w-full h-full font-semibold justify-between items-center group-focus:bg-secondary100">
                <span>{e.title || e.name}</span>
              </div>
              <div className="flex gap-2 justify-between items-center text-sm font-medium w-full h-full text-start text-gray-200/30 group-focus:bg-secondary100">
                <span>Ação</span>
                <span>
                  {new Date(e.release_date || e.first_air_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
