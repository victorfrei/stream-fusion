"use client";

import {
  CalendarDaysIcon,
  FireIcon,
  LanguageIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Progress } from "./ui/progress";
import React, { useEffect, useState } from "react";
import { useTimer } from "./TimeManager";

export function Spotlight({ contentArray }: { contentArray: any }) {
  const [content, setContent] = useState<any>([]);
  const { seconds, start, pause, reset, running, stop, page } = useTimer({pageLimit: contentArray.length});

  useEffect(() => {
    setContent(contentArray[page]);
  }, [page]);

  return (
    <>
      {content && (
        <div
          className={`w-full h-screen relative overflow-hidden transition-all group/spotlight`}
        >
          {/* <div className="absolute flex justify-start items-center gap-10 z-10 w-full h-full  bg-gradient-to-t from-black via-black/70 to-black/20"> */}
          {/* <TimeManager /> */}
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
                    className="flex gap-y-2 gap-x-4 max-w-48 justify-between items-center text-lg text-start font-medium text-textSecondary left-slide-in"
                  >
                    <p className="flex gap-1 justify-center items-center text-base font-semibold">
                      <FireIcon width={20} height={20} strokeWidth={2} />
                      {Intl.NumberFormat().format(content?.vote_average)}
                    </p>
                    <p className="p-0.5 bg-gray-200/40 rounded-full"></p>
                    <p className="flex gap-1 justify-center items-center font-semibold">
                      <LanguageIcon width={20} height={20} strokeWidth={2} />
                      {content?.original_language}
                    </p>
                    <p className="p-0.5 bg-gray-200/40 rounded-full"></p>
                    <p className="flex gap-1 justify-center items-center font-semibold">
                      <CalendarDaysIcon
                        width={20}
                        height={20}
                        strokeWidth={2}
                      />{" "}
                      {new Date(content?.release_date).getFullYear()}
                    </p>
                  </p>

                  <p
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    className="text-lg max-w-2xl line-clamp-5 text-start font-medium text-textSecondary left-slide-in"
                  >
                    {content?.overview}
                  </p>

                  <div className="flex gap-2 text-sm">
                    <div
                      onMouseEnter={pause}
                      onMouseLeave={start}
                      className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all "
                    >
                      Em Alta
                    </div>
                    <div
                      onMouseEnter={pause}
                      onMouseLeave={start}
                      className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all "
                    >
                      Popular
                    </div>
                    <div
                      onMouseEnter={pause}
                      onMouseLeave={start}
                      className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all "
                    >
                      Recomendado
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onMouseEnter={pause}
                    onMouseLeave={start}
                    className="flex gap-2 justify-center items-center item px-10 py-3 text-base font-medium bg-accent hover:bg-accent/80 focus:bg-accent/80 rounded-md left-slide-in group-focus:block transition-all group/actionButtonA"
                  >
                    <PlayIcon
                      width={22}
                      height={22}
                      strokeWidth={2}
                      className="group-hover/actionButtonA:-translate-x-1 transition-transform"
                    />{" "}
                    Assistir
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
              <div className="right-slide-in flex flex-col justify-center items-center px-6 gap-4">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    content?.poster_path
                  }
                  onMouseEnter={pause}
                  onMouseLeave={start}
                  alt={content?.title}
                  width={300}
                  height={300}
                  className="w-64 h-96 object-cover object-right-top border-2 border-text rounded-2xl"
                ></Image>
                <Progress
                  value={seconds}
                  color="white"
                  className="bg-gray-700 w-3/12 fill-white transition-all"
                />
              </div>
              {/* <div className="flex gap-2">
            <span className="p-1 bg-secondary100 rounded-full"></span>
            <span className="p-1 bg-secondary100 rounded-full"></span>
            <span className="p-1 bg-secondary100 rounded-full"></span>
            <span className="p-1 bg-secondary100 rounded-full"></span>
          </div> */}
            </div>
            {/* SpotLight Content Ends */}
          </div>
          {/* Background Image */}
          <Image
            src={
              "https://image.tmdb.org/t/p/original/" + content?.backdrop_path
            }
            alt={content?.title}
            width={2000}
            height={600}
            className="w-screen h-screen object-cover object-left-top bg-secondary100"
          ></Image>
          {/* Background Image Ends */}
        </div>
      )}
    </>
  );
}
