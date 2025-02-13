"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useTimer } from "./useTimer";
import Link from "next/link";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon, InfoIcon, PlayIcon, PlusIcon } from "lucide-react";
import type { Prisma } from "@prisma/client";
import { AnimatePresence, motion, type Variant } from "motion/react";
import Plyr from "plyr-react"
import Player from "./Player";


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


export function Spotlight({ content }: { content: Movie | TvShow }) {
  const [currentAction, setCurrentAction] = useState<"Play" | "Favorite" | "Info">("Play");


  return (
    <div className="relative w-screen h-screen overflow-hidden">

      {/* <div className="absolute bottom-0 left-0 right-0 mx-auto animate-bounce z-50 w-11 h-11">
        <ChevronDownIcon size={32} className="text-neutral-300" />
      </div> */}



      <div className="absolute top-0 left-0 w-screen h-screen !overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/90 to-transparent z-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent z-20"></div>
        <motion.img
          src={content.bannerUrl}
          alt={content?.title}
          width={1920}
          height={1080}
          className="absolute top-0 left-0 w-screen h-screen object-cover object-right overflow-hidden"
        ></motion.img>

        <motion.div
          className="absolute top-0 left-0 flex flex-col py-32 px-40 justify-start items-start gap-6 transition-all w-fit h-fit overflow-hidden z-30"
        >
          <div className="flex gap-2 justify-start items-start">
            {content.image_quality.map((image_quality) =>
              <span key={image_quality.id} className="px-2 py-1 border-2 border-neutral-200/80 text-neutral-200/90">{image_quality.name}</span>
            )}
            {content.age_rating.map((age_rating) =>
              <span key={age_rating.id} className="px-2 py-1 border-2 border-neutral-200/80 text-neutral-200/90">{age_rating.rating}</span>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <h1
              className="flex gap-6 justify-start items-center text-3xl lg:text-7xl lg:max-w-4xl font-bold"
            >
              {content?.title}
            </h1>

            <div
              className="flex px-1 gap-y-2 gap-x-4 justify-start items-center text-base font-semibold text-textSecondary"
            >
              <p className="flex gap-1 justify-center items-center">
                {content?.year}
              </p>
              <span>|</span>
              <p className="flex gap-1 justify-center items-center">
                {content?.duration}
              </p>
              <span>|</span>
              <p className="flex gap-1 justify-center items-center">
                {content?.country}
              </p>

            </div>

            <p
              className="text-base lg:text-lg px-1 max-w-2xl line-clamp-5 text-start font-medium text-neutral-300"
            >
              {content?.description}
            </p>
          </div>

          <div className="flex px-1 gap-4 w-full">
            <Link
              onPointerEnter={() => {
                setCurrentAction("Play")
              }}
              href={"/"}
              className={`flex gap-3 justify-center items-center ${currentAction == "Play" ? "bg-purple-600" : "hover:w-fit hover:px-6 hover:bg-purple-600"} w-fit px-6 h-12 text-base font-medium rounded-full group-focus:block transition-all group`}
            >
              <PlayIcon
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
              <span className={``}>Play Now</span>
            </Link>

            <Link
              onPointerEnter={() => {
                setCurrentAction("Favorite")
              }}
              href={"/"}
              className={`flex gap-2 justify-center items-center w-12 h-12 ${currentAction == "Favorite" ? "bg-purple-600" : "hover:bg-purple-600"} hover:bg-purple-600 rounded-full transition-all group`}
            >
              <PlusIcon
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
            </Link>

            <Link
              onPointerEnter={() => {
                setCurrentAction("Info")
              }}
              href={"/"}
              className={`flex gap-2 justify-center items-center w-12 h-12 ${currentAction == "Info" ? "bg-purple-600" : "hover:bg-purple-600"} hover:bg-purple-600 rounded-full transition-all group`}
            >
              <InfoIcon
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
            </Link>
          </div>
        </motion.div>
      </div >

    </div >
  );
}
