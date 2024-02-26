"use client";

import {
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import BackButton from "./BackButton";
import { ApiResponseMovie } from "../types/types";
// import ReactPlayer from "react-player/youtube";

export function SpotlightDetails({
  content,
  contentType,
}: {
  content : ApiResponseMovie;
  contentType: string;
}) {
  return (
    <>
      <div
        className={`relative z-20 overflow-hidden transition-all group/spotlight`}
      >
        <div className="absolute flex flex-col px-20 justify-center items-start gap-10 z-10 w-full h-full  bg-gradient-to-r from-black via-black/80 to-black/20">
          {/* SpotLight Content */}
          <BackButton />
          <div className="w-full flex justify-between items-center">
            {/* SpotLight Info */}
            <div className="flex flex-col justify-start items-start gap-16 transition-all">
              <div className="flex flex-col gap-4">
                <h1 className="flex flex-col gap-4 text-6xl max-w-4xl text-start font-bold left-slide-in">
                  <span>{content?.title || content?.name}</span>
                </h1>

                <p className="flex px-1 gap-y-2 gap-x-6 justify-start items-center text-base text-start font-semibold text-textSecondary left-slide-in">
                  {contentType == "tv" && (
                    <p className="flex gap-1 justify-center items-center">
                      {content.networks ? content.networks[0].name : ""}
                    </p>
                  )}
                </p>

                <p className="text-lg px-1 max-w-2xl line-clamp-5 text-start font-medium text-textSecondary left-slide-in">
                  {content?.overview}
                </p>

                <div className="flex px-1 gap-2 text-sm">
                  {content.genres.map((genre: any) => (
                    <div
                      key={genre.name}
                      className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all "
                    >
                      {genre.name}
                    </div>
                  ))}
                  <div className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all ">
                    {new Date(
                      content?.release_date ?? content?.first_air_date ?? ""
                    ).getFullYear()}
                  </div>
                </div>
              </div>

              <div className="flex px-1 gap-4">
                {content.homepage != "" && (
                  <a
                    href={content.homepage}
                    target="_blank"
                    className="flex gap-2 justify-center items-center item px-10 py-3 text-base font-medium bg-accent hover:bg-accent/80 focus:bg-accent/80 rounded-md left-slide-in group-focus:block transition-all group/actionButtonA"
                  >
                    <PlayIcon
                      width={22}
                      height={22}
                      strokeWidth={2}
                      className="group-hover/actionButtonA:-translate-x-1 transition-transform"
                    />{" "}
                    Assistir
                  </a>
                )}
                {/* <button
                  onClick={() => {}}
                  className="flex gap-2 text-gray-500 justify-center items-center item px-10 py-3 text-base font-medium border-2 border-secondary100 hover:border-secondary100/60 focus:bg-secondary100/60 rounded-md left-slide-in group-focus:block transition-all group/actionButtonB "
                >
                  <PlusIcon
                    width={22}
                    height={22}
                    strokeWidth={2}
                    className="group-hover/actionButtonB:-translate-x-1 transition-transform"
                  />{" "}
                  Recomendar à todos
                </button> */}
              </div>
            </div>
            {/* SpotLight Info Ends */}
            <div className="right-slide-in hidden lg:flex flex-col justify-center items-center px-6 gap-10">
              <Image
                src={"https://image.tmdb.org/t/p/w500/" + content?.poster_path}
                alt={content?.title ?? content.name ?? "Poster"}
                width={300}
                height={300}
                className="w-64 h-96 object-cover object-right-top border-2 border-text rounded-2xl"
              ></Image>
            </div>
          </div>
          {/* SpotLight Content Ends */}
        </div>
        <Image
          src={"https://image.tmdb.org/t/p/original/" + content?.backdrop_path}
          alt={content?.title ?? content.name ?? "Poster"}
          width={1920}
          height={1080}
          className="w-screen h-screen object-cover object-left-top"
        ></Image>
      </div>
    </>
  );
}
