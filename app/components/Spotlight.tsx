"use client";

import {
  CalendarDaysIcon,
  EyeIcon,
  FireIcon,
  LanguageIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Progress } from "./ui/progress";
import React, { useEffect, useState } from "react";
import { useTimer } from "./useTimer";
import { useRouter } from "next/navigation";

export function Spotlight({ contentArray }: { contentArray: any }) {
  const [content, setContent] = useState<any>([]);
  const router = useRouter();
  const { seconds, start, pause, reset, running, stop, page } = useTimer({
    pageLimit: contentArray.length - 1,
  });

  useEffect(() => {
    setContent(contentArray[page]);
  }, [page]);

  return (
    <>
      {content && (
        <div
          className={`h-screen relative overflow-hidden transition-all group/spotlight`}
        >
          {/* <div className="absolute flex justify-start items-center gap-10 z-10 w-full h-full  bg-gradient-to-t from-black via-black/70 to-black/20"> */}

          <div className="absolute flex justify-start items-center gap-10 z-10 w-full h-full  bg-gradient-to-r from-black via-black/80 to-black/20">
            {/* SpotLight Content */}
            <div className="w-full z-20 px-20 flex justify-between items-center">
              {/* SpotLight Info */}
              <div className="flex flex-col justify-start items-start gap-16 transition-all">
                <div className="flex flex-col gap-4">
                  <h1
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    className="text-6xl max-w-4xl text-start font-bold left-slide-in"
                  >
                    {content?.title || content?.name}
                  </h1>

                  <p
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    className="flex px-1 gap-y-2 gap-x-4 justify-start items-center text-lg text-start font-medium text-textSecondary left-slide-in"
                  >
                    <p className="flex gap-1 justify-center items-center font-semibold">
                      {content?.original_language?.toUpperCase()}
                    </p>
                    <p className="flex gap-1 justify-center items-center font-semibold">
                      {new Date(
                        content?.release_date || content?.first_air_date
                      ).getFullYear()}
                    </p>
                  </p>

                  <p
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    className="text-lg px-1 max-w-2xl line-clamp-5 text-start font-medium text-textSecondary left-slide-in"
                  >
                    {content?.overview}
                  </p>
                </div>

                <div className="flex px-1 gap-4">
                  <button
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    onClick={() =>
                      router.push(
                        `/details/${content.media_type}/${content.id}`
                      )
                    }
                    className="flex gap-2 justify-center items-center item px-10 py-3 text-base font-medium bg-accent hover:bg-accent/80 focus:bg-accent/80 rounded-md left-slide-in group-focus:block transition-all group/actionButtonA"
                  >
                    <EyeIcon
                      width={22}
                      height={22}
                      strokeWidth={2}
                      className="group-hover/actionButtonA:-translate-x-1 transition-transform"
                    />{" "}
                    Detalhes
                  </button>
                  <button
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    className="flex gap-2 text-gray-500 justify-center items-center item px-10 py-3 text-base font-medium border-2 border-secondary100 hover:border-secondary100/60 focus:bg-secondary100/60 rounded-md left-slide-in group-focus:block transition-all group/actionButtonB "
                  >
                    <PlusIcon
                      width={22}
                      height={22}
                      strokeWidth={2}
                      className="group-hover/actionButtonB:-translate-x-1 transition-transform"
                    />{" "}
                    Adicionar aos Favoritos
                  </button>
                </div>
              </div>
              {/* SpotLight Info Ends */}
              <div className="right-slide-in hidden flex-col justify-center items-center px-6 gap-4 lg:flex">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/w500/" + content?.poster_path
                  }
                  onMouseEnter={pause}
                  onMouseLeave={start}
                  alt={content?.title}
                  width={300}
                  height={300}
                  quality={80}
                  className="w-64 h-96 object-cover object-right-top border-2 border-text rounded-2xl"
                ></Image>
                <Progress
                  value={seconds}
                  color="white"
                  className="bg-gray-700 w-3/12 fill-white transition-all"
                />
              </div>
            </div>
            {/* SpotLight Content Ends */}
          </div>
          {/* Background Image */}
          {/* Modificar Forma como as imagens são carregadas */}
          <Image
            src={
              "https://image.tmdb.org/t/p/original/" + content?.backdrop_path
            }
            alt={content?.title}
            width={1920}
            height={1080}
            className="w-screen h-screen object-cover object-left-top  bg-secondary100"
          ></Image>
          {/* Background Image Ends */}
        </div>
      )}
    </>
  );
}
