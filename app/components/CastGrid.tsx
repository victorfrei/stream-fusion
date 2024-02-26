"use client";

import { FireIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export function CastGrid({ title, content }: { title?: string; content: any }) {
  return (
    <div
      id={content.id+Math.random()*1000}
      className="flex flex-col justify-center items-center lg:items-start gap-20 px-20"
    >
      {title && (
        <h2 className="flex gap-4 justify-center items-center font-semibold text-xl lg:text-3xl text-textSecondary">
          {/* <FireIcon width={30} height={30} strokeWidth={2} /> */}
          <p>{title}</p>
        </h2>
      )}

      <div className="flex justify-start items-center flex-wrap gap-8">
        {content.map((e: any) => (
          <div
            key={e.original_name || e.cast_id}
            className="w-[220px] flex flex-col group"
          >
            <Image
              key={e.original_name}
              src={"https://image.tmdb.org/t/p/original/" + e.profile_path}
              alt={e.original_name}
              width={600}
              height={600}
              quality={60}
              loading="lazy"
              className="w-full h-[330px] bg-secondary100 rounded-lg "
            ></Image>

            <div className="w-full flex flex-col justify-center items-center pt-4 px-1 gap-2">
              <div className="text-lg w-full h-full font-semibold justify-between items-center group-focus:bg-secondary100">
                <span>{e.character}</span>
              </div>
              <div className="flex gap-2 justify-between items-center text-sm font-medium w-full h-full text-start text-gray-200/30 group-focus:bg-secondary100">
                <span>{e.original_name}</span>
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
