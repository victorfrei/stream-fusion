"use server"

import { unstable_cache } from "next/cache"
import { cache } from "react";

export const GetHomePageContent = async (page: number) => {
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
  // shuffle(content)
  return content;
}
