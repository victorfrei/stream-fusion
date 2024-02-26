import { ApiResponseMovie, ApiWhereToWatch, Cast, ResultType } from './../../types/types';
"use server"

import { ApiCasts, ApiResponse } from "../../types/types";

export const GetHomePageContent = async (page: number) => {
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

  const moviesContent: ApiResponse = await movies.json();

  moviesContent.results.forEach((e: {}) => {
    Object.assign(e, { media_type: "movie" });
  });

  const tvShowsContent: ApiResponse = await tvShows.json();

  tvShowsContent.results.forEach((e: {}) => {
    Object.assign(e, { media_type: "tv" });
  });
  const content = [...moviesContent.results, ...tvShowsContent.results];
  //!!! shuffleArray(content) - May be causing issues with duplicated element in array because of content caching
  return content;
}

export const GetContentDetails = async (contentId: number, contentType: string) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDc4ODFlOGJhODU3YjU1ZTJmMTY2MGFkMjBmMDUzOCIsInN1YiI6IjVhMjVhMjJlMGUwYTI2NGNjZDBlMmQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S5fkr34a6GZVfInJXs81AAjRNOGAR1EN2YLXVCahuY8",
    },
  };

  const responseDetails = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}?language=pt-BR`,
    options
  );

  const responseVideos = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}/videos?language=en-US`,
    options
  );

  const responseCasts = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}/credits?language=pt-BR`,
    options
  );

  const responseRecomendations = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}/recommendations?language=pt-BR`,
    options
  );

  const responseWhereToWatch = await fetch(
    `https://api.themoviedb.org/3/${contentType}/${contentId}/watch/providers`,
    options
  );

  const movie: ApiResponseMovie = await responseDetails.json();
  const videos: ApiResponse = await responseVideos.json();
  const casts: ApiCasts = await responseCasts.json();
  const recomendations: ApiResponse = await responseRecomendations.json();
  const whereToWatch: ApiWhereToWatch = await responseWhereToWatch.json();

  const video = videos?.results?.filter((e: any) => e.type == "Trailer")[0];
  const castsFiltered = casts.cast ? casts.cast.filter(
    (e: any) => e.known_for_department == "Acting" && e.profile_path != null
  ) : [];
  const recomendationsFiltered = recomendations?.results;

  return {
    ...movie,
    video: video,
    casts: castsFiltered,
    recomendations: recomendationsFiltered,
    whereToWatch,
  };
};

export const TrendingMovies = async () => {
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
  const movies: ApiResponse = await response.json();

  return movies.results.filter((e: any) => e.media_type == "movies" || "tv");
};