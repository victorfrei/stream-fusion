"use server";
import { NavMenu } from "./components/NavMenu";
import { Spotlight } from "./components/Spotlight";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

const TrendingMovies = unstable_cache(
  async () => {
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
  },
  [],
  {
    revalidate: 60,
    tags: ["trending-movies"],
  }
);

export default async function Home() {
  const TrendingContent = await TrendingMovies();
  // const content = await GetHomePageContent(1);

  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center ">
        <NavMenu />

        <div className="animate-in w-full flex-1 flex flex-col pb-14 gap-20 opacity-0">
          <main className="flex-1 w-full flex flex-col justify-start gap-20 overflow-hidden">
            <Spotlight contentArray={TrendingContent} />
            <Suspense>
              <LoadingIndicator />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
