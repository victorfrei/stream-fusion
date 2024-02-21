"use server";

import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { NavMenu } from "./components/NavMenu";
import {
  CalendarDaysIcon,
  FireIcon,
  LanguageIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Spotlight } from "./components/Spotlight";
import { ContentGrid } from "./components/ContentGrid";

const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

async function TrendingMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=pt-BR",
    options
  );
  const movies = await response.json();

  return movies.results.filter((e: any) => e.media_type == "movies" || "tv");
}

export async function ContentDetails(contentId: number) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  if (contentId) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${contentId}?language=pt-BR`,
      options
    );
    const movies = await response.json();

    return movies;
  } else {
    return [];
  }
}

export async function GetHomePageContent(page: number = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  const movies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    options
  );
  const tvShows = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    options
  );

  const moviesContent = await movies.json();

  const tvShowsContent = await tvShows.json();

  const content = [...moviesContent.results, ...tvShowsContent.results];

  return shuffle(content);
}

export async function GetMovies(page: number = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    options
  );
  const movies = await response.json();

  return movies.results;
}

export async function GetTvShows(page: number = 1) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    options
  );
  const tvShows = await response.json();
  return tvShows.results;
}

export default async function Home() {
  const supabase = createClient();
  const TrendingContent = await TrendingMovies();
  const content = await GetHomePageContent(1);


  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center">
        <NavMenu active={0} />

        <div className="animate-in w-full flex-1 flex flex-col pb-10 gap-20 opacity-0">
          <main className="flex-1 w-full flex flex-col justify-start gap-20">
            {/* Spotlight */}

            <Spotlight contentArray={TrendingContent} />

            <div className="flex flex-col gap-4 px-20">
              <div className="flex gap-4">
                <button className="px-8 py-2 bg-secondary rounded-md text-base font-semibold">
                  Filmes
                </button>
                <button className="px-8 py-2 bg-secondary rounded-md text-base font-semibold">
                  Séries
                </button>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-2 bg-secondary rounded-md text-base font-semibold">
                  Filmes
                </button>
                <button className="px-8 py-2 bg-secondary rounded-md text-base font-semibold">
                  Séries
                </button>
              </div>
            </div>

            <ContentGrid title="Em Alta" contentArray={content} />
           
          </main>
        </div>

        {/* <footer className="w-full px-8 py-2 flex justify-center text-center text-sm font-semibold">
          <p>Powered by Stream Fusion © 2024</p>
        </footer> */}
      </div>
    </>
  );
}
