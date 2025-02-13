"use server";

import { NavMenu } from "./components/NavMenu";
import { Spotlight } from "./components/Spotlight";
import { ContentLoad } from "./components/ContentLoad";
import { TrendingMovies } from "./components/actions/actions";
import Link from "next/link";
import Image from "next/image";
import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import LogoOnlyText from "@/assets/LogoOnlyText.svg";
import Clock from "./components/Clock";
import { ArrowBigDown, ChevronDownIcon } from "lucide-react";
import { PrismaClient } from '@prisma/client'
import { ContentGrid } from "./components/ContentGrid";
import Player from "./components/Player";


export default async function Home() {
  const TrendingContent = await TrendingMovies();
  const prisma = new PrismaClient();
  const movies = await prisma.movie.findMany({
    include: {
      age_rating: true,
      genres: true,
      directors: true,
      image_quality: true,
      rating: true
    },
    orderBy: {
      updatedAt: "desc"
    }
  });


  console.log(movies);

  return (
    <>
      <div className="relative w-full flex flex-col gap-10 items-center overflow-x-hidden">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent z-40"></div> */}
        <div className="fixed top-4 left-4 w-12 h-12 bg-neutral-800 rounded-full z-50">

        </div>

        {/* <Clock /> */}

        {/* <Player playbackId="TSsaWDwYOFNH3fIAksOgCG96fRO3UQ9wwxWAc96q9FM"/> */}

        <Link href={"/"} className="fixed bottom-4 right-4 flex gap-4 z-40 group">
          <Image
            src={LogoWithoutText}
            alt="Stream Fusion Logo"
            className="w-12 h-12 lg:w-10 lg:h-10"
            width={30}
            height={30}
          />
          <Image
            src={LogoOnlyText}
            alt="Stream Fusion Logo"
            className="hidden group-hover:block transition-all"
            width={200}
            height={100}
          />
        </Link>

        <NavMenu />

        <main className="w-full h-full flex flex-col justify-start gap-10 z-30">
          <Spotlight content={movies[2]} />
          <div className="flex flex-col gap-10 justify-center items-start pb-10 -translate-y-72 z-30">
            <ContentGrid title="Trending" content={movies} />
            <ContentGrid title="My List" content={movies} />
          </div>
          {/* <ContentLoad /> */}
        </main>
      </div >
    </>
  );
}
