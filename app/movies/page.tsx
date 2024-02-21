import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import { redirect } from "next/navigation";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Image from "next/image";

import LogoWithoutText from "@/assets/LogoWithoutText.svg";
import Link from "next/link";
import { NavMenu } from "@/components/NavMenu";

async function PopularMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
      `Bearer ${process.env.TOKEN}`,
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=pt-BR&page=1&sort_by=popularity.desc",
    options
  );
  const movies = await response.json();

  return movies.results;
}

export default async function Home() {
  const supabase = createClient();
  const movies = await PopularMovies();

  // const spotlightMovie = await SpotlightMovie();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <NavMenu active={1} />

        <div className="animate-in w-full flex-1 flex flex-col gap-20 opacity-0 px-20">
          <main className="flex-1 w-full flex flex-col justify-start gap-20">
            <button className="relative overflow-hidden border-2 border-transparent hover:border-text cursor-pointer transition-all rounded-2xl group">
              <div className="absolute flex justify-start items-center gap-10 px-20 z-10 w-full h-full bg-gradient-to-r from-black  to-black/20 rounded-2xl">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    movies[0].poster_path
                  }
                  alt={movies[0].title}
                  width={200}
                  height={200}
                  className="w-52 h-64 left-slide-in object-cover object-right-top bg-secondary100  rounded-2xl"
                ></Image>
                <div className="flex flex-col justify-start items-start gap-5 transition-all">
                  <h1 className="text-3xl font-bold left-slide-in">
                    {movies[0].title}
                  </h1>
                  <p className="text-sm font-medium text-textSecondary left-slide-in">
                    {movies[0].overview}
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
                  movies[0].backdrop_path
                }
                alt={movies[0].title}
                width={2000}
                height={600}
                className="h-[550px] object-cover object-right-top bg-secondary100  rounded-2xl"
              ></Image>
            </button>

            {/* <div className="flex flex-col justify-center items-start gap-20 px-20">
              <h2 className="flex gap-4 justify-center items-center font-semibold text-2xl text-textSecondary">
                <FireIcon width={30} height={30} strokeWidth={2} />{" "}
                <p>Em Alta</p>
              </h2>
              <div className="grid md:grid-cols-4 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-10">
                {movies.map((e: any) => (
                  <div className="flex flex-col group">
                    <button className="w-[250px] h-[360px] rounded-lg border-2 border-transparent hover:border-text cursor-pointer group-focus:!rounded-t-md group-focus:!rounded-b-none">
                      <Image
                        key={e.title}
                        src={
                          "https://image.tmdb.org/t/p/original/" + e.poster_path
                        }
                        alt={e.title}
                        width={600}
                        height={600}
                        loading="lazy"
                        className="w-full h-full bg-secondary100 rounded-lg "
                      ></Image>
                    </button>

                    <div className="w-full flex flex-col justify-center items-center pt-4 px-1 gap-2">
                      <div className="text-lg w-full h-full font-semibold justify-between items-center group-focus:bg-secondary100">
                        <span>{e.title || e.name}</span>
                      </div>
                      <div className="flex gap-2 justify-between items-center text-sm font-medium w-full h-full text-start text-gray-200/30 group-focus:bg-secondary100">
                        <span>Ação</span>
                        <span>{new Date(e.release_date).getFullYear()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </main>
        </div>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>Powered by Stream Fusion © 2024</p>
        </footer>
      </div>
    </>
  );
}
