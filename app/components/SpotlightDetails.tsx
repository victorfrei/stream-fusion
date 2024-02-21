"use client";

import {
  CalendarDaysIcon,
  FireIcon,
  LanguageIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Plyr from "plyr-react";
// import ReactPlayer from "react-player/youtube";

export function SpotlightDetails({
  content,
  contentType,
}: {
  content: any;
  contentType: string;
}) {
  const router = useRouter();
  const [played, setPlayed] = useState(false);

  return (
    <>
      {content && (
        <div
          className={`w-full h-screen z-20 relative overflow-hidden transition-all group/spotlight`}
        >
          {/* <div className="absolute flex justify-start items-center gap-10 z-10 w-full h-full  bg-gradient-to-t from-black via-black/70 to-black/20"> */}

          <div className="absolute flex justify-start items-center gap-10 z-10 w-full h-full  bg-gradient-to-r from-black via-black/80 to-black/20">
            {/* SpotLight Content */}
            <div className="w-full  px-20 flex justify-between items-center">
              {/* SpotLight Info */}
              <div className="flex flex-col justify-start items-start gap-16 transition-all">
                <div className="flex flex-col gap-4">
                  <h1 className="flex flex-col gap-4 text-6xl max-w-4xl text-start font-bold left-slide-in">
                    {contentType == "tv" && (
                      <Image
                        width={200}
                        height={200}
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          content.networks[0].logo_path
                        }
                        alt={content.networks.name}
                        className="w-20 invert"
                      />
                    )}
                    <span>{content?.title || content?.name}</span>
                  </h1>

                  <p className="flex gap-y-2 gap-x-4 max-w-48 justify-between items-center text-lg text-start font-medium text-textSecondary left-slide-in">
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
                      {new Date(
                        content?.release_date || content?.first_air_date
                      ).getFullYear()}
                    </p>
                  </p>

                  <p className="text-lg max-w-2xl line-clamp-5 text-start font-medium text-textSecondary left-slide-in">
                    {content?.overview}
                  </p>

                  <div className="flex gap-2 text-sm">
                    <div className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all ">
                      Em Alta
                    </div>
                    <div className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all ">
                      Popular
                    </div>
                    <div className="px-2 py-1 font-medium text-textSecondary bg-secondary100 rounded-md left-slide-in group-focus/spotlight:block transition-all ">
                      Recomendado
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      router.push(
                        `/details/${content.media_type}/${content.id}`
                      )
                    }
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
                  <button className="flex gap-2 text-gray-500 justify-center items-center item px-10 py-3 text-base font-medium border-2 border-secondary100 hover:border-secondary100/60 focus:bg-secondary100/60 rounded-md left-slide-in group-focus:block transition-all group/actionButtonB ">
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
                  alt={content?.title}
                  width={300}
                  height={300}
                  className="w-64 h-96 object-cover object-right-top border-2 border-text rounded-2xl"
                ></Image>
              </div>
            </div>
            {/* SpotLight Content Ends */}
          </div>
          {/* Background Image */}
          {/* Modificar Forma como as imagens são carregadas */}
          {/* <Image
            src={"https://image.tmdb.org/t/p/original/" + content?.backdrop_path}
            alt={content?.title}
            width={1000}
            height={600}
            className="w-full h-full object-cover object-right-top border-2 border-text rounded-2xl"
          ></Image> */}
          <Plyr
            source={{
              type: "video",
              sources: [
                {
                  src: content.video.key,
                  provider: "youtube",
                },
              ],
            }}
            options={{
              loop: { active: false },
              autoplay: true,
              volume: 0.2,
              controls: [],
            }}
          />
          {/* Background Image Ends */}
        </div>
      )}
    </>
  );
}
