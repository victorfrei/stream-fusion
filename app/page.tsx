"use server"
import { NavMenu } from "./components/NavMenu";
import { Spotlight } from "./components/Spotlight";
import { ContentGrid } from "./components/ContentGrid";

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

async function GetHomePageContent(page: number) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };
  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const movies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    options
  );
  const tvShows = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    options
  );

  const moviesContent: { results: [{}] } = await movies.json();

  moviesContent.results.forEach((e: {}) => {
    Object.assign(e, { media_type: "movie" });
  });

  const tvShowsContent = await tvShows.json();

  tvShowsContent.results.forEach((e: {}) => {
    Object.assign(e, { media_type: "tv" });
  });
  const content = [...moviesContent.results, ...tvShowsContent.results];

  return shuffle(content);
}

export default async function Home() {
  const TrendingContent = await TrendingMovies();
  const content = await GetHomePageContent(1);

  return (
    <>
      <div className="w-full flex flex-col gap-10 items-center">
        <NavMenu />

        <div className="animate-in w-full flex-1 flex flex-col pb-10 gap-20 opacity-0">
          <main className="flex-1 w-full flex flex-col justify-start gap-20">
            <Spotlight contentArray={TrendingContent} />

            <ContentGrid contentArray={content} />
          </main>
        </div>
      </div>
    </>
  );
}
