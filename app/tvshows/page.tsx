import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Image from "next/image";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import Link from "next/link";
import { NavMenu } from "@/components/NavMenu";

async function PopularTVShows() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1",
    options
  );
  const tvShows = await response.json();

  return tvShows.results;
}
export default async function Home() {
  const supabase = createClient();
  const tvShows = await PopularTVShows();
  // const spotlightMovie = await SpotlightMovie();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <NavMenu active={3} />

        <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 px-20">
          <main className="flex-1 w-full flex flex-col justify-start gap-20">
            <button className="relative overflow-hidden border-2 border-transparent hover:border-text cursor-pointer transition-all rounded-2xl group">
              <div className="absolute flex justify-start items-center gap-10 px-20 z-10 w-full h-full bg-gradient-to-r from-black  to-black/20 rounded-2xl">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    tvShows[0].poster_path
                  }
                  alt={tvShows[0].title}
                  width={200}
                  height={200}
                  className="w-52 h-64 left-slide-in object-cover object-right-top bg-secondary100  rounded-2xl"
                ></Image>
                <div className="flex flex-col justify-start items-start gap-5 transition-all">
                  <h1 className="text-start text-3xl font-bold left-slide-in">
                    {tvShows[0].title || tvShows[0].name}
                  </h1>
                  <p className="text-start text-sm font-medium text-textSecondary left-slide-in">
                    {tvShows[0].overview}
                  </p>
                  <div className="flex gap-4">
                    <div className="px-2 py-1 text-sm bg-accent rounded-lg left-slide-in group-focus:block transition-all ">
                      Em Alta
                    </div>
                    <div className="px-2 py-1 text-sm bg-accent rounded-lg left-slide-in group-focus:block transition-all ">
                      Popular
                    </div>
                    <div className="px-2 py-1 text-sm bg-accent rounded-lg left-slide-in group-focus:block transition-all ">
                      Recomendado
                    </div>
                  </div>
                </div>
              </div>
              <Image
                src={
                  "https://image.tmdb.org/t/p/original/" +
                  tvShows[0].backdrop_path
                }
                alt={tvShows[0].title}
                width={2000}
                height={600}
                className="h-[550px] object-cover object-right-top bg-secondary100  rounded-2xl"
              ></Image>
            </button>
            <div className="flex flex-col justify-center items-start gap-5">
              <h2 className="font-bold text-3xl mb-4 text-textSecondary">
                Recomendados
              </h2>
              <div className="grid grid-cols-6 gap-x-10 gap-y-20">
                {tvShows.map((e: any) => (
                  <button className="flex flex-col justify-center items-start group ">
                    <Image
                      key={e.title}
                      src={
                        "https://image.tmdb.org/t/p/original/" + e.poster_path
                      }
                      alt={e.title}
                      width={400}
                      height={400}
                      className=" w-80 h-96 bg-secondary100  rounded-md border-2 border-transparent hover:border-text cursor-pointer group-focus:!rounded-t-md group-focus:!rounded-b-none"
                    ></Image>
                    <h1 className="w-full h-full text-start pt-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus:bg-secondary100">
                      {e.title || e.name}
                    </h1>
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>Powered by Stream Fusion © 2024</p>
        </footer>
      </div>
    </>
  );
}
